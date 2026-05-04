'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Activity,
  ArrowRight,
  ChevronRight,
  CircleGauge,
  ClipboardCheck,
  Disc3,
  KeyRound,
  Menu,
  RotateCcw,
  ScanLine,
  Shield,
  SlidersHorizontal,
  Wrench,
  X,
} from 'lucide-react';

type ServiceItem = {
  title: string;
  description: string;
};

type ServiceGroup = {
  icon: typeof ScanLine;
  title: string;
  intro: string;
  items: ServiceItem[];
};

const groups: ServiceGroup[] = [
  {
    icon: ScanLine,
    title: 'In-Depth Computer Diagnostics',
    intro: 'Electronic and module-level diagnosis for modern vehicles that need more than a basic scan.',
    items: [
      {
        title: 'Full System Scan',
        description: 'A complete vehicle-wide scan to quickly uncover stored faults, communication issues, and hidden module problems.',
      },
      {
        title: 'Safety Systems Diagnostics (Airbag/SRS)',
        description: 'Targeted safety-system diagnosis for airbag, SRS, and warning lamp concerns that need accurate electronic tracing.',
      },
      {
        title: 'Precision Troubleshooting',
        description: 'Step-by-step fault isolation for hard-to-find electrical and drivability issues that do not show up in a basic scan.',
      },
      {
        title: 'Engine Performance Diagnostics',
        description: 'Focused analysis of engine behavior, misfires, throttle response, and sensor output to find the real cause.',
      },
      {
        title: 'Emissions & EVAP Services',
        description: 'Diagnosis and repair support for emissions faults, EVAP leaks, and related compliance issues.',
      },
    ],
  },
  {
    icon: Activity,
    title: 'Auto Electrical & Programming (Flashing)',
    intro: 'Electrical repair and software-level programming for drivability, starting and charging issues.',
    items: [
      {
        title: 'Control Module Programming (ECU)',
        description: 'Programming and flashing support for control modules when software updates or recalibration are needed.',
      },
      {
        title: 'Complex Electrical Repair',
        description: 'Troubleshooting and repair for wiring faults, relays, power distribution, and intermittent electrical failures.',
      },
      {
        title: 'Starting & Charging Systems',
        description: 'Diagnosis of battery, alternator, starter, and charging circuit problems that keep the vehicle from starting reliably.',
      },
      {
        title: 'Hybrids & Electric Vehicles (EV)',
        description: 'Support for modern electrified platforms that require careful technical work and specialized diagnostic workflows.',
      },
    ],
  },
  {
    icon: KeyRound,
    title: 'Mobile Locksmith Services',
    intro: 'On-site access and key services when the vehicle is locked, the key is missing, or the immobilizer needs attention.',
    items: [
      {
        title: 'Emergency Car Lockout',
        description: 'Fast on-site vehicle entry help for lockout situations without unnecessary towing or dealership delays.',
      },
      {
        title: 'Key Cutting & Programming',
        description: 'Key cutting, transponder setup, and programming support for replacement, spare, or lost keys.',
      },
      {
        title: 'Immobilizer Reset',
        description: 'Immobilizer support for cases where the vehicle recognizes the key improperly or will not authorize start-up.',
      },
    ],
  },
  {
    icon: ClipboardCheck,
    title: 'Pre-Purchase Electronic & Technical Audit',
    intro: 'A technical review that helps buyers understand the condition of the electronics before purchase.',
    items: [
      {
        title: 'Comprehensive Module Scan',
        description: 'A buyer-focused scan that checks for hidden faults, stored codes, and module communication issues before you purchase.',
      },
      {
        title: 'Electrical & Engine Integrity Check',
        description: 'A deeper technical check that looks at engine behavior, electrical health, and signs of expensive underlying issues.',
      },
    ],
  },
  {
    icon: SlidersHorizontal,
    title: 'Additional Maintenance & Sensor Services',
    intro: 'Support for common maintenance items and sensor-related failures that affect reliability.',
    items: [
      {
        title: 'Cooling System Maintenance',
        description: 'Maintenance and repair support for cooling components that protect engine performance and temperature control.',
      },
      {
        title: 'TPMS Sensor Services',
        description: 'Tire pressure monitoring sensor support for warnings, sensor replacement, and system relearning.',
      },
      {
        title: 'Wearable Parts Replacement',
        description: 'Replacement of common wear items that affect safe operation, drivability, and long-term reliability.',
      },
    ],
  },
  {
    icon: Disc3,
    title: 'Brake Systems Services',
    intro: 'Brake-related diagnostics and repair for safety-critical stopping performance.',
    items: [
      {
        title: 'Brake System Diagnostics',
        description: 'Diagnostic work to isolate noises, pull, vibration, warning lights, or inconsistent brake pedal behavior.',
      },
      {
        title: 'Disc & Drum Brake Service',
        description: 'Service and repair for disc and drum brake components, including wear-related issues and braking feel.',
      },
      {
        title: 'Hydraulic System Repair',
        description: 'Diagnosis and repair of hydraulic braking problems involving calipers, lines, fluid pressure, or pedal feel.',
      },
      {
        title: 'Wheel Hub & Bearing Replacement',
        description: 'Replacement of worn hubs and bearings that create noise, looseness, or unsafe drivability.',
      },
      {
        title: 'ABS (Antilock Brake System) Diagnostics & Repair',
        description: 'ABS fault diagnosis and repair for warning lights, wheel speed sensor faults, and braking stability issues.',
      },
      {
        title: 'Parking Brake Service',
        description: 'Parking brake adjustment and service for mechanical or electronic systems that need proper hold and release.',
      },
      {
        title: 'Brake Fluid Flush & Bleeding',
        description: 'Brake fluid replacement and bleeding to maintain hydraulic performance and pedal consistency.',
      },
    ],
  },
];

