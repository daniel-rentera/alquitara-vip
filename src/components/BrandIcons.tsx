import type { SVGProps } from 'react'

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  )
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 22h-.01a9.94 9.94 0 0 1-5.06-1.39l-.36-.21-3.76.99 1-3.67-.24-.38A9.9 9.9 0 0 1 2.1 12.04 9.95 9.95 0 0 1 12.05 2.1c2.66 0 5.15 1.04 7.03 2.92a9.88 9.88 0 0 1 2.91 7.03c0 5.49-4.47 9.95-9.94 9.95zm8.47-18.4A11.82 11.82 0 0 0 12.05.14 11.9 11.9 0 0 0 .13 12.04c0 2.1.55 4.15 1.6 5.96L.03 24l6.17-1.62a11.86 11.86 0 0 0 5.85 1.49h.01c6.57 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.49-8.42z" />
    </svg>
  )
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.2v12.8a2.6 2.6 0 1 1-2.6-2.6c.27 0 .53.04.78.12v-3.3a5.9 5.9 0 0 0-.78-.05A5.9 5.9 0 1 0 15.65 16V9.56a7.5 7.5 0 0 0 4.35 1.39V7.7a4.28 4.28 0 0 1-3.4-1.88z" />
    </svg>
  )
}
