import { defineField, defineType } from "sanity";

export const homePageSchema = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Internal page title for the homepage document.",
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
      initialValue: "MB Expert LLC",
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "heroPrimaryCta",
      title: "Hero Primary CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({
      name: "heroSecondaryCta",
      title: "Hero Secondary CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({
      name: "aboutEyebrow",
      title: "About Eyebrow",
      type: "string",
      initialValue: "About Us",
    }),
    defineField({
      name: "aboutTitle",
      title: "About Title",
      type: "string",
    }),
    defineField({
      name: "aboutBody",
      title: "About Body",
      type: "text",
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "aboutCta",
      title: "About CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
    defineField({
      name: "featuredServices",
      title: "Featured Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "processEyebrow",
      title: "Process Eyebrow",
      type: "string",
      initialValue: "How It Works",
    }),
    defineField({
      name: "processTitle",
      title: "Process Title",
      type: "string",
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "stepLabel", title: "Step Label", type: "string" }),
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text" }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "contactEyebrow",
      title: "Contact Eyebrow",
      type: "string",
      initialValue: "Contact and Estimate",
    }),
    defineField({
      name: "contactTitle",
      title: "Contact Title",
      type: "string",
    }),
    defineField({
      name: "contactBody",
      title: "Contact Body",
      type: "text",
    }),
    defineField({
      name: "contactBackgroundImage",
      title: "Contact Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "contactCta",
      title: "Contact CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Link", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "heroTitle",
      media: "heroBackgroundImage",
    },
  },
});

