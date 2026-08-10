/**
 * Quốc Anh Driving - Google Sheets lead receiver.
 *
 * Script Properties (Project Settings > Script Properties):
 * - SPREADSHEET_ID: optional when this script is bound to the destination Sheet.
 * - SHEET_NAME: optional, defaults to "Đăng ký website".
 * - NOTIFY_EMAILS: optional comma-separated notification recipients.
 * - INGEST_SECRET: required; must match GOOGLE_SCRIPT_SECRET on Render.
 */

var CONFIG = Object.freeze({
  DEFAULT_SHEET_NAME: 'Đăng ký website',
  TIME_ZONE: 'Asia/Ho_Chi_Minh',
  LOCK_TIMEOUT_MS: 15000,
  DEFAULT_SOURCE: 'Website Quốc Anh',
  DEFAULT_STATUS: 'Mới',
  DEFAULT_NOTIFY_EMAILS: 'quang09minh02@gmail.com,hoclaixequocanh@gmail.com',
});

var ALLOWED_COURSES = Object.freeze(['A', 'A1', 'BSS', 'BTĐ', 'C1']);

var HEADERS = Object.freeze([
  'Mã đăng ký',
  'Thời gian',
  'Họ và tên',
  'Số điện thoại',
  'Năm sinh',
  'Hạng đăng ký',
  'Lịch học mong muốn',
  'Khu vực',
  'Kênh liên hệ',
  'Ghi chú',
  'Nguồn',
  'Trang đăng ký',
  'UTM',
  'Referrer',
  'Trạng thái',
]);

var COLUMN_WIDTHS = Object.freeze([
  190, // Mã đăng ký
  150, // Thời gian
  190, // Họ và tên
  135, // Số điện thoại
  90,  // Năm sinh
  125, // Hạng đăng ký
  165, // Lịch học
  190, // Khu vực
  125, // Kênh liên hệ
  280, // Ghi chú
  155, // Nguồn
  260, // Trang đăng ký
  300, // UTM
  260, // Referrer
  110, // Trạng thái
]);

/**
 * Lightweight health check. Opening the /exec URL in a browser should return
 * this JSON when the Web App deployment is active.
 */
function doGet() {
  return jsonResponse_({
    success: true,
    service: 'Quoc Anh Driving registration receiver',
    time: new Date().toISOString(),
  });
}

