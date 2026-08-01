"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import SectionTexts from "@/components/ui/SectionTexts";
import { COMPARATIVO } from "@/data/content";
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

  & > .confronto {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    & > .confronto__coluna {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
      padding: var(--space-5);
      border-radius: var(--radius-md);
      border: 1px solid var(--color-border);
      background-color: var(--color-bg);

      & > .confronto__foto {
        width: 100%;
        aspect-ratio: 3 / 2;
        border-radius: var(--radius-sm);
        overflow: hidden;

        & img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
      }

      & > .confronto__titulo {
        font-size: var(--text-xl);
        line-height: 1.1;
        font-weight: var(--weight-medium);
        letter-spacing: -0.02em;
        color: var(--color-dark);
        font-family: var(--font-display);
      }

      & > .confronto__lista {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        & > li {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          font-size: var(--text-md);
          line-height: 1.3;
          color: var(--color-muted);
          font-family: var(--font-display);

          & > .confronto__marcador {
            flex-shrink: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            margin-top: 2px;

            & > svg {
              width: 100%;
              height: 100%;
            }
          }
        }
      }

      &[data-tipo="seco"] {
        border-color: var(--color-dark);

        & > .confronto__lista > li {
          color: var(--color-fg);
        }
      }
    }
  }

  & > .responsavel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-6);
    padding: var(--space-6);
    border-radius: var(--radius-md);
    background-color: var(--color-gray-surface);

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-5);
    }

    & > .responsavel__itens {
      display: flex;
      gap: var(--space-7);
      flex-wrap: wrap;

      @media (max-width: 900px) {
        gap: var(--space-5);
      }

      & > .responsavel__item {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        & > dt {
          font-size: var(--text-sm);
          font-weight: var(--weight-medium);
          letter-spacing: -0.01em;
          color: var(--color-muted);
          font-family: var(--font-display);
        }

        & > dd {
          font-size: var(--text-md);
          font-weight: var(--weight-regular);
          letter-spacing: -0.01em;
          color: var(--color-dark);
          font-family: var(--font-display);
        }
      }
    }
  }
`;

function IconeTraco() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12" stroke="var(--color-muted)" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconeCheck() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10.4 8.4 14.8 16 5.6"
        stroke="var(--color-dark)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ComparativoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <Section id={SECTION_IDS.comparativo} ref={sectionRef} aria-label="Comparativo entre alvenaria e construção a seco">
      <SectionTexts
        titulo={COMPARATIVO.titulo}
        descricao="A diferença entre semanas de obra suja e dias de montagem limpa está no sistema construtivo."
      />

      <div className="confronto">
        <article className="confronto__coluna" data-reveal>
          <div className="confronto__foto">
            <Image
              src="/comparativo/antes.webp"
              alt="Ambiente antes da execução, em obra convencional"
              width={720}
              height={480}
              sizes="(max-width: 900px) 92vw, 45vw"
              loading="lazy"
            />
          </div>
          <h3 className="confronto__titulo">Obra convencional</h3>
          <ul className="confronto__lista" role="list">
            {COMPARATIVO.alvenaria.itens.map((item) => (
              <li key={item}>
                <span className="confronto__marcador">
                  <IconeTraco />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="confronto__coluna" data-tipo="seco" data-reveal>
          <div className="confronto__foto">
            <Image
              src="/comparativo/depois.webp"
              alt="Mesmo ambiente entregue com drywall pela Fast"
              width={720}
              height={480}
              sizes="(max-width: 900px) 92vw, 45vw"
              loading="lazy"
            />
          </div>
          <h3 className="confronto__titulo">Construção a seco Fast</h3>
          <ul className="confronto__lista" role="list">
            {COMPARATIVO.aSeco.itens.map((item) => (
              <li key={item}>
                <span className="confronto__marcador">
                  <IconeCheck />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="responsavel" data-reveal>
        <dl className="responsavel__itens">
          {COMPARATIVO.umResponsavel.itens.map((item) => (
            <div key={item.rotulo} className="responsavel__item">
              <dt>{item.rotulo}</dt>
              <dd>{item.valor}</dd>
            </div>
          ))}
        </dl>
        <CtaButton id="comparativo-btn-orcamento" origin="comparativo">
          Pedir orçamento
        </CtaButton>
      </div>
    </Section>
  );
}
