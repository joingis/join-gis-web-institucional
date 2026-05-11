import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, isLocale, locales, type Locale } from '@/i18n'

function getPreferredLocale(request: NextRequest): Locale {
  let acceptLanguage = request.headers.get('accept-language')

  if (!acceptLanguage) {
    return defaultLocale
  }

  for (let language of acceptLanguage.split(',')) {
    let locale = language.split(';')[0]?.trim().split('-')[0]

    if (locale && isLocale(locale)) {
      return locale
    }
  }

  return defaultLocale
}

export function proxy(request: NextRequest) {
  let { pathname } = request.nextUrl
  let pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  )

  if (pathnameHasLocale) {
    return
  }

  request.nextUrl.pathname = `/${getPreferredLocale(request)}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
