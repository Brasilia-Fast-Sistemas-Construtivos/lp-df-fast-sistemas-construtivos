import JsonLd from "@/components/seo/JsonLd";
import { PAGES } from "@/data/seo";
import { buildGraph, serviceCatalogSchema, webPageSchema } from "@/lib/seo/schema";

const homePage = PAGES[0];

const pageSchema = buildGraph([
  webPageSchema({
    path: homePage.path,
    name: homePage.title,
    description: homePage.description,
  }),
  serviceCatalogSchema(),
]);

export default function HomePage() {
  return (
    <>
      <JsonLd schema={pageSchema} />
      <div className="container" />
    </>
  );
}
