import Link from "next/link";
import { getServicesPage } from "../../lib/sanity/queries";

const fallbackCategories = [
  {
    title: "In-Depth Computer Diagnostics",
    description: "Dealer-level scanning and fault analysis for modern vehicles.",
    services: [
      {
        title: "Full System Scan",
        description: "A complete electronic check to identify stored and active issues.",
        ctaLabel: "Order Service",
      },
      {
        title: "Safety Systems Diagnostics (Airbag/SRS)",
        description: "Investigate warning lights and faults in the restraint system.",
        ctaLabel: "Order Service",
      },
      {
        title: "Precision Troubleshooting",
        description: "Targeted diagnosis for intermittent or hard-to-find problems.",
        ctaLabel: "Order Service",
      },
      {
        title: "Engine Performance Diagnostics",
        description: "Evaluate power loss, misfires, and drivability complaints.",
        ctaLabel: "Order Service",
      },
      {
        title: "Emissions & EVAP Services",
        description: "Find leaks and sensor issues that trigger emissions faults.",
        ctaLabel: "Order Service",
      },
    ],
  },
  {
    title: "Auto Electrical & Programming (Flashing)",
    description: "Complex electrical work and module programming for advanced systems.",
    services: [
      {
        title: "Control Module Programming (ECU)",
        description: "Programming support for replacement or updated control modules.",
        ctaLabel: "Order Service",
      },
      {
        title: "Complex Electrical Repair",
        description: "Diagnostic and repair work for wiring, relays, and power distribution.",
        ctaLabel: "Order Service",
      },
      {
        title: "Starting & Charging Systems",
        description: "Test and repair batteries, alternators, starters, and related circuits.",
        ctaLabel: "Order Service",
      },
      {
        title: "Hybrids & Electric Vehicles (EV)",
        description: "Support for modern electric and hybrid platform diagnostics.",
        ctaLabel: "Order Service",
      },
    ],
  },
  {
    title: "Mobile Locksmith Services",
    description: "Fast vehicle access help when keys are lost, locked in, or not recognized.",
    services: [
      {
        title: "Emergency Car Lockout",
        description: "On-site access help when keys are trapped inside the vehicle.",
        ctaLabel: "Order Service",
      },
      {
        title: "Key Cutting & Programming",
        description: "Replacement key and remote programming services.",
        ctaLabel: "Order Service",
      },
      {
        title: "Immobilizer Reset",
        description: "Programming support for security and immobilizer-related issues.",
        ctaLabel: "Order Service",
      },
    ],
  },
  {
    title: "Pre-Purchase Electronic & Technical Audit",
    description: "Independent inspection before buying a used vehicle.",
    services: [
      {
        title: "Comprehensive Module Scan",
        description: "Check all available modules for hidden faults and stored codes.",
        ctaLabel: "Order Service",
      },
      {
        title: "Electrical & Engine Integrity Check",
        description: "Review the car's electronic and engine condition before purchase.",
        ctaLabel: "Order Service",
      },
    ],
  },
  {
    title: "Additional Maintenance & Sensor Services",
    description: "Useful add-ons and preventative maintenance for long-term reliability.",
    services: [
      {
        title: "Cooling System Maintenance",
        description: "Inspect and service cooling components to prevent overheating.",
        ctaLabel: "Order Service",
      },
      {
        title: "TPMS Sensor Services",
        description: "Diagnose and service tire pressure sensor issues.",
        ctaLabel: "Order Service",
      },
      {
        title: "Wearable Parts Replacement",
        description: "Replace common wear items before they become a bigger problem.",
        ctaLabel: "Order Service",
      },
    ],
  },
  {
    title: "Brake Systems Services",
    description: "Brake diagnostics and repair for safer driving and stronger stopping power.",
    services: [
      {
        title: "Brake System Diagnostics",
        description: "Find the root cause of brake noise, vibration, and warning lights.",
        ctaLabel: "Order Service",
      },
      {
        title: "Disc & Drum Brake Service",
        description: "Pads, rotors, drums, and related brake components.",
        ctaLabel: "Order Service",
      },
      {
        title: "Hydraulic System Repair",
        description: "Inspect and restore brake fluid delivery and hydraulic function.",
        ctaLabel: "Order Service",
      },
      {
        title: "Wheel Hub & Bearing Replacement",
        description: "Replace worn hub and bearing assemblies that affect braking and noise.",
        ctaLabel: "Order Service",
      },
      {
        title: "ABS Diagnostics & Repair",
        description: "Scan and repair anti-lock brake system faults.",
        ctaLabel: "Order Service",
      },
      {
        title: "Parking Brake Service",
        description: "Adjust and repair parking brake operation.",
        ctaLabel: "Order Service",
      },
      {
        title: "Brake Fluid Flush & Bleeding",
        description: "Remove old fluid and restore braking performance.",
        ctaLabel: "Order Service",
      },
    ],
  },
];

export default async function ServicesPage() {
  const data = await getServicesPage();
  const categories = data?.categories?.length ? data.categories : fallbackCategories;

  return (
    <main className="site">
      <section className="section">
        <div className="shell">
          <div className="section__head">
            <div>
              <p className="eyebrow">Full Services</p>
              <h1 className="section__title">{data?.title ?? "A complete catalog of mobile diagnostics and repair."}</h1>
              <p className="section__text">
                {data?.intro ??
                  "Browse the full list of services grouped by category. Each item can be connected to a lead form or estimate request later."}
              </p>
            </div>
            <Link className="section__link" href="/">
              Back to home
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((category, categoryIndex) => (
              <article className="category-card" key={category.title ?? `category-${categoryIndex}`}>
                <div className="category-card__head">
                  <div>
                    <h2 className="category-card__title">{category.title ?? "Service category"}</h2>
                    <p className="category-card__text">{category.description}</p>
                  </div>
                  <span className="category-card__badge">Category</span>
                </div>

                <div className="service-list">
                  {category.services?.map((service, serviceIndex) => (
                    <div className="service-list__item" key={service.title ?? `service-${serviceIndex}`}>
                      <h3 className="service-list__title">{service.title ?? "Service item"}</h3>
                      <p className="service-list__text">{service.description}</p>
                      <div className="service-list__footer">
                        <span className="eyebrow" style={{ margin: 0 }}>
                          {service.ctaLabel ?? "Order Service"}
                        </span>
                        <a className="button button--secondary button--small" href="/#contact">
                          Order Service
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
