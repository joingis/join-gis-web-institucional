import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { RootLayout } from '@/components/RootLayout'
import { getDictionary, isLocale } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Servicios',
  description:
    'Servicios de infraestructura GIS, reportes territoriales y análisis geoestadístico.',
}

export default async function Services({
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
        eyebrow={dict.services.intro.eyebrow}
        title={dict.services.intro.title}
      >
        <p>{dict.services.intro.body}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger>
          <GridList>
            {dict.services.items.map(
              (service: { title: string; body: string }) => (
                <GridListItem key={service.title} title={service.title}>
                  {service.body}
                </GridListItem>
              ),
            )}
          </GridList>
        </FadeInStagger>
      </Container>

      <SectionIntro
        eyebrow={dict.services.workflow.eyebrow}
        title={dict.services.workflow.title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{dict.services.workflow.body}</p>
      </SectionIntro>

      <ContactSection />
    </RootLayout>
  )
}
