"use client";

import styled from "@emotion/styled";
import { useRef } from "react";

import { useReveal } from "@/components/motion/useReveal";
import SectionTexts from "@/components/ui/SectionTexts";
import { ETAPAS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding: var(--space-7) 0;

  @media (max-width: 768px) {
    gap: var(--space-5);
    padding: var(--space-5) 0;
  }

  & > .etapas {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-6);

    @media (max-width: 1100px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    & > .etapa {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding-top: var(--space-4);
      border-top: 1px solid var(--color-border);

      & > .etapa__marcador {
        font-size: var(--text-xl);
        line-height: 1;
        font-weight: var(--weight-regular);
        letter-spacing: -0.02em;
        color: var(--color-brand);
        font-family: var(--font-display);
      }

      & > .etapa__titulo {
        font-size: var(--text-lg);
        line-height: 1.1;
        font-weight: var(--weight-medium);
        letter-spacing: -0.01em;
        color: var(--color-dark);
        font-family: var(--font-display);
      }

      & > .etapa__descricao {
        font-size: var(--text-md);
        line-height: 1.3;
        font-weight: var(--weight-regular);
        letter-spacing: -0.01em;
        color: var(--color-muted);
        font-family: var(--font-display);
      }
    }
  }
`;

export default function ComoTrabalhamosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <Section id={SECTION_IDS.processo} ref={sectionRef} aria-label="Como trabalhamos">
      <SectionTexts
        titulo="Da visita técnica à entrega, sem surpresa."
        descricao="O escopo, o valor e o prazo são fechados por escrito antes de começar. Cada etapa tem um responsável e um fim."
      />

      <div className="etapas">
        {ETAPAS.map((etapa) => (
          <article key={etapa.titulo} className="etapa" data-reveal>
            <p className="etapa__marcador">
              {etapa.duracao}
              {etapa.tempo ? ` · ${etapa.tempo}` : ""}
            </p>
            <h3 className="etapa__titulo">{etapa.titulo}</h3>
            <p className="etapa__descricao">{etapa.descricao}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
