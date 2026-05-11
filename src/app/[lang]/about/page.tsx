import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { getDictionary, isLocale } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Quiénes somos',
  description:
    'Un equipo que combina software, agrimensura y urbanismo para crear soluciones GIS.',
}

export default async function About({
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
        eyebrow={dict.about.intro.eyebrow}
        title={dict.about.intro.title}
      >
        <p>{dict.about.intro.body}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger>
          <ul
            role="list"
            className="grid grid-cols-1 gap-8 lg:grid-cols-3"
          >
            {dict.about.team.map(
              (person: { name: string; role: string; body: string }) => (
                <li key={person.name}>
                  <FadeIn className="h-full rounded-3xl bg-neutral-950 p-8">
                    <h2 className="font-display text-2xl font-semibold text-white">
                      {person.name}
                    </h2>
                    <p className="mt-2 text-sm font-semibold text-neutral-300">
                      {person.role}
                    </p>
                    <p className="mt-6 text-base text-neutral-300">
                      {person.body}
                    </p>
                  </FadeIn>
                </li>
              ),
            )}
          </ul>
        </FadeInStagger>
      </Container>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger>
          <GridList>
            {dict.about.values.map(
              (value: { title: string; body: string }) => (
                <GridListItem key={value.title} title={value.title}>
                  {value.body}
                </GridListItem>
              ),
            )}
          </GridList>
        </FadeInStagger>
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
