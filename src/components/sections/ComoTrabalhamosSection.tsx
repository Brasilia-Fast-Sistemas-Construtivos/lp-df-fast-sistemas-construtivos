"use client";

import styled from "@emotion/styled";
import { useRef } from "react";

import { useReveal } from "@/components/motion/useReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { ETAPAS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const Section = styled.section`
  background: var(--color-gray-surface);
  padding-block: var(--section-gap);

  & > .processo__container {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);

    @media (min-width: 1100px) {
      gap: var(--space-9);
    }

    & > .processo__cabecalho {
      html[data-motion="on"] & {
        opacity: 0;

        @media (prefers-reduced-motion: reduce) {
          opacity: 1;
        }
      }
    }

    & > .processo__trilha {
      position: relative;
      display: grid;
      gap: var(--space-6);

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: calc(var(--text-xs) * 0.6);
        bottom: 0;
        width: 1px;
        background: var(--color-galvanized);
      }

      @media (min-width: 1100px) {
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: var(--space-5);

        &::before {
          top: 0;
          right: 0;
          bottom: auto;
          width: auto;
          height: 1px;
        }
      }

      & > .processo__etapa {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        padding-left: var(--space-6);

        @media (min-width: 1100px) {
          padding-left: 0;
          padding-top: var(--space-5);
        }

        html[data-motion="on"] & {
          opacity: 0;

          @media (prefers-reduced-motion: reduce) {
            opacity: 1;
          }
        }

        & > .processo__tick {
          position: absolute;
          left: 0;
          top: calc(var(--text-xs) * 0.6);
          display: block;
          width: var(--space-4);
          height: 1px;
          background: var(--color-galvanized);

          @media (min-width: 1100px) {
            top: 0;
            width: 1px;
            height: var(--space-4);
          }
        }

        & > .processo__marcador {
          font-family: var(--font-alt);
          font-size: var(--text-xs);
          font-weight: var(--weight-semibold);
          letter-spacing: 0.18em;
          line-height: 1.2;
          text-transform: uppercase;
          font-variant-numeric: tabular-nums;
          color: var(--color-muted);
        }

        & > .processo__titulo {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: var(--weight-medium);
          letter-spacing: -0.01em;
          line-height: var(--leading-snug);
          color: var(--color-dark);
        }

        & > .processo__descricao {
          max-width: 46ch;
          font-size: var(--text-sm);
          line-height: var(--leading-normal);
          color: var(--color-muted);
        }
      }
    }
  }
`;

function montarMarcador(duracao: string, tempo: string) {
  return tempo ? `${duracao} · ${tempo}` : duracao;
}

export default function ComoTrabalhamosSection() {
  const secaoRef = useRef<HTMLElement>(null);
  useReveal(secaoRef, { stagger: 0.04 });

  return (
    <Section id={SECTION_IDS.processo} ref={secaoRef} aria-label="Como trabalhamos">
      <div className="container processo__container">
        <div className="processo__cabecalho" data-reveal>
          <SectionHeader
            titulo="Da visita técnica à entrega, em cinco etapas."
            palavraMarcada="entrega"
            etiqueta={[
              { rotulo: "PROCESSO", valor: `${ETAPAS.length} ETAPAS` },
              { rotulo: "ORÇAMENTO", valor: "FECHADO POR ESCRITO" },
            ]}
            descricao="Cada etapa tem escopo e responsável definidos. O prazo da sua obra é fechado por escrito no orçamento, antes de a montagem começar."
          />
        </div>

        <ol className="processo__trilha" role="list">
          {ETAPAS.map((etapa) => (
            <li key={etapa.titulo} className="processo__etapa" data-reveal>
              <i className="processo__tick" aria-hidden="true" />
              <p className="processo__marcador">{montarMarcador(etapa.duracao, etapa.tempo)}</p>
              <h3 className="processo__titulo">{etapa.titulo}</h3>
              <p className="processo__descricao">{etapa.descricao}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
