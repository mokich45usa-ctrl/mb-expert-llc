import { defineField, defineType } from "sanity";

export const servicesPageSchema = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Category Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Category Description",
              type: "text",
            }),
            defineField({
              name: "services",
              title: "Services",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Service Title",
                      type: "string",
                    }),
                    defineField({
                      name: "description",
                      title: "Service Description",
                      type: "text",
                    }),
                    defineField({
                      name: "ctaLabel",
                      title: "CTA Label",
                      type: "string",
                      initialValue: "Order Service",
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "intro",
    },
  },
});

