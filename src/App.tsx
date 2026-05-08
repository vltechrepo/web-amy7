import { useEffect, useState } from 'react'

import BackgroundGradientSnippet from '@/components/ui/background-gradient-snippet'

type Product = {
  id: string
  number: string
  title: string
  description: string
  image: string
}

type Metric = {
  label: string
  value: string
}

const navigation = [
  { href: '#vision', label: 'Vision' },
  { href: '#catalogo', label: 'Catalogo' },
  { href: '#especificaciones', label: 'Tecnica' },
  { href: '#contacto', label: 'Contacto', primary: true },
]

const products: Product[] = [
  {
    id: 'boxes',
    number: '01',
    title: 'Cajas de Carton',
    description:
      'Corrugado de alta densidad con acabado mate o satinado. Rigidez estructural garantizada.',
    image:
      'https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&q=80',
  },
  {
    id: 'tapes',
    number: '02',
    title: 'Cintas Adhesivas',
    description:
      'Personalizacion en oro y chocolate. Adhesion superior para superficies dificiles.',
    image:
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80',
  },
  {
    id: 'film',
    number: '03',
    title: 'Stretch Film',
    description:
      'Peliculas tecnicas de alto rendimiento. El equilibrio perfecto entre estiramiento y fuerza.',
    image:
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80',
  },
]

const metrics: Metric[] = [
  { label: 'Resistencia al impacto', value: 'ASTM D4169' },
  { label: 'Adherencia tecnica', value: 'PSTC-101' },
  { label: 'Elongacion maxima', value: '350%' },
]

const contactDetails = [
  {
    id: 'email',
    label: 'Email',
    value: 'contacto@amy7.mx',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6.75h16v10.5H4z" rx="2" />
        <path d="m5.5 8 6.5 5 6.5-5" />
      </svg>
    ),
  },
  {
    id: 'location',
    label: 'Ubicacion',
    value: 'Monterrey, Mexico',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s6-4.35 6-10a6 6 0 1 0-12 0c0 5.65 6 10 6 10Z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    ),
  },
]

