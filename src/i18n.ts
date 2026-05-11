export const locales = ['es', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocalizedHref(href: string, locale: Locale) {
  if (
    !href.startsWith('/') ||
    href.startsWith('//') ||
    locales.some(
      (supportedLocale) =>
        href === `/${supportedLocale}` ||
        href.startsWith(`/${supportedLocale}/`),
    )
  ) {
    return href
  }

  return href === '/' ? `/${locale}` : `/${locale}${href}`
}
