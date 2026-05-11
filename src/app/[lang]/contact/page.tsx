import { type Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { RootLayout } from '@/components/RootLayout'
import { getDictionary, isLocale } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contactá a joinGIS para conversar sobre infraestructura GIS, datos territoriales y reportes.',
}

export default async function Contact({
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
        eyebrow={dict.contact.intro.eyebrow}
        title={dict.contact.intro.title}
      >
        <p>{dict.contact.intro.body}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <FadeIn>
            <h2 className="font-display text-base font-semibold text-neutral-950">
              {dict.contact.detailsTitle}
            </h2>
            <dl className="mt-6 space-y-8 text-base text-neutral-600">
              <div>
                <dt className="font-semibold text-neutral-950">Email</dt>
                <dd className="mt-1">
                  <Link
                    href="mailto:hello@joingis.net"
                    className="hover:text-neutral-950"
                  >
                    {dict.common.email}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-950">WhatsApp</dt>
                <dd className="mt-1">
                  <Link
                    href="https://wa.me/543825554196"
                    className="hover:text-neutral-950"
                  >
                    {dict.common.phone}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-950">
                  {dict.common.locationLabel}
                </dt>
                <dd className="mt-1">{dict.common.address}</dd>
              </div>
            </dl>

            <Border className="mt-12 pt-12">
              <h2 className="font-display text-base font-semibold text-neutral-950">
                {dict.common.followLabel}
              </h2>
              <SocialMedia className="mt-6" />
            </Border>
          </FadeIn>

          <FadeIn className="rounded-3xl bg-neutral-950 p-8 sm:p-10">
            <h2 className="font-display text-3xl font-medium text-white">
              joinGIS
            </h2>
            <p className="mt-6 text-base text-neutral-300">
              {dict.contact.intro.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="mailto:hello@joingis.net" invert>
                {dict.contact.emailAction}
              </Button>
              <Button href="https://wa.me/543825554196" invert>
                {dict.contact.whatsappAction}
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </RootLayout>
  )
}
