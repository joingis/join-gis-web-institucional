import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { getDictionary, isLocale } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Casos',
}

export default async function Work({
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
      <PageIntro eyebrow={dict.future.work.eyebrow} title={dict.future.work.title}>
        <p>{dict.future.work.body}</p>
      </PageIntro>
      <ContactSection />
    </RootLayout>
  )
}