function Header() {
  const [open, setOpen] = useState(false);
  const goHome = () => {
    window.location.pathname = '/';
  };
  return (
    <header className="site-header site-header--services">
      <div className="section-shell">
        <div className="section-inner site-header__inner">
          <button onClick={goHome} className="brand-button" type="button">
            <span className="brand-logo-shell">
              <img src="/assets/mb-expert-logo.png" alt="MB Expert LLC logo" className="brand-logo" />
            </span>
            <span className="brand-copy">
              <span className="brand-title">MB Expert LLC</span>
              <span className="brand-subtitle">Mobile Mechanic and Locksmith</span>
            </span>
          </button>
          <nav className="site-nav">
            <button type="button" onClick={goHome}>Home</button>
            <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
            <button type="button" onClick={() => (window.location.href = 'tel:2313926204')}>Call Now</button>
          </nav>
          <div className="site-header__actions">
            <button type="button" className="button-primary button-primary--header" onClick={goHome}>
              <ArrowRight className="icon-sm icon-sm--rotate" /> Home
            </button>
            <button type="button" className="site-menu-toggle" onClick={() => setOpen((prev) => !prev)} aria-label="Toggle menu">
              {open ? <X className="icon-md" /> : <Menu className="icon-md" />}
            </button>
          </div>
        </div>
      </div>
      {open ? (
        <div className="site-mobile-menu">
          <button type="button" onClick={goHome}>Home</button>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Top</button>
          <button type="button" onClick={() => (window.location.href = 'tel:2313926204')}>Call Now</button>
        </div>
      ) : null}
    </header>
  );
}

export default function ServicesPage() {
  return (
    <main className="site-root">
      <Header />

      <section className="services-hero">
        <div className="section-shell">
          <div className="section-inner services-hero__inner">
            <div className="services-hero__copy">
              <div className="section-kicker">Full Services</div>
              <h1>Everything MB Expert LLC can help with, organized by category.</h1>
              <p>
                This page is the deeper service library for visitors who want the complete list instead of the homepage summary.
                It is still built for clarity and conversion.
              </p>
              <div className="hero-actions hero-actions--services">
                <button type="button" className="button-primary" onClick={() => (window.location.pathname = '/')}>
                  Back to Home
                </button>
                <button type="button" className="button-secondary" onClick={() => (window.location.href = '/#contact')}>
                  Request Service
                </button>
              </div>
            </div>
            <div className="services-hero__panel surface-card-strong">
              <div className="services-hero__eyebrow">Mobile diagnostics, programming and locksmith support</div>
              <p>
                Use this page to explain the depth of the service offer, from computer diagnostics to brake repair, electrical
                programming and pre-purchase audits.
              </p>
              <div className="services-hero__stats">
                {[
                  { label: 'Traverse City', value: 'Base of operations' },
                  { label: 'Northern Michigan', value: 'Coverage area' },
                  { label: 'Dealer-level', value: 'Diagnostic tooling' },
                  { label: 'Mobile', value: 'On-site service' },
                ].map((item) => (
                  <div key={item.label} className="services-stat">
                    <div className="services-stat__label">{item.label}</div>
                    <div className="services-stat__value">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-categories">
        <div className="section-shell">
          <div className="section-inner">
            <div className="section-head section-head--services-page">
              <div>
                <div className="section-kicker">Service Categories</div>
                <h2>Detailed categories that mirror the actual work.</h2>
              </div>
              <p>Technical language, compact cards, and no unnecessary clutter.</p>
            </div>

            <div className="categories-grid">
              {groups.map((group) => {
                const Icon = group.icon;
                return (
                  <section key={group.title} className="category-card">
                    <div className="category-card__head">
                      <div className="category-card__icon"><Icon className="icon-md" /></div>
                      <div>
                        <h3>{group.title}</h3>
                        <p>{group.intro}</p>
                      </div>
                    </div>
                    <div className="category-items">
                      {group.items.map((item) => (
                        <article key={item.title} className="category-item">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                          <button type="button" onClick={() => (window.location.href = '/#contact')} className="button-secondary button-secondary--small">
                            Order Service <ChevronRight className="icon-sm" />
                          </button>
                        </article>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
