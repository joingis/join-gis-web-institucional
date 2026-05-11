import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { getDictionary, isLocale } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Notas',
}

export default async function Blog({
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
      <PageIntro eyebrow={dict.future.blog.eyebrow} title={dict.future.blog.title}>
        <p>{dict.future.blog.body}</p>
      </PageIntro>
      <ContactSection />
    </RootLayout>
  )
}
