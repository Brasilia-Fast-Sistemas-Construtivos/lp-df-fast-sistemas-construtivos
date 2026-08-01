"use client";

import styled from "@emotion/styled";
import { useRef } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import SectionTexts from "@/components/ui/SectionTexts";
import { ETAPAS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const Section = styled.section`
  width: 100%;
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding: var(--space-7) 0;

  @media (max-width: 768px) {
    gap: var(--space-5);
    padding: var(--space-5) 0;
  }

  & > .bg {
    position: absolute;
    inset: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    background-color: var(--color-gray-surface);
    z-index: -1;
  }

  & > .processo__topo {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-5);

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  & > .etapas {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-2);

    @media (max-width: 1000px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    & > .etapa {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: var(--space-5);
      border-radius: var(--radius-md);
      background-color: var(--color-bg);
      transition: transform var(--dur-normal) var(--ease-standard);

      &:hover {
        transform: translateY(-4px);
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover {
          transform: none;
        }
      }

      & > .etapa__numero {
        font-size: var(--text-3xl);
        line-height: 1;
        font-weight: var(--weight-regular);
        letter-spacing: -0.03em;
        color: var(--color-muted-white);
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
    <Section id={SECTION_IDS.processo} ref={sectionRef} aria-label="Como comprar">
      <div className="bg" aria-hidden="true" />

      <div className="processo__topo" data-reveal>
        <SectionTexts
          titulo="Do orçamento à entrega, sem complicação."
          descricao="Você não precisa entender de construção a seco para comprar certo — a equipe calcula, cota e entrega."
        />
        <CtaButton id="processo-btn-orcamento" origin="como-comprar">
          Pedir orçamento
        </CtaButton>
      </div>

      <div className="etapas">
        {ETAPAS.map((etapa) => (
          <article key={etapa.passo} className="etapa" data-reveal>
            <p className="etapa__numero" aria-hidden="true">
              {etapa.passo}
            </p>
            <h3 className="etapa__titulo">{etapa.titulo}</h3>
            <p className="etapa__descricao">{etapa.descricao}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
