type SocialIconProps = {
  size?: number
  className?: string
}

export function ZaloIcon({ size = 22, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path d="M25.5 24.3C28.2 21.7 29.8 18.2 29.8 14.4C29.8 7.5 23.6 2 16 2C8.4 2 2.2 7.5 2.2 14.4C2.2 18.5 4.4 22.2 7.8 24.5L6.2 29.8L12.5 27.7C13.6 27.9 14.8 28 16 28C19.8 28 23.2 26.6 25.5 24.3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 10H21L10.5 20H22" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MessengerIcon({ size = 22, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.1 2 11.4C2 14.4 3.4 17.1 5.7 18.9V22L9.1 20.1C10 20.3 11 20.5 12 20.5C17.5 20.5 22 16.4 22 11.2C22 6 17.5 2 12 2ZM13 14.5L10.4 11.7L5.4 14.5L10.8 8.7L13.5 11.4L18.5 8.7L13 14.5Z" />
    </svg>
  )
}

export function TikTokIcon({ size = 22, className }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14.5 3C14.9 5.2 16.2 6.7 18.5 7.1V10.2C16.9 10.2 15.6 9.7 14.5 8.9V15.1C14.5 18.3 11.9 21 8.6 21C5.3 21 2.8 18.4 2.8 15.1C2.8 11.9 5.4 9.2 8.7 9.2C9.1 9.2 9.5 9.2 9.9 9.3V12.5C9.5 12.3 9.1 12.2 8.7 12.2C7.1 12.2 5.8 13.5 5.8 15.1C5.8 16.7 7 18 8.6 18C10.2 18 11.5 16.7 11.5 15.1V3H14.5Z" />
    </svg>
  )
}