/**
 * Receives application/x-www-form-urlencoded or application/json submissions.
 * Timestamp and status are always created by the server and cannot be
 * overridden by the browser.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var lockAcquired = false;
  var responseLeadId = '';

  try {
    var parameters = parseRequest_(e);
    assertAuthorized_(parameters);
    var lead = validateAndBuildLead_(parameters);
    responseLeadId = lead.leadId;

    lockAcquired = lock.tryLock(CONFIG.LOCK_TIMEOUT_MS);
    if (!lockAcquired) {
      throw new Error('Hệ thống đang tiếp nhận nhiều đăng ký. Vui lòng thử lại sau ít giây.');
    }

    var spreadsheet = getSpreadsheet_();
    var sheet = getOrCreateSheet_(spreadsheet);
    var duplicateRow = findLeadRow_(sheet, lead.leadId);

    if (duplicateRow) {
      var duplicateUpdated = updateLead_(sheet, duplicateRow, lead);
      SpreadsheetApp.flush();
      lock.releaseLock();
      lockAcquired = false;
      var updateNotificationSent = duplicateUpdated
        ? notifyTeam_(lead, duplicateRow, spreadsheet, sheet, 'updated')
        : false;

      return jsonResponse_({
        success: true,
        duplicate: true,
        updated: duplicateUpdated,
        leadId: lead.leadId,
        row: duplicateRow,
        notificationSent: updateNotificationSent,
        message: duplicateUpdated
          ? 'Đăng ký đã được tiếp nhận và cập nhật thông tin mới nhất.'
          : 'Đăng ký này đã được tiếp nhận trước đó.',
      });
    }

    var rowNumber = appendLead_(sheet, lead);
    SpreadsheetApp.flush();
    lock.releaseLock();
    lockAcquired = false;
    var notificationSent = notifyTeam_(lead, rowNumber, spreadsheet, sheet);

    return jsonResponse_({
      success: true,
      duplicate: false,
      updated: false,
      leadId: lead.leadId,
      row: rowNumber,
      notificationSent: notificationSent,
      message: 'Đăng ký đã được ghi nhận thành công.',
    });
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);

    return jsonResponse_({
      success: false,
      leadId: responseLeadId,
      message: error && error.message
        ? error.message
        : 'Không thể ghi nhận đăng ký. Vui lòng thử lại.',
    });
  } finally {
    if (lockAcquired) {
      lock.releaseLock();
    }
  }
}

function parseRequest_(e) {
  if (!e) {
    throw new Error('Yêu cầu không hợp lệ.');
  }

  var parameters = {};
  var formParameters = e.parameter || {};

  Object.keys(formParameters).forEach(function (key) {
    parameters[key] = formParameters[key];
  });

  var postData = e.postData;
  var contentType = postData && postData.type
    ? String(postData.type).toLowerCase()
    : '';

  if (postData && postData.contents && contentType.indexOf('application/json') !== -1) {
    var json;

    try {
      json = JSON.parse(postData.contents);
    } catch (error) {
      throw new Error('Dữ liệu JSON không hợp lệ.');
    }

    if (!json || Object.prototype.toString.call(json) !== '[object Object]') {
      throw new Error('Nội dung đăng ký không hợp lệ.');
    }

    Object.keys(json).forEach(function (key) {
      parameters[key] = json[key];
    });
  }

  return parameters;
}

function assertAuthorized_(parameters) {
  var expectedSecret = String(
    PropertiesService.getScriptProperties().getProperty('INGEST_SECRET') || ''
  ).trim();

  if (!expectedSecret) {
    throw new Error('INGEST_SECRET chưa được cấu hình trong Script Properties.');
  }

  var receivedSecret = String(parameters.ingestSecret || '').trim();
  if (!constantTimeEquals_(receivedSecret, expectedSecret)) {
    throw new Error('Yêu cầu không hợp lệ.');
  }
}

function constantTimeEquals_(left, right) {
  var leftText = String(left);
  var rightText = String(right);
  var maximumLength = Math.max(leftText.length, rightText.length);
  var difference = leftText.length ^ rightText.length;

  for (var index = 0; index < maximumLength; index += 1) {
    difference |= (leftText.charCodeAt(index) || 0) ^
      (rightText.charCodeAt(index) || 0);
  }

  return difference === 0;
}

function validateAndBuildLead_(parameters) {
  var fullName = cleanText_(parameters.fullName, 80);
  var phone = normalizePhone_(parameters.phone);
  var birthYear = cleanText_(parameters.birthYear, 4);
  var course = cleanText_(parameters.course, 50);

  if (visibleLength_(fullName) < 2) {
    throw new Error('Vui lòng nhập họ và tên đầy đủ.');
  }

  if (!/^(?:0[35789]\d{8}|\+84[35789]\d{8})$/.test(phone)) {
    throw new Error('Số điện thoại chưa đúng định dạng Việt Nam.');
  }

  if (birthYear) {
    var currentYear = Number(Utilities.formatDate(
      new Date(),
      CONFIG.TIME_ZONE,
      'yyyy'
    ));
    var numericBirthYear = Number(birthYear);

    if (!/^\d{4}$/.test(birthYear) || numericBirthYear < 1900 || numericBirthYear > currentYear) {
      throw new Error('Năm sinh chưa hợp lệ.');
    }
  }

  if (ALLOWED_COURSES.indexOf(course) === -1) {
    throw new Error('Vui lòng chọn hạng bằng hợp lệ.');
  }

  return {
    leadId: normalizeLeadId_(parameters.leadId),
    createdAt: new Date(),
    fullName: fullName,
    phone: phone,
    birthYear: birthYear,
    course: course,
    preferredTime: cleanText_(parameters.preferredTime, 100),
    area: cleanText_(parameters.area, 120),
    contactMethod: cleanText_(parameters.contactMethod, 50) || 'Điện thoại',
    note: cleanText_(parameters.note, 1000),
    source: cleanText_(parameters.source, 120) || CONFIG.DEFAULT_SOURCE,
    page: cleanText_(
      parameters.page || parameters.pageUrl || parameters.sourcePage || parameters.website,
      500
    ),
    utm: buildUtm_(parameters),
    referrer: cleanText_(parameters.referrer, 500),
    status: CONFIG.DEFAULT_STATUS,
  };
}

function normalizeLeadId_(value) {
  var leadId = String(value == null ? '' : value)
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .slice(0, 100);

  return leadId.length >= 8 ? leadId : Utilities.getUuid();
}

function normalizePhone_(value) {
  var phone = String(value == null ? '' : value)
    .trim()
    .replace(/[.\s()-]/g, '');

  if (/^84[35789]\d{8}$/.test(phone)) {
    phone = '+'.concat(phone);
  }

  return phone;
}

function buildUtm_(parameters) {
  var directUtm = cleanText_(parameters.utm, 500);
  if (directUtm) {
    return directUtm;
  }

  var fields = [
    ['utm_source', parameters.utmSource || parameters.utm_source],
    ['utm_medium', parameters.utmMedium || parameters.utm_medium],
    ['utm_campaign', parameters.utmCampaign || parameters.utm_campaign],
    ['utm_term', parameters.utmTerm || parameters.utm_term],
    ['utm_content', parameters.utmContent || parameters.utm_content],
    ['ttclid', parameters.ttclid],
    ['fbclid', parameters.fbclid],
    ['gclid', parameters.gclid],
  ];

  return fields
    .map(function (item) {
      var value = cleanText_(item[1], 120);
      return value ? item[0].concat('=').concat(value) : '';
    })
    .filter(function (value) {
      return Boolean(value);
    })
    .join(' | ')
    .slice(0, 500);
}

/**
 * Removes unsafe control characters, enforces a length limit and prevents
 * spreadsheet formula injection for every browser-controlled text field.
 */
