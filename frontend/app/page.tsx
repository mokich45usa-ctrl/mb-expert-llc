import Link from "next/link";
import { getHomePage, getSiteSettings } from "../lib/sanity/queries";

const fallbackHeroImage =
  "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1600&q=80";
const fallbackAboutImage =
  "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?auto=format&fit=crop&w=1600&q=80";
const fallbackContactImage =
  "https://images.unsplash.com/photo-1551731409-43eb3e517a1a?auto=format&fit=crop&w=1600&q=80";

const fallbackServices = [
  {
    title: "Comprehensive System Scanning",
    description: "Full vehicle-level diagnostics that identify hidden issues before they become expensive repairs.",
    imageUrl:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "DTC Analysis & Interpretation",
    description: "We decode fault codes and translate them into clear repair actions.",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Live Data Stream Monitoring",
    description: "See what the vehicle is doing in real time with dealer-grade scan tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1515923162273-70f4c19a8c2f?auto=format&fit=crop&w=1200&q=80",
  },
];

const fallbackSteps = [
  {
    stepLabel: "Step 01",
    title: "Choose Your Service",
    description: "Pick the repair, diagnostic, or locksmith service that matches the issue.",
    imageUrl: fallbackHeroImage,
  },
  {
    stepLabel: "Step 02",
    title: "Make an Appointment",
    description: "Tell us the location and timing that works best for your schedule.",
    imageUrl: fallbackAboutImage,
  },
  {
    stepLabel: "Step 03",
    title: "We Take Your Car for Repair",
    description: "We arrive, diagnose, and complete the work with mobile convenience.",
    imageUrl: fallbackContactImage,
  },
];

