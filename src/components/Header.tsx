import {
  Facebook,
  MapPin,
  Menu,
  Phone,
  Search,
  X,
  Youtube,
} from 'lucide-react'

import {
  Link,
  NavLink,
} from 'react-router-dom'

import { useState } from 'react'

const logo = new URL(
  '../anh/anhLOGO.png',
  import.meta.url
).href

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">

          <div className="top-address">
            <MapPin size={13} />

            <span>
              300 Đ. Vành Đai Đhqg Hcm, KP, Đông Hòa, Hồ Chí Minh, Việt Nam   
            </span>
          </div>

          <div className="top-social">
            <span>
              Hotline: 0879 227 614
            </span>

            <Facebook size={14} />
            <Youtube size={14} />
          </div>

        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="main-header">

        <div className="container main-header-inner">

          <Link
            to="/"
            className="main-logo"
          >
            <img
              src={logo}
              alt="Quốc Anh - Giáo viên đào tạo lái xe"
            />
          </Link>

          <div className="header-contact">

            <div className="header-contact-item">

              <Phone size={23} />

              <div>
                <small>
                  Hotline tư vấn
                </small>

                <strong>
                  0879 227 614
                </strong>
              </div>

            </div>

            <div className="header-search">

              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
              />

              <button
                type="button"
                aria-label="Tìm kiếm"
              >
                <Search size={17} />
              </button>

            </div>

          </div>

        </div>

      </header>

      {/* NAVIGATION */}
      <div className="navigation">

        <div className="container navigation-inner">

          <nav
            className={`navigation-menu ${
              open ? 'open' : ''
            }`}
          >

            <NavLink to="/">
              Trang chủ
            </NavLink>

            <NavLink to="/khoa-hoc">
              Các khóa học
            </NavLink>

            <a href="/#lo-trinh">
              Chương trình đào tạo
            </a>

            <a href="/#mang-xa-hoi">
              Video học lái xe
            </a>

            <NavLink to="/dang-ky">
              Đăng ký học
            </NavLink>

            <NavLink to="/lien-he">
              Liên hệ
            </NavLink>

          </nav>

          <Link
            to="/dang-ky"
            className="nav-register"
          >
            Đăng ký ngay
          </Link>

          <button
            type="button"
            className="navigation-mobile-button"
            onClick={() =>
              setOpen(
                previous => !previous
              )
            }
          >
            {open
              ? <X size={23} />
              : <Menu size={23} />
            }
          </button>

        </div>

      </div>
    </>
  )
}
