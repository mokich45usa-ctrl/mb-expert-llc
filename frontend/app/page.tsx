'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Clock3,
  Menu,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
  Activity,
  CircleGauge,
  FileBarChart2,
  RotateCcw,
  ScanLine,
  Wrench,
  ChevronRight,
} from 'lucide-react';
import { getHomePage, getSiteSettings } from '../lib/sanity/queries';

type ServiceCard = {
  icon: typeof ScanLine;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const services: ServiceCard[] = [
  {
    icon: ScanLine,
    title: 'Comprehensive System Scanning',
    description: 'Deep scans across vehicle modules to quickly identify active and stored faults.',
    image: '/assets/service-01.webp',
    alt: 'Diagnostic tablet connected to a vehicle',
  },
  {
    icon: Activity,
    title: 'DTC Analysis & Interpretation',
    description: 'Clear decoding of trouble codes so you know what the vehicle is actually reporting.',
    image: '/assets/service-02.webp',
    alt: 'Mechanic reviewing diagnostics on a laptop',
  },
  {
    icon: CircleGauge,
    title: 'Live Data Stream Monitoring',
    description: 'Real-time sensor and system monitoring to catch intermittent issues in motion.',
    image: '/assets/service-03.webp',
    alt: 'Car dashboard and performance gauges',
  },
  {
    icon: RotateCcw,
    title: 'Service Light Reset',
    description: 'Reset maintenance alerts and service indicators after completed repairs or service.',
    image: '/assets/service-04.webp',
    alt: 'Mechanic using scan tools in a service bay',
  },
  {
    icon: FileBarChart2,
    title: 'Electronic Health Reports',
    description: 'Simple, readable reports summarizing fault states, findings, and next steps.',
    image: '/assets/service-05.webp',
    alt: 'Professional reviewing vehicle service reports',
  },
  {
    icon: Wrench,
    title: 'Advanced Performance Testing',
    description: 'Targeted performance checks to validate repair results and expose hidden issues.',
    image: '/assets/service-06.webp',
    alt: 'Car engine performance inspection',
  },
];

const steps = [
  {
    number: '01',
    title: 'Choose Your Service',
    description:
      'Tell us what is going on with the vehicle and we match the right mobile mechanic or locksmith service to the issue.',
    image: '/assets/step1.webp',
    alt: 'Step one service selection image',
  },
  {
    number: '02',
    title: 'Make an APPOINTMENT',
    description:
      'We set a convenient time and location, whether that is your home, workplace parking lot, or the roadside.',
    image: '/assets/step2.webp',
    alt: 'Step two appointment image',
  },
  {
    number: '03',
    title: "We'll take YOUR CAR for repair",
    description:
      'We arrive equipped, handle the repair or diagnostic work on site, and move the job forward without dealership delays.',
    image: '/assets/step3.webp',
    alt: 'Step three repair image',
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homeData, setHomeData] = useState<Awaited<ReturnType<typeof getHomePage>>>(null);
  const [siteSettings, setSiteSettings] = useState<Awaited<ReturnType<typeof getSiteSettings>>>(null);
  const [formData, setFormData] = useState({
    zipCode: '',
    year: '',
    make: '',
    model: '',
    phone: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    let mounted = true;

    void Promise.all([getHomePage(), getSiteSettings()]).then(([homePage, settings]) => {
      if (!mounted) {
        return;
      }

      setHomeData(homePage);
      setSiteSettings(settings);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const businessName = siteSettings?.businessName ?? 'MB Expert LLC';
  const tagline = siteSettings?.tagline ?? 'Mobile Mechanic and Locksmith';
  const phone = siteSettings?.phone ?? '231-392-6204';
  const email = siteSettings?.email ?? 'mbexpertllc@gmail.com';
  const address = siteSettings?.address ?? 'Traverse City, MI 49686';
  const serviceArea = siteSettings?.serviceArea ?? 'Serving Northern Michigan';
  const primaryCtaLabel = siteSettings?.primaryCtaLabel ?? 'Request Service';

  const heroEyebrow = homeData?.heroEyebrow ?? 'Northern Michigan mobile service';
  const heroTitle =
    homeData?.heroTitle ?? 'Dealer-level diagnostics and locksmith support at your location.';
  const heroSubtitle =
    homeData?.heroSubtitle ??
    'MB Expert LLC brings professional mobile mechanic service to Traverse City and Northern Michigan with clean communication, advanced scan tools, and fast on-site support.';
  const heroBackgroundImage = homeData?.heroBackgroundImage?.url ?? '/assets/hero-main.webp';
  const aboutEyebrow = homeData?.aboutEyebrow ?? 'About Us';
  const aboutTitle =
    homeData?.aboutTitle ?? 'Professional mobile diagnostics and repair, built around your schedule.';
  const aboutBody =
    homeData?.aboutBody ??
    'MB Expert LLC is a professional Mobile Mechanic service based in Traverse City, serving vehicle owners throughout Northern Michigan. We understand how valuable your time is, which is why we bring modern auto service directly to you - at your home, your workplace parking lot, or right at the location of an unexpected breakdown. Modern vehicles are complex systems that require precision, deep knowledge, and the right tools. Instead of wasting time driving to a dealership or waiting for a tow truck, you get highly qualified assistance wherever it is convenient for you. We arrive fully equipped with advanced, dealer-level diagnostic tools and software, allowing us to solve technical problems of any complexity right on the spot.';
  const aboutImage = homeData?.aboutImage?.url ?? '/assets/aboutus.webp';
  const aboutCtaLabel = homeData?.aboutCta?.label ?? primaryCtaLabel;
  const servicesEyebrow = 'Our Services';
  const servicesTitle =
    'Diagnostics and performance support built around modern vehicles.';
  const servicesIntro =
    'The service list is focused, technical, and practical. It is designed to explain what MB Expert LLC actually does while keeping the page clean enough to convert.';
  const contactEyebrow = homeData?.contactEyebrow ?? 'Contact and Estimate';
  const contactTitle =
    homeData?.contactTitle ?? 'Send the issue once. Get the next step faster.';
  const contactBody =
    homeData?.contactBody ??
    'This form is set up to collect the right information quickly so MB Expert LLC can respond with a clear next step.';
  const contactBackgroundImage =
    homeData?.contactBackgroundImage?.url ??
    'https://mbexpertllc.com/wp-content/uploads/2026/03/11887-e1772742262479-957x1024.jpg';
  const featuredServicesSource = homeData?.featuredServices?.length ? homeData.featuredServices : services;
  const featuredServices = featuredServicesSource.map((service, index) => {
    const fallback = services[index % services.length];
    const image = 'imageUrl' in service ? service.imageUrl : fallback.image;
    return {
      icon: fallback.icon,
      title: service?.title ?? fallback.title,
      description: service?.description ?? fallback.description,
      image: image ?? fallback.image,
      alt: fallback.alt,
    };
  });
  const processTitle = homeData?.processTitle ?? 'Three steps, no friction.';
  const processIntro =
    'The flow is simple: pick the service, set the appointment, and let MB Expert LLC handle the repair with the right tools on site.';
  const processSteps = steps.map((fallback, index) => {
    const step = homeData?.processSteps?.[index];
    return {
      number: step?.stepLabel ?? fallback.number,
      title: step?.title ?? fallback.title,
      description: step?.description ?? fallback.description,
      image: step?.imageUrl ?? fallback.image,
      alt: fallback.alt,
    };
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="site-root">
      <header className="site-header">
        <div className="section-shell">
          <div className="section-inner site-header__inner">
            <button onClick={() => scrollToSection('hero')} className="brand-button" type="button">
              <span className="brand-logo-shell">
                <img src={siteSettings?.logo?.url ?? '/assets/mb-expert-logo.png'} alt="MB Expert LLC logo" className="brand-logo" />
              </span>
              <span className="brand-copy">
                <span className="brand-title">{businessName}</span>
                <span className="brand-subtitle">{tagline}</span>
              </span>
            </button>

            <nav className="site-nav">
              <button type="button" onClick={() => scrollToSection('about')}>About</button>
              <button type="button" onClick={() => scrollToSection('services')}>Services</button>
              <button type="button" onClick={() => scrollToSection('process')}>How It Works</button>
              <button type="button" onClick={() => scrollToSection('contact')}>Contact</button>
              <Link href="/services">Full Services</Link>
            </nav>

            <div className="site-header__actions">
              <button type="button" className="button-primary button-primary--header" onClick={() => scrollToSection('contact')}>
                <Phone className="icon-sm" />
                {primaryCtaLabel}
              </button>
              <button
                type="button"
                className="site-menu-toggle"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X className="icon-md" /> : <Menu className="icon-md" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen ? (
          <div className="site-mobile-menu">
            <button type="button" onClick={() => scrollToSection('about')}>About</button>
            <button type="button" onClick={() => scrollToSection('services')}>Services</button>
            <button type="button" onClick={() => scrollToSection('process')}>How It Works</button>
            <button type="button" onClick={() => scrollToSection('contact')}>Contact</button>
            <Link href="/services">Full Services</Link>
          </div>
        ) : null}
      </header>

      <section id="hero" className="hero-section">
        <div className="hero-background">
          <img src={heroBackgroundImage} alt="MB Expert LLC service vehicle" />
          <div className="hero-overlay" />
          <div className="hero-radial" />
        </div>

        <div className="section-shell hero-shell">
          <div className="section-inner hero-inner">
            <div className="hero-content">
              <div className="section-kicker section-kicker--hero">{heroEyebrow}</div>
              <h1>{heroTitle}</h1>
              <p>{heroSubtitle}</p>
              <div className="hero-actions">
                <button type="button" className="button-primary" onClick={() => scrollToSection('contact')}>
                  {primaryCtaLabel} <ArrowRight className="icon-sm" />
                </button>
                <button type="button" className="button-secondary button-secondary--hero" onClick={() => scrollToSection('services')}>
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="content-section">
        <div className="section-shell">
          <div className="section-inner split-grid split-grid--about">
            <div className="split-copy">
              <div className="section-kicker">{aboutEyebrow}</div>
              <h2>{aboutTitle}</h2>
              <p>{aboutBody}</p>
              <button type="button" className="button-primary" onClick={() => scrollToSection('contact')}>
                {aboutCtaLabel} <ArrowRight className="icon-sm" />
              </button>
            </div>

            <div className="media-frame">
              <img src={aboutImage} alt="MB Expert LLC mobile diagnostics in action" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="content-section content-section--soft">
        <div className="section-shell">
          <div className="section-inner">
            <div className="section-head">
              <div>
                <div className="section-kicker">{servicesEyebrow}</div>
                <h2>{servicesTitle}</h2>
              </div>
              <div className="section-head__body">
                <p>{servicesIntro}</p>
                <Link href="/services" className="button-secondary button-secondary--inline">
                  View Full Services List <ChevronRight className="icon-sm" />
                </Link>
              </div>
            </div>

            <div className="services-grid">
              {featuredServices.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="service-card">
                    <div className="service-card__media">
                      <img src={service.image} alt={service.alt} />
                      <div className="service-card__icon"><Icon className="icon-md" /></div>
                      <div className="service-card__tag">MB Expert LLC</div>
                    </div>
                    <div className="service-card__body">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <div className="service-card__footer">Technical service</div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="content-section">
        <div className="section-shell">
          <div className="section-inner">
            <div className="section-head section-head--process">
              <div>
                <div className="section-kicker">{homeData?.processEyebrow ?? 'How it works'}</div>
                <h2>{processTitle}</h2>
              </div>
              <p>{processIntro}</p>
            </div>

            <div className="steps-grid">
              {processSteps.map((step) => (
                <article key={step.number} className="step-card">
                  <div className="step-card__media">
                    <img src={step.image} alt={step.alt} />
                    <div className="step-card__label">Step {step.number}</div>
                  </div>
                  <div className="step-card__body">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                    {step.number === '03' ? (
                      <button type="button" className="button-accent" onClick={() => scrollToSection('contact')}>
                        Request Service <ArrowRight className="icon-sm" />
                      </button>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-section__bg">
          <img src={contactBackgroundImage} alt="Traverse City map background" />
          <div className="contact-section__overlay" />
        </div>

        <div className="section-shell contact-section__shell">
          <div className="section-inner">
            <div className="section-head section-head--contact">
              <div>
                <div className="section-kicker">{contactEyebrow}</div>
                <h2>{contactTitle}</h2>
              </div>
              <p>{contactBody}</p>
            </div>

            <div className="contact-grid">
              <div className="contact-info-card">
                <h3>Contact information</h3>
                  <div className="contact-list">
                  <div className="contact-item">
                    <div className="contact-item__icon"><Phone className="icon-sm" /></div>
                      <div>
                        <div className="contact-item__label">Phone</div>
                      <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`}>{phone}</a>
                      <div className="contact-item__meta">Call or text for scheduling</div>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item__icon"><Mail className="icon-sm" /></div>
                    <div>
                      <div className="contact-item__label">Email</div>
                      <a href={`mailto:${email}`}>{email}</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item__icon"><MapPin className="icon-sm" /></div>
                    <div>
                      <div className="contact-item__label">Location</div>
                      <div className="contact-item__value">{address}</div>
                      <div className="contact-item__meta">{serviceArea}</div>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item__icon"><Clock3 className="icon-sm" /></div>
                    <div>
                      <div className="contact-item__label">Hours</div>
                      <div className="contact-item__value">8:00 AM - 10:00 PM</div>
                      <div className="contact-item__meta">All days</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-form-card">
                <h3>Request service</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form__grid">
                    {[
                      { id: 'zipCode', label: 'ZIP Code', type: 'text', placeholder: '49686' },
                      { id: 'year', label: 'Year', type: 'text', placeholder: '2019' },
                      { id: 'make', label: 'Make', type: 'text', placeholder: 'Mercedes-Benz' },
                      { id: 'model', label: 'Model', type: 'text', placeholder: 'GLE 350' },
                      { id: 'phone', label: 'Phone', type: 'tel', placeholder: '231-392-6204' },
                      { id: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
                    ].map((field) => (
                      <label key={field.id} className="field-group" htmlFor={field.id}>
                        <span>{field.label}</span>
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={formData[field.id as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required={field.id !== 'email'}
                        />
                      </label>
                    ))}
                  </div>

                  <label className="field-group field-group--full" htmlFor="message">
                    <span>Describe your issue</span>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Include warning lights, no-start condition, key issue, lockout or any recent repair history."
                    />
                  </label>

                  <button type="submit" className="button-primary button-primary--wide">
                    <Send className="icon-sm" /> Send request
                  </button>

                  <p className="form-note">
                    Current form action is placeholder-only in this template build. For launch, it should be connected to email, CRM or call tracking.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell">
          <div className="section-inner site-footer__inner">
            <div>
              <div className="footer-brand">
                <img src={siteSettings?.logo?.url ?? '/assets/mb-expert-logo.png'} alt="MB Expert LLC logo" />
                <div>
                  <div className="footer-brand__title">{businessName}</div>
                  <div className="footer-brand__subtitle">{tagline}</div>
                </div>
              </div>
              <p>{tagline}</p>
            </div>
            <div>
              <div className="footer-heading">Quick links</div>
              <div className="footer-links">
                <button type="button" onClick={() => scrollToSection('about')}>About</button>
                <button type="button" onClick={() => scrollToSection('services')}>Services</button>
                <button type="button" onClick={() => scrollToSection('process')}>How It Works</button>
                <button type="button" onClick={() => scrollToSection('contact')}>Contact</button>
              </div>
            </div>
            <div>
              <div className="footer-heading">Contact</div>
              <div className="footer-contact">{phone}</div>
              <div className="footer-contact">{email}</div>
              <div className="footer-contact">{address}</div>
            </div>
          </div>
          <div className="site-footer__bar">© 2026 MB Expert LLC. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
