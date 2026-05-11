import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { isLocale, locales } from '@/i18n'
import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - joinGIS',
    default: 'joinGIS - Infraestructura GIS y datos territoriales',
  },
  description:
    'Infraestructura GIS, datos territoriales y análisis geoestadístico para organizaciones públicas y privadas.',
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  let { lang } = await params

  if (!isLocale(lang)) {
    notFound()
  }

  return (
    <html lang={lang} className="h-full bg-neutral-950 text-base antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
