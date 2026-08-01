import CoberturaECtaSection from "@/components/sections/CoberturaECtaSection";
import ComoTrabalhamosSection from "@/components/sections/ComoTrabalhamosSection";
import ComparativoSection from "@/components/sections/ComparativoSection";
import CredibilidadeSection from "@/components/sections/CredibilidadeSection";
import DentroDaParedeSection from "@/components/sections/DentroDaParedeSection";
import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import MarcasSection from "@/components/sections/MarcasSection";
import ObrasSection from "@/components/sections/ObrasSection";
import SistemasSection from "@/components/sections/SistemasSection";
import JsonLd from "@/components/seo/JsonLd";
import { FAQ_LP } from "@/data/content";
import { PAGES } from "@/data/seo";
import { buildGraph, faqSchema, serviceCatalogSchema, webPageSchema } from "@/lib/seo/schema";

const homePage = PAGES[0];

const pageSchema = buildGraph([
  webPageSchema({
    path: homePage.path,
    name: homePage.title,
    description: homePage.description,
  }),
  serviceCatalogSchema(),
  faqSchema(FAQ_LP),
]);

export default function HomePage() {
  return (
    <>
      <JsonLd schema={pageSchema} />
      <HeroSection />
      <CredibilidadeSection />
      <ComparativoSection />
      <SistemasSection />
      <DentroDaParedeSection />
      <ComoTrabalhamosSection />
      <ObrasSection />
      <MarcasSection />
      <FaqSection />
      <CoberturaECtaSection />
    </>
  );
}
