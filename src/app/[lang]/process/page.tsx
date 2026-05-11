import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { getDictionary, isLocale } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Proceso',
}

export default async function Process({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  let { lang } = await params

  if (!isLocale(lang)) {
    notFound()
  }

  let dict = await getDictionary(lang)

  return (
    <RootLayout>
      <PageIntro
        eyebrow={dict.future.process.eyebrow}
        title={dict.future.process.title}
      >
        <p>{dict.future.process.body}</p>
      </PageIntro>
      <ContactSection />
    </RootLayout>
  )
}
