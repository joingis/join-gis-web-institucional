import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { RootLayout } from '@/components/RootLayout'
import { getDictionary, isLocale } from './dictionaries'

export const metadata: Metadata = {
  description:
    'Infraestructura GIS, datos territoriales y análisis geoestadístico para organizaciones públicas y privadas.',
}

export default async function Home({
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
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-4xl">
          <p className="font-display text-base font-semibold text-neutral-950">
            {dict.home.hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            {dict.home.hero.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-neutral-600">
            {dict.home.hero.body}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={`/${lang}/contact`}>
              {dict.home.hero.primaryCta}
            </Button>
            <Button href={`/${lang}/services`}>
              {dict.home.hero.secondaryCta}
            </Button>
          </div>
        </FadeIn>
      </Container>

      <Container className="mt-16 sm:mt-24">
        <FadeIn>
          <StatList>
            {dict.home.stats.map(
              (stat: { value: string; label: string }) => (
                <StatListItem
                  key={stat.value}
                  value={stat.value}
                  label={stat.label}
                />
              ),
            )}
          </StatList>
        </FadeIn>
      </Container>

      <SectionIntro
        eyebrow={dict.home.platform.eyebrow}
        title={dict.home.platform.title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{dict.home.platform.body}</p>
      </SectionIntro>

      <Container className="mt-16">
        <FadeInStagger>
          <GridList>
            {dict.services.items
              .slice(0, 4)
              .map((service: { title: string; body: string }) => (
                <GridListItem key={service.title} title={service.title}>
                  {service.body}
                </GridListItem>
              ))}
          </GridList>
        </FadeInStagger>
      </Container>

      <SectionIntro
        eyebrow={dict.home.sectors.eyebrow}
        title={dict.home.sectors.title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{dict.home.sectors.body}</p>
      </SectionIntro>

      <ContactSection />
    </RootLayout>
  )
}