function cleanText_(value, maxLength) {
  var text = String(value == null ? '' : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);

  if (/^[=+\-@]/.test(text)) {
    text = "'".concat(text);
  }

  return text;
}

function visibleLength_(value) {
  return String(value || '').replace(/^'/, '').trim().length;
}

function getSpreadsheet_() {
  var properties = PropertiesService.getScriptProperties();
  var spreadsheetId = String(properties.getProperty('SPREADSHEET_ID') || '').trim();

  if (spreadsheetId) {
    return SpreadsheetApp.openById(spreadsheetId);
  }

  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!activeSpreadsheet) {
    throw new Error(
      'Chưa cấu hình SPREADSHEET_ID. Hãy thêm ID Google Sheet trong Script Properties.'
    );
  }

  return activeSpreadsheet;
}

function getOrCreateSheet_(spreadsheet) {
  var properties = PropertiesService.getScriptProperties();
  var sheetName = String(
    properties.getProperty('SHEET_NAME') || CONFIG.DEFAULT_SHEET_NAME
  ).trim();
  var sheet = spreadsheet.getSheetByName(sheetName);

  spreadsheet.setSpreadsheetTimeZone(CONFIG.TIME_ZONE);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    initialiseSheet_(sheet);
    return sheet;
  }

  ensureHeaders_(sheet);
  return sheet;
}

function ensureHeaders_(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  var currentHeaders = headerRange.getDisplayValues()[0];
  var isEmpty = currentHeaders.every(function (value) {
    return !String(value).trim();
  });

  if (isEmpty) {
    initialiseSheet_(sheet);
    return;
  }

  var headersMatch = HEADERS.every(function (header, index) {
    return currentHeaders[index] === header;
  });

  if (!headersMatch) {
    throw new Error(
      'Dòng tiêu đề của sheet "'.concat(
        sheet.getName(),
        '" không đúng cấu trúc. Hãy dùng một SHEET_NAME mới hoặc cập nhật đúng 15 cột.'
      )
    );
  }
}

function initialiseSheet_(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, HEADERS.length);

  headerRange
    .setValues([HEADERS.slice()])
    .setBackground('#0B315E')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);

  sheet.setRowHeight(1, 42);
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);

  COLUMN_WIDTHS.forEach(function (width, index) {
    sheet.setColumnWidth(index + 1, width);
  });

  // Lead IDs and phone numbers must remain text, including leading zeroes.
  sheet.getRange(1, 1, sheet.getMaxRows(), 1).setNumberFormat('@');
  sheet.getRange(1, 4, sheet.getMaxRows(), 1).setNumberFormat('@');
  headerRange.setNumberFormat('@');

  var tableRange = sheet.getRange(1, 1, sheet.getMaxRows(), HEADERS.length);
  if (!sheet.getFilter()) {
    tableRange.createFilter();
  }

  var statusRange = sheet.getRange(2, 15, Math.max(sheet.getMaxRows() - 1, 1), 1);
  statusRange.setDataValidation(buildStatusValidation_());

  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Mới')
      .setBackground('#FFF3CD')
      .setFontColor('#8A5A00')
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Đã liên hệ')
      .setBackground('#DCEEFF')
      .setFontColor('#0B4F87')
      .setRanges([statusRange])
      .build(),
    SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo('Đã đăng ký')
      .setBackground('#DDF4E6')
      .setFontColor('#17633A')
      .setRanges([statusRange])
      .build(),
  ]);
}

function buildStatusValidation_() {
  return SpreadsheetApp
    .newDataValidation()
    .requireValueInList([
      'Mới',
      'Đã liên hệ',
      'Đã tư vấn',
      'Đã đăng ký',
      'Không phù hợp',
    ], true)
    .setAllowInvalid(true)
    .build();
}

function findLeadRow_(sheet, leadId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0;
  }

  var match = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .createTextFinder(leadId)
    .matchEntireCell(true)
    .matchCase(true)
    .findNext();

  return match ? match.getRow() : 0;
}

