'use client'

import clsx from 'clsx'
import { usePathname, useRouter } from 'next/navigation'

import { locales, switchLocalePath, type Locale } from '@/i18n'

const labels: Record<Locale, string> = {
  es: '🇦🇷 ES',
  en: '🇺🇸 EN',
}

export function LanguageSelector({
  locale,
  invert = false,
  className,
}: {
  locale: Locale
  invert?: boolean
  className?: string
}) {
  let pathname = usePathname()
  let router = useRouter()
  let ariaLabel = locale === 'es' ? 'Seleccionar idioma' : 'Select language'

  return (
    <label className={clsx('relative inline-flex items-center', className)}>
      <span className="sr-only">{ariaLabel}</span>
      <select
        aria-label={ariaLabel}
        className={clsx(
          'min-w-[7.5rem] appearance-none rounded-full border py-2 pr-10 pl-4 text-[0.7rem] font-semibold tracking-[0.2em] uppercase transition',
          'focus:outline-hidden',
          invert
            ? 'border-white/20 bg-white/5 text-white focus:border-white/40'
            : 'border-neutral-950/10 bg-white text-neutral-950 focus:border-neutral-950/30',
        )}
        onChange={(event) =>
          router.push(switchLocalePath(pathname, event.target.value as Locale))
        }
        value={locale}
      >
        {locales.map((supportedLocale) => (
          <option key={supportedLocale} value={supportedLocale}>
            {labels[supportedLocale]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        className={clsx(
          'pointer-events-none absolute right-3 h-4 w-4',
          invert ? 'fill-white/70' : 'fill-neutral-500',
        )}
        viewBox="0 0 16 16"
      >
        <path d="M4.47 6.97a.75.75 0 0 1 1.06 0L8 9.44l2.47-2.47a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 0-1.06Z" />
      </svg>
    </label>
  )
}