function Logo({ className = 'h-9 w-auto' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 60" aria-label="AMY7 logo" role="img">
      <path
        d="M10 50L30 10L50 50 M18 38H42 M60 50V10L80 35L100 10V50 M110 10L130 30L150 10 M130 30V50"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
      <path
        d="M165 10H205L180 50 M185 30H198"
        fill="none"
        stroke="var(--color-gold)"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('#vision')

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) return

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3

      let currentSection = sections[0].id

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentSection = section.id
        }
      }

      setActiveSection(`#${currentSection}`)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('hashchange', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
    }
  }, [])

  return (
    <div className="relative isolate min-h-screen text-ink selection:bg-gold/30">
      <BackgroundGradientSnippet />

      <nav className="fixed inset-x-0 top-4 z-50 px-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-stone-200/80 bg-white/82 px-4 py-3 shadow-[0_16px_40px_rgba(91,75,61,0.1)] backdrop-blur-xl md:px-6">
          <a href="#vision" className="text-ink transition hover:text-gold-dark" aria-label="Ir al inicio">
            <Logo className="h-8 w-auto" />
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveSection(item.href)}
                className={
                  activeSection === item.href
                    ? 'rounded-full border border-gold/35 bg-gold-dark px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory transition hover:bg-bronze'
                    : 'rounded-full px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-brown/80 transition hover:bg-stone-100 hover:text-ink'
                }
                aria-current={activeSection === item.href ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-3 flex max-w-7xl gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveSection(item.href)}
              className={
                activeSection === item.href
                  ? 'shrink-0 rounded-full border border-gold/35 bg-gold-dark px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm'
                  : 'shrink-0 rounded-full border border-stone-200 bg-white/88 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-brown/80 backdrop-blur-sm'
              }
              aria-current={activeSection === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="relative z-10">
        <section id="vision" className="px-6 pb-20 pt-36 md:px-8 lg:px-10 lg:pb-28 lg:pt-44">
          <div className="relative mx-auto max-w-6xl text-center">
              <h1 className="hero-title mx-auto mt-10 max-w-5xl text-[4rem] leading-[0.88] text-white sm:text-[5.3rem] lg:text-[6.9rem]">
                Sistemas de embalaje
                <br />
                <span className="text-gold-light">para marcas exigentes</span>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-7 text-stone-200/88 md:text-[17px] md:leading-8">
                Sistemas de embalaje que combinan la precision de la ingenieria tecnica con la
                sofisticacion de una marca de lujo. Disenados para proteger, fabricados para
                impresionar.
              </p>

              <div className="mx-auto mt-14 max-w-5xl rounded-[2rem] border border-white/14 bg-white/[0.04] p-3 shadow-[0_26px_70px_rgba(22,14,10,0.28)] backdrop-blur-md sm:mt-16 sm:p-4">
                <div className="relative overflow-hidden rounded-[1.65rem]">
                  <div className="aspect-video w-full">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube-nocookie.com/embed/nWGkSARcXAY?rel=0"
                      title="Video de AMY7 Packaging Systems"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            
          </div>
        </section>

        <section
          id="catalogo"
          className="mx-4 rounded-[2rem] border border-white/10 bg-white/6 px-6 py-24 shadow-[0_24px_70px_rgba(0,0,0,0.2)] backdrop-blur-md md:mx-6 md:px-8 lg:mx-10 lg:px-10 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col gap-5 md:mb-18 md:flex-row md:items-end md:justify-between">
              <h2 className="font-display text-3xl leading-tight text-ivory md:text-[2.6rem]">
                Lineas de <span className="text-gold-light">Embalaje</span>
              </h2>
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold-light/72">
                Seleccion de Materiales Premium
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="paper-panel group relative overflow-hidden rounded-[1.25rem] border border-stone-900/8 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(31,26,23,0.08)] lg:p-10"
                >
                  <span className="pointer-events-none absolute left-7 top-4 font-display text-5xl leading-none text-brown/8 lg:text-6xl">
                    {product.number}
                  </span>

                  <div className="relative">
                    <h3 className="max-w-[12rem] text-lg font-bold uppercase tracking-[0.04em] text-brown">
                      {product.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-brown/76">
                      {product.description}
                    </p>

                    <div className="mt-8 overflow-hidden rounded-[1.4rem]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="especificaciones"
          className="relative overflow-hidden px-6 py-24 text-white md:px-8 lg:px-10 lg:py-32"
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/3 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-sm md:p-12 lg:p-16">
              <div className="grid gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
                <div>
                  <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                    Standard de Calidad
                  </p>
                  <h3 className="max-w-lg font-display text-3xl leading-tight text-ivory md:text-[2.4rem]">
                    Cada componente es una pieza de{' '}
                    <span className="text-gold-light">ingenieria aplicada</span>.
                  </h3>

                  <ul className="mt-10 space-y-4 text-sm text-stone-200">
                    {metrics.map((metric) => (
                      <li
                        key={metric.label}
                        className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 uppercase tracking-[0.08em]"
                      >
                        <span>{metric.label}</span>
                        <span className="text-white">{metric.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-start justify-center md:items-end">
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/6 px-8 py-8">
                    <Logo className="h-auto w-44 text-white/80" />
                  </div>
                  <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/60 md:text-right">
                    AMY7 | Innovacion y Elegancia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="px-6 py-24 md:px-8 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-gold-light">Contacto</p>
              <h2 className="mt-5 font-display text-3xl leading-tight text-white md:text-[2.7rem]">
                Listo para comenzar?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-stone-200/82">
                Cuentanos sobre tu proyecto y te responderemos con una propuesta inicial en menos
                de 24 horas habiles.
              </p>
            </div>

            <div className="mt-14 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
              <aside className="paper-panel rounded-[1.25rem] border border-stone-900/8 p-7 md:p-8">
                <h3 className="text-2xl font-semibold text-brown">Escribenos</h3>
                <p className="mt-4 max-w-sm text-[15px] leading-7 text-brown/76">
                  Comparte el tipo de embalaje que necesitas, volumen estimado y tiempos de entrega.
                </p>

                <div className="mt-8 space-y-4">
                  {contactDetails.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-[1rem] border border-stone-900/10 bg-white/92 p-4"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-paper text-gold-dark">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brown/60">
                          {item.label}
                        </p>
                        <p className="mt-1 text-base text-brown">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 border-t border-stone-900/8 pt-6">
                  <p className="text-sm leading-6 text-brown/65">
                    Respondemos en menos de 24 horas habiles.
                  </p>
                </div>
              </aside>

              <form
                className="paper-panel rounded-[1.25rem] border border-stone-900/8 p-7 md:p-8"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-brown">
                      Nombre completo <span className="text-gold-dark">*</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border border-stone-900/10 bg-white/96 px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-brown/42 focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-brown">
                      Correo electronico <span className="text-gold-dark">*</span>
                    </span>
                    <input
                      type="email"
                      placeholder="tu@empresa.com"
                      className="w-full rounded-xl border border-stone-900/10 bg-white/96 px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-brown/42 focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-brown">
                      Empresa <span className="text-brown/45">(opcional)</span>
                    </span>
                    <input
                      type="text"
                      placeholder="Nombre de tu empresa"
                      className="w-full rounded-xl border border-stone-900/10 bg-white/96 px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-brown/42 focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-brown">
                      Servicio de interes
                    </span>
                    <select className="w-full appearance-none rounded-xl border border-stone-900/10 bg-white/96 px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-gold-dark focus:ring-2 focus:ring-gold/10">
                      <option>Selecciona un servicio</option>
                      <option>Cajas de carton</option>
                      <option>Cintas adhesivas</option>
                      <option>Stretch film</option>
                      <option>Asesoria tecnica</option>
                    </select>
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-semibold text-brown">
                    Mensaje <span className="text-gold-dark">*</span>
                  </span>
                  <textarea
                    placeholder="Cuentanos que necesitas, cantidades estimadas y fechas objetivo."
                    className="h-36 w-full resize-none rounded-xl border border-stone-900/10 bg-white/96 px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-brown/42 focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-gold/35 bg-ink px-6 py-4 text-sm font-semibold text-paper-soft transition hover:bg-brown"
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-white/6 px-6 py-14 backdrop-blur-sm md:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <Logo className="h-8 w-auto text-gold-light/55" />
          <p className="text-[9px] uppercase tracking-[0.18em] text-stone-300/55">
            AMY7 Packaging Systems © 2026. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
