import { useEffect, useState } from 'react'

import cartonImage from '@/assets/catalogo/carton.jpg'
import impresosImage from '@/assets/catalogo/impresos.jpg'
import peliculaPlasticaImage from '@/assets/catalogo/pelicula-plastica.jpg'
import logoAmy7 from '@/assets/logo-amy7.svg?raw'
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
    title: 'Carton',
    description:
      'Contamos con fabricacion de cajas de carton a la medida de la mejor calidad, con una capacidad de produccion diaria de mas de 50 mil cajas. Asegurando tiempos de entrega y abastecimiento en cualquier necesidad de nuestros clientes.',
    image: cartonImage,
  },
  {
    id: 'tapes',
    number: '02',
    title: 'Impresos',
    description:
      'Contamos con la mejor calidad y velocidad en la fabricacion de todo tipo de cintas adhesivas y flejes con impresion. Asegurando siempre tu inventario y tiempos de entrega muy eficientes.',
    image: impresosImage,
  },
  {
    id: 'film',
    number: '03',
    title: 'Pelicula Plastica',
    description:
      'Con nosotros podras tener siempre tus requerimientos de cualquier tipo de pelicula plastica abastecidos, no importa si es pelicula manual, para maquina o grado alimenticio.',
    image: peliculaPlasticaImage,
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
    <span
      className={`${className} block [&_svg]:h-full [&_svg]:w-full`}
      aria-label="AMY7 logo"
      role="img"
      dangerouslySetInnerHTML={{ __html: logoAmy7 }}
    />
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('#vision')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

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

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [activeSection])

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)

    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const response = await fetch('https://formsubmit.co/ajax/contacto@amy7.mx', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.')
      }

      setFormStatus({
        type: 'success',
        message: 'Mensaje enviado correctamente.',
      })
      form.reset()
    } catch {
      setFormStatus({
        type: 'error',
        message: 'Hubo un problema al enviar el mensaje. Intenta de nuevo.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative isolate min-h-screen text-ink selection:bg-gold/30">
      <BackgroundGradientSnippet />

      <nav className="fixed inset-x-0 top-3 z-50 px-3 md:top-4 md:px-6">
        <div className="surface-glass mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-3 shadow-[0_16px_40px_rgba(91,75,61,0.08)] backdrop-blur-xl md:px-6">
          <a href="#vision" className="text-ink transition hover:text-gold-dark" aria-label="Ir al inicio">
            <Logo className="h-7 w-auto sm:h-8" />
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

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-stone-200/70 bg-white/72 text-ink shadow-[0_10px_30px_rgba(91,75,61,0.08)] transition hover:bg-white/86 lg:hidden"
            aria-label={isMobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-[2px] w-5 rounded-full bg-current transition ${
                  isMobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[9px] h-[2px] w-5 rounded-full bg-current transition ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 top-[17px] h-[2px] w-5 rounded-full bg-current transition ${
                  isMobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>

        {isMobileMenuOpen ? (
          <div className="mx-auto mt-3 max-w-7xl rounded-[1.75rem] border border-stone-200/65 bg-white/72 p-3 shadow-[0_18px_40px_rgba(91,75,61,0.1)] backdrop-blur-xl lg:hidden">
            <div className="grid gap-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.href)}
                  className={
                    activeSection === item.href
                      ? 'rounded-2xl border border-gold/35 bg-gold-dark px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white'
                      : 'rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-brown/80'
                  }
                  aria-current={activeSection === item.href ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
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
            <div className="mb-5 md:mb-7">
              <h2 className="text-center font-display text-3xl leading-tight text-ivory md:text-left md:text-[2.6rem]">
                Lineas de <span className="text-gold-light">Embalaje</span>
              </h2>
            </div>

            <p className="mb-10 max-w-3xl text-center text-[15px] leading-7 text-stone-200/82 md:mb-12 md:text-left md:text-base">
              Nuestra especialidad es el embalaje de las siguientes 3 areas.
            </p>

            <div className="grid gap-5 md:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="paper-panel group relative overflow-hidden rounded-[1.25rem] border border-stone-900/8 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(31,26,23,0.08)] lg:p-10"
                >
                  <div className="relative">
                    <h3 className="max-w-[12rem] text-lg font-bold uppercase tracking-[0.04em] text-brown">
                      {product.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-brown/76">
                      {product.description}
                    </p>

                    <div className="relative mt-8 overflow-hidden rounded-[1.4rem] shadow-[0_18px_40px_rgba(37,24,15,0.26)]">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-56 w-full object-cover saturate-[0.82] sepia-[0.18] brightness-[0.92] contrast-[0.96] transition duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(196,169,121,0.14)_0%,rgba(121,82,46,0.18)_55%,rgba(34,24,18,0.2)_100%)] mix-blend-multiply" />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-12 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-light/78 md:mt-14">
              Todos nuestros procesos cuentan con las certificaciones ISO 9001.
            </p>
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

                <div className="flex flex-col items-center justify-center md:items-end">
                  <div className="rounded-[1.25rem] border border-white/10 bg-white/6 px-8 py-8">
                    <Logo className="h-auto w-44 text-white/80" />
                  </div>
                  <p className="mt-8 text-center text-[10px] uppercase tracking-[0.18em] text-white/60 md:text-right">
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
                      className="flex items-center gap-4 rounded-[1rem] border border-stone-900/10 bg-white/72 p-4 backdrop-blur-sm"
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
                onSubmit={handleContactSubmit}
              >
                <input type="hidden" name="_subject" value="Nuevo contacto desde amy7.mx" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_url" value="https://amy7.mx/#contacto" />

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-brown">
                      Nombre completo <span className="text-gold-dark">*</span>
                    </span>
                    <input
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      required
                      className="w-full rounded-xl border border-stone-900/10 bg-white/78 px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-brown/42 focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-brown">
                      Correo electronico <span className="text-gold-dark">*</span>
                    </span>
                    <input
                      name="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      required
                      className="w-full rounded-xl border border-stone-900/10 bg-white/78 px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-brown/42 focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-brown">
                      Empresa <span className="text-brown/45">(opcional)</span>
                    </span>
                    <input
                      name="company"
                      type="text"
                      placeholder="Nombre de tu empresa"
                      className="w-full rounded-xl border border-stone-900/10 bg-white/78 px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-brown/42 focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-brown">
                      Servicio de interes
                    </span>
                    <select
                      name="service"
                      className="w-full appearance-none rounded-xl border border-stone-900/10 bg-white/78 px-4 py-3.5 text-[15px] text-ink outline-none transition focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                    >
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
                    name="message"
                    placeholder="Cuentanos que necesitas, cantidades estimadas y fechas objetivo."
                    required
                    className="h-36 w-full resize-none rounded-xl border border-stone-900/10 bg-white/78 px-4 py-3.5 text-[15px] text-ink outline-none transition placeholder:text-brown/42 focus:border-gold-dark focus:ring-2 focus:ring-gold/10"
                  />
                </label>

                {formStatus ? (
                  <div
                    className={
                      formStatus.type === 'success'
                        ? 'mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800'
                        : 'mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800'
                    }
                  >
                    {formStatus.message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-gold/35 bg-ink px-6 py-4 text-sm font-semibold text-paper-soft transition hover:bg-brown disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
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
