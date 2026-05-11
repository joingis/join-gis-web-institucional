import 'server-only'

import { type Locale, isLocale } from '@/i18n'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  es: () => import('./dictionaries/es.json').then((module) => module.default),
}

export { isLocale }

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}
