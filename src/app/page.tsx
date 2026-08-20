import CoberturaECtaSection from "@/components/sections/CoberturaECtaSection";
import ComoTrabalhamosSection from "@/components/sections/ComoTrabalhamosSection";
import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import MarcasSection from "@/components/sections/MarcasSection";
import ObraCompletaSection from "@/components/sections/ObraCompletaSection";
import ObrasSection from "@/components/sections/ObrasSection";
import ProdutosSection from "@/components/sections/ProdutosSection";
import SistemasSection from "@/components/sections/SistemasSection";
import SobreSection from "@/components/sections/SobreSection";
import SteelConectaSection from "@/components/sections/SteelConectaSection";
import JsonLd from "@/components/seo/JsonLd";
import { FAQ_LP } from "@/data/content";
import { PAGES } from "@/data/seo";
import {
  buildGraph,
  faqSchema,
  serviceCatalogSchema,
  steelConectaSchema,
  webPageSchema,
} from "@/lib/seo/schema";

const homePage = PAGES[0];

const pageSchema = buildGraph([
  webPageSchema({
    path: homePage.path,
    name: homePage.title,
    description: homePage.description,
  }),
  serviceCatalogSchema(),
  steelConectaSchema(),
  faqSchema(FAQ_LP),
]);

export default function HomePage() {
  return (
    <>
      <JsonLd schema={pageSchema} />
      <HeroSection />
      <ProdutosSection />
      <ObraCompletaSection />
      <SteelConectaSection />
      <SistemasSection />
      <SobreSection />
      <ObrasSection />
      <ComoTrabalhamosSection />
      <MarcasSection />
      <FaqSection />
      <CoberturaECtaSection />
    </>
  );
}
