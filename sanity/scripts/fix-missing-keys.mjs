import sanityCli from "sanity/cli";

const client = sanityCli.getCliClient({ apiVersion: "2026-05-04" });

const slugifyKey = (value, fallback) =>
  String(value ?? fallback)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || fallback;

const withKeys = (items = [], prefix) =>
  items.map((item, index) => ({
    ...item,
    _key: item._key ?? `${prefix}-${slugifyKey(item.title, index + 1)}-${index + 1}`,
  }));

const home = await client.fetch('*[_id == "homePage"][0]');
if (home) {
  await client
    .patch("homePage")
    .set({
      featuredServices: withKeys(home.featuredServices, "featured-service"),
      processSteps: withKeys(home.processSteps, "process-step"),
    })
    .commit({ autoGenerateArrayKeys: false });
}

const services = await client.fetch('*[_id == "servicesPage"][0]');
if (services) {
  await client
    .patch("servicesPage")
    .set({
      categories: withKeys(
        (services.categories ?? []).map((category, categoryIndex) => ({
          ...category,
          services: withKeys(category.services, `service-${categoryIndex + 1}`),
        })),
        "category"
      ),
    })
    .commit({ autoGenerateArrayKeys: false });
}

console.log("Missing array keys fixed.");
