import { sanityClient } from "./client";

type CtaLink = {
  label?: string;
  href?: string;
};

type Media = {
  url?: string;
};

type HomePageServiceCard = {
  title?: string;
  description?: string;
  imageUrl?: string;
};

type HomePageStepCard = {
  stepLabel?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
};

type HomePageData = {
  title?: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroBackgroundImage?: Media;
  heroPrimaryCta?: CtaLink;
  heroSecondaryCta?: CtaLink;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutBody?: string;
  aboutImage?: Media;
  aboutCta?: CtaLink;
  featuredServices?: HomePageServiceCard[];
  processEyebrow?: string;
  processTitle?: string;
  processSteps?: HomePageStepCard[];
  contactEyebrow?: string;
  contactTitle?: string;
  contactBody?: string;
  contactBackgroundImage?: Media;
  contactCta?: CtaLink;
};

type SiteSettingsData = {
  businessName?: string;
  tagline?: string;
  phone?: string;
  email?: string;
  address?: string;
  serviceArea?: string;
  logo?: Media;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
};

type ServiceEntry = {
  title?: string;
  description?: string;
  ctaLabel?: string;
};

type ServiceCategory = {
  title?: string;
  description?: string;
  services?: ServiceEntry[];
};

type ServicesPageData = {
  title?: string;
  intro?: string;
  categories?: ServiceCategory[];
};

export async function getHomePage(): Promise<HomePageData | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch(
    `*[_type == "homePage"][0]{
      title,
      heroEyebrow,
      heroTitle,
      heroSubtitle,
      "heroBackgroundImage": heroBackgroundImage.asset->{url},
      heroPrimaryCta{label, href},
      heroSecondaryCta{label, href},
      aboutEyebrow,
      aboutTitle,
      aboutBody,
      "aboutImage": aboutImage.asset->{url},
      aboutCta{label, href},
      featuredServices[]{
        title,
        description,
        "imageUrl": image.asset->{url}
      },
      processEyebrow,
      processTitle,
      processSteps[]{
        stepLabel,
        title,
        description,
        "imageUrl": image.asset->{url}
      },
      contactEyebrow,
      contactTitle,
      contactBody,
      "contactBackgroundImage": contactBackgroundImage.asset->{url},
      contactCta{label, href}
    }`
  );
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      businessName,
      tagline,
      phone,
      email,
      address,
      serviceArea,
      "logo": logo.asset->{url},
      primaryCtaLabel,
      primaryCtaHref
    }`
  );
}

export async function getServicesPage(): Promise<ServicesPageData | null> {
  if (!sanityClient) {
    return null;
  }

  return sanityClient.fetch(
    `*[_type == "servicesPage"][0]{
      title,
      intro,
      categories[]{
        title,
        description,
        services[]{
          title,
          description,
          ctaLabel
        }
      }
    }`
  );
}