export default async function HomePage() {
  const [home, settings] = await Promise.all([getHomePage(), getSiteSettings()]);

  const hero = {
    eyebrow: home?.heroEyebrow ?? "MB Expert LLC",
    title:
      home?.heroTitle ??
      "Dealer-grade diagnostics and mobile repair, delivered where you are.",
    subtitle:
      home?.heroSubtitle ??
      "We help vehicle owners across Northern Michigan with precise diagnostics, electrical repair, locksmith service, and mobile mechanical support.",
    backgroundImageUrl: home?.heroBackgroundImage?.url ?? fallbackHeroImage,
    primaryCta: home?.heroPrimaryCta ?? {
      label: "Request Service",
      href: "#contact",
    },
    secondaryCta: home?.heroSecondaryCta ?? {
      label: "View Services",
      href: "/services",
    },
  };

  const about = {
    eyebrow: home?.aboutEyebrow ?? "About Us",
    title:
      home?.aboutTitle ??
      "Professional mobile service built around convenience, precision, and trust.",
    body:
      home?.aboutBody ??
      "MB Expert LLC is a professional mobile mechanic service based in Traverse City, serving vehicle owners throughout Northern Michigan. We bring modern auto service directly to your home, workplace, or breakdown location so you do not lose time to towing, waiting rooms, or unnecessary shop visits.",
    imageUrl: home?.aboutImage?.url ?? fallbackAboutImage,
    cta: home?.aboutCta ?? { label: "Book an Appointment", href: "#contact" },
  };

  const services = home?.featuredServices?.length ? home.featuredServices : fallbackServices;
  const steps = home?.processSteps?.length ? home.processSteps : fallbackSteps;

  const contact = {
    eyebrow: home?.contactEyebrow ?? "Contact and Estimate",
    title:
      home?.contactTitle ??
      "Tell us what is wrong and we will point you toward the right next step.",
    body:
      home?.contactBody ??
      "Share the vehicle symptoms, location, and preferred time. We will respond with the best service path and estimated next steps.",
    backgroundImageUrl: home?.contactBackgroundImage?.url ?? fallbackContactImage,
    cta: home?.contactCta ?? { label: "Send Request", href: "#contact-form" },
  };

  return (
    <main className="site">
      <header className="topbar">
        <div className="shell topbar__inner">
          <Link className="brand" href="/">
            <span className="brand__mark" />
            <span>{settings?.businessName ?? "MB Expert LLC"}</span>
          </Link>

          <nav className="nav" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#process">How It Works</a>
            <a href="#contact">Contact</a>
            <Link className="button button--secondary button--small" href="/services">
              Full Services
            </Link>
          </nav>
        </div>
      </header>

      <section className="section section--hero section--tall">
        <div className="shell hero">
          <div className="hero__copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="hero__title">{hero.title}</h1>
            <p className="hero__text">{hero.subtitle}</p>
            <div className="hero__actions">
              <a className="button button--primary" href={hero.primaryCta.href ?? "#contact"}>
                {hero.primaryCta.label ?? "Request Service"}
              </a>
              <a className="button button--secondary" href={hero.secondaryCta.href ?? "/services"}>
                {hero.secondaryCta.label ?? "View Services"}
              </a>
            </div>
            <div className="hero__metrics">
              <div className="metric">
                <span className="metric__value">Mobile</span>
                <span className="metric__label">Service delivered on-site, where you need it.</span>
              </div>
              <div className="metric">
                <span className="metric__value">Dealer-level</span>
                <span className="metric__label">Diagnostics and electrical tools for modern vehicles.</span>
              </div>
              <div className="metric">
                <span className="metric__value">Northern MI</span>
                <span className="metric__label">Based in Traverse City and serving the surrounding area.</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <img src={hero.backgroundImageUrl} alt="MB Expert LLC hero background" />
          </div>
        </div>
      </section>

      <section className="section section--tall" id="about">
        <div className="shell split">
          <div className="split__copy">
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 className="split__title">{about.title}</h2>
            <p className="split__body">{about.body}</p>
            <div className="section__actions">
              <a className="button button--primary" href={about.cta.href ?? "#contact"}>
                {about.cta.label ?? "Book an Appointment"}
              </a>
              <a className="button button--secondary" href="#services">
                See Services
              </a>
            </div>
          </div>

          <div className="split__visual">
            <img src={about.imageUrl} alt="About MB Expert LLC" />
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="shell">
          <div className="section__head">
            <div>
              <p className="eyebrow">Our Services</p>
              <h2 className="section__title">Professional work, grouped for easy browsing.</h2>
              <p className="section__text">
                The homepage features the highest-priority services. The full catalog lives on its own
                page so clients can browse by category without losing the main conversion flow.
              </p>
            </div>
            <Link className="section__link" href="/services">
              View full services list
            </Link>
          </div>

          <div className="cards">
            {services.map((service, index) => (
              <article className="service-card" key={service.title ?? `service-${index}`}>
                <div className="service-card__image">
                  <img
                    src={service.imageUrl ?? fallbackHeroImage}
                    alt={service.title ?? "Featured service"}
                  />
                </div>
                <h3 className="service-card__title">{service.title ?? "Featured service"}</h3>
                <p className="service-card__text">{service.description}</p>
                <a className="button button--secondary button--small" href="#contact">
                  Order Service
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tall" id="process">
        <div className="shell">
          <div className="section__head">
            <div>
              <p className="eyebrow">{home?.processEyebrow ?? "How It Works"}</p>
              <h2 className="section__title">{home?.processTitle ?? "A simple process built around your schedule."}</h2>
            </div>
          </div>

          <div className="card-grid">
            {steps.map((step, index) => (
              <article className="step-card" key={step.stepLabel ?? step.title ?? `step-${index}`}>
                <div className="service-card__image">
                  <img src={step.imageUrl ?? fallbackHeroImage} alt={step.title ?? "How it works step"} />
                </div>
                <p className="eyebrow" style={{ marginTop: "16px" }}>
                  {step.stepLabel}
                </p>
                <h3 className="step-card__title">{step.title ?? "Step"}</h3>
                <p className="step-card__text">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tall" id="contact">
        <div className="shell split">
          <div className="split__copy">
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2 className="split__title">{contact.title}</h2>
            <p className="split__body">{contact.body}</p>
            <div className="contact-panel" id="contact-form">
              <div className="contact-panel__grid">
                <div className="contact-panel__item">
                  <span className="contact-panel__label">Phone</span>
                  <span className="contact-panel__value">{settings?.phone ?? "(Add phone in Sanity)"}</span>
                </div>
                <div className="contact-panel__item">
                  <span className="contact-panel__label">Email</span>
                  <span className="contact-panel__value">{settings?.email ?? "(Add email in Sanity)"}</span>
                </div>
                <div className="contact-panel__item">
                  <span className="contact-panel__label">Service area</span>
                  <span className="contact-panel__value">{settings?.serviceArea ?? "Northern Michigan"}</span>
                </div>
                <div className="contact-panel__item">
                  <span className="contact-panel__label">Address</span>
                  <span className="contact-panel__value">{settings?.address ?? "Traverse City, MI"}</span>
                </div>
              </div>
              <a className="button button--primary" href={contact.cta.href ?? "#contact-form"}>
                {contact.cta.label ?? "Send Request"}
              </a>
            </div>
          </div>

          <div className="contact__visual">
            <img src={contact.backgroundImageUrl} alt="Service area map or location image" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer__inner">
          <span>{settings?.businessName ?? "MB Expert LLC"} - mobile mechanic and diagnostics.</span>
          <span>{settings?.tagline ?? "Built for lead generation and professional trust."}</span>
        </div>
      </footer>
    </main>
  );
}