function appendLead_(sheet, lead) {
  var rowNumber = Math.max(sheet.getLastRow() + 1, 2);

  if (rowNumber > sheet.getMaxRows()) {
    sheet.insertRowsAfter(sheet.getMaxRows(), 100);
  }

  // Set text formatting before values so phone numbers retain the leading zero.
  sheet.getRange(rowNumber, 1).setNumberFormat('@');
  sheet.getRange(rowNumber, 4).setNumberFormat('@');
  sheet.getRange(rowNumber, 15).setDataValidation(buildStatusValidation_());

  var row = [[
    lead.leadId,
    lead.createdAt,
    lead.fullName,
    lead.phone,
    lead.birthYear,
    lead.course,
    lead.preferredTime,
    lead.area,
    lead.contactMethod,
    lead.note,
    lead.source,
    lead.page,
    lead.utm,
    lead.referrer,
    lead.status,
  ]];

  sheet
    .getRange(rowNumber, 1, 1, HEADERS.length)
    .setValues(row)
    .setVerticalAlignment('middle')
    .setWrap(true);

  sheet
    .getRange(rowNumber, 2)
    .setNumberFormat('dd/MM/yyyy HH:mm:ss');

  sheet.setRowHeight(rowNumber, 34);
  return rowNumber;
}

function updateLead_(sheet, rowNumber, lead) {
  var currentValues = sheet.getRange(rowNumber, 3, 1, 12).getDisplayValues()[0];
  var latestValues = [
    lead.fullName,
    lead.phone,
    lead.birthYear,
    lead.course,
    lead.preferredTime,
    lead.area,
    lead.contactMethod,
    lead.note,
    lead.source,
    lead.page,
    lead.utm,
    lead.referrer,
  ];
  var changed = latestValues.some(function (value, index) {
    return String(currentValues[index]) !== String(value);
  });

  if (!changed) {
    return false;
  }

  sheet.getRange(rowNumber, 4).setNumberFormat('@');
  sheet
    .getRange(rowNumber, 3, 1, latestValues.length)
    .setValues([latestValues])
    .setVerticalAlignment('middle')
    .setWrap(true);

  return true;
}

/**
 * Sends a best-effort internal notification after the row is safely written.
 * Email quota/errors never roll back or report a valid Sheet submission as failed.
 */
function notifyTeam_(lead, rowNumber, spreadsheet, sheet, action) {
  try {
    var configuredRecipients = PropertiesService
      .getScriptProperties()
      .getProperty('NOTIFY_EMAILS');
    var recipients = String(
      configuredRecipients || CONFIG.DEFAULT_NOTIFY_EMAILS
    )
      .split(/[;,]/)
      .map(function (email) {
        return email.trim();
      })
      .filter(function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      });

    if (!recipients.length) {
      return false;
    }

    if (MailApp.getRemainingDailyQuota() < recipients.length) {
      console.warn('Email notification skipped: daily quota is exhausted.');
      return false;
    }

    var sheetUrl = spreadsheet.getUrl()
      .concat('#gid=', sheet.getSheetId(), '&range=A', rowNumber);
    var receivedAt = Utilities.formatDate(
      lead.createdAt,
      CONFIG.TIME_ZONE,
      'dd/MM/yyyy HH:mm:ss'
    );
    var isUpdate = action === 'updated';
    var body = [
      isUpdate
        ? 'Một đăng ký trên website Quốc Anh vừa được cập nhật.'
        : 'Quốc Anh vừa nhận một đăng ký mới từ website.',
      '',
      'Mã đăng ký: '.concat(lead.leadId),
      'Thời gian: '.concat(receivedAt),
      'Họ và tên: '.concat(lead.fullName),
      'Số điện thoại: '.concat(lead.phone),
      'Hạng đăng ký: '.concat(lead.course),
      'Lịch mong muốn: '.concat(lead.preferredTime || 'Chưa chọn'),
      'Khu vực: '.concat(lead.area || 'Chưa cung cấp'),
      'Kênh liên hệ: '.concat(lead.contactMethod),
      'Ghi chú: '.concat(lead.note || 'Không có'),
      'Nguồn: '.concat(lead.source),
      '',
      'Mở dòng đăng ký: '.concat(sheetUrl),
    ].join('\n');

    MailApp.sendEmail({
      to: recipients.join(','),
      subject: (isUpdate ? '[Cập nhật đăng ký] ' : '[Đăng ký mới] ').concat(
        lead.course,
        ' - ',
        lead.fullName,
        ' - ',
        lead.phone
      ).slice(0, 180),
      body: body,
      name: 'Website Quốc Anh Driving',
    });

    return true;
  } catch (error) {
    console.warn(
      'Email notification failed: '.concat(
        error && error.message ? error.message : error
      )
    );
    return false;
  }
}

function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
