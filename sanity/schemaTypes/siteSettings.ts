import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label",
      type: "string",
      initialValue: "Request Service",
    }),
    defineField({
      name: "primaryCtaHref",
      title: "Primary CTA Link",
      type: "string",
      initialValue: "#contact",
    }),
  ],
  preview: {
    select: {
      title: "businessName",
      subtitle: "tagline",
      media: "logo",
    },
  },
});

