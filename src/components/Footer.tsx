'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { SocialMedia } from '@/components/SocialMedia'
import { defaultLocale, getLocalizedHref, isLocale, type Locale } from '@/i18n'

const copy = {
  es: {
    navigation: 'Navegación',
    connect: 'Contacto',
    home: 'Inicio',
    services: 'Servicios',
    about: 'Quiénes somos',
    contact: 'Contacto',
    firstContact: 'Primer contacto',
    firstContactBody:
      'Escribinos para conversar sobre una plataforma, reporte o diagnóstico territorial.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    copyright: '© joinGIS',
  },
  en: {
    navigation: 'Navigation',
    connect: 'Contact',
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    firstContact: 'First contact',
    firstContactBody:
      'Write to us to discuss a platform, report or territorial diagnosis.',
    email: 'Email',
    whatsapp: 'WhatsApp',
    copyright: '© joinGIS',
  },
} satisfies Record<Locale, Record<string, string>>

function useLocale() {
  let params = useParams()
  let lang = params.lang

  return typeof lang === 'string' && isLocale(lang) ? lang : defaultLocale
}

function Navigation() {
  let locale = useLocale()
  let t = copy[locale]
  let sections = [
    {
      title: t.navigation,
      links: [
        { title: t.home, href: '/' },
        { title: t.services, href: '/services' },
        { title: t.about, href: '/about' },
        { title: t.contact, href: '/contact' },
      ],
    },
    {
      title: t.connect,
      links: [
        { title: t.email, href: 'mailto:hello@joingis.net' },
        { title: t.whatsapp, href: 'https://wa.me/543825554196' },
      ],
    },
  ]

  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8">
        {sections.map((section) => (
          <li key={section.title}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link) => (
                <li key={link.href} className="mt-4">
                  <Link
                    href={
                      link.href.startsWith('/')
                        ? getLocalizedHref(link.href, locale)
                        : link.href
                    }
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ContactPrompt() {
  let locale = useLocale()
  let t = copy[locale]

  return (
    <div className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        {t.firstContact}
      </h2>
      <p className="mt-4 text-sm text-neutral-700">{t.firstContactBody}</p>
      <div className="mt-6 flex items-center gap-x-6">
        <Link
          href="mailto:hello@joingis.net"
          className="text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
        >
          hello@joingis.net
        </Link>
        <SocialMedia />
      </div>
    </div>
  )
}

export function Footer() {
  let locale = useLocale()
  let t = copy[locale]

  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <ContactPrompt />
          </div>
        </div>
        <div className="mt-24 mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
          <Link href={getLocalizedHref('/', locale)} aria-label="Home">
            <Logo className="h-14 w-36" fillOnHover />
          </Link>
          <p className="text-sm text-neutral-700">
            {t.copyright} {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
