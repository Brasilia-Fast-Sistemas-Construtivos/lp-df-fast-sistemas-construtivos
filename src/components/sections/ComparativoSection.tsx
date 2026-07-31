"use client";

import styled from "@emotion/styled";
import { useRef } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import Etiqueta, { type EtiquetaPar } from "@/components/ui/Etiqueta";
import SectionHeader from "@/components/ui/SectionHeader";
import SnapLine from "@/components/ui/SnapLine";
import { COMPARATIVO } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const Root = styled.section`
  position: relative;
  background: var(--color-gray-surface);

  & > .comparativo__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    padding-block: var(--section-gap);

    @media (max-width: 768px) {
      gap: var(--space-7);
    }

    & > .comparativo__confronto {
      display: grid;
      grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
      align-items: stretch;
      gap: var(--space-5);

      @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
        gap: var(--space-4);
      }

      & > .comparativo__coluna {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        padding: var(--space-6);
        border-radius: var(--radius-md);

        @media (max-width: 640px) {
          gap: var(--space-5);
          padding: var(--space-5);
        }

        & > .comparativo__lista {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);

          & > .comparativo__item {
            display: flex;
            align-items: flex-start;
            gap: var(--space-3);
            font-size: var(--text-md);
            line-height: var(--leading-normal);

            & > .comparativo__marcador {
              flex: none;
              display: flex;
              align-items: center;
              justify-content: center;
              width: var(--space-4);
              height: calc(var(--text-md) * var(--leading-normal));

              & > .comparativo__traco {
                display: block;
                width: 100%;
                height: var(--line-w);
                background: var(--color-galvanized);
              }

              & > .comparativo__check {
                width: 100%;
                height: auto;
                fill: none;
                stroke: currentColor;
                stroke-width: var(--line-w);
                stroke-linecap: square;
              }
            }
          }
        }
      }

      & > .comparativo__coluna--alvenaria {
        background: var(--color-border);
        color: var(--color-muted);
      }

      & > .comparativo__coluna--seco {
        background: var(--color-surface);
        color: var(--color-fg);

        @media (max-width: 900px) {
          order: -1;
        }
      }
    }

    & > .comparativo__responsavel {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
      padding: var(--space-7);
      border-radius: var(--radius-md);
      background: var(--color-surface);

      @media (max-width: 640px) {
        gap: var(--space-5);
        padding: var(--space-5);
      }

      & > .comparativo__pares {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-6);

        @media (max-width: 900px) {
          grid-template-columns: minmax(0, 1fr);
          gap: var(--space-5);
        }

        & > .comparativo__par {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);

          & > .comparativo__par-rotulo {
            font-family: var(--font-alt);
            font-size: var(--text-xs);
            font-weight: var(--weight-semibold);
            letter-spacing: 0.18em;
            line-height: 1.2;
            text-transform: uppercase;
            color: var(--color-muted);
          }

          & > .comparativo__par-valor {
            font-size: var(--text-md);
            line-height: var(--leading-normal);
            color: var(--color-fg);
          }
        }
      }

      & > .comparativo__acao {
        display: flex;

        @media (max-width: 640px) {
          & > button {
            width: 100%;
          }
        }
      }
    }
  }
`;

function paresDoRotulo(rotuloCompleto: string): EtiquetaPar[] {
  const [rotulo, ...restante] = rotuloCompleto.split("·").map((parte) => parte.trim());
  return [{ rotulo, valor: restante.join(" · ") }];
}

export default function ComparativoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <Root id={SECTION_IDS.comparativo} ref={sectionRef}>
      <SnapLine variant="seam" />

      <div className="container comparativo__inner">
        <div className="comparativo__cabecalho" data-reveal>
          <SectionHeader
            titulo={COMPARATIVO.titulo}
            palavraMarcada={COMPARATIVO.palavraMarcada}
            as="h2"
          />
        </div>

        <div className="comparativo__confronto">
          <article
            className="comparativo__coluna comparativo__coluna--alvenaria"
            aria-label={COMPARATIVO.alvenaria.rotulo}
            data-reveal
          >
            <Etiqueta pares={paresDoRotulo(COMPARATIVO.alvenaria.rotulo)} />

            <ul className="comparativo__lista" role="list">
              {COMPARATIVO.alvenaria.itens.map((item) => (
                <li key={item} className="comparativo__item">
                  <span className="comparativo__marcador" aria-hidden="true">
                    <i className="comparativo__traco" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article
            className="comparativo__coluna comparativo__coluna--seco"
            aria-label={COMPARATIVO.aSeco.rotulo}
            data-reveal
          >
            <Etiqueta pares={paresDoRotulo(COMPARATIVO.aSeco.rotulo)} />

            <ul className="comparativo__lista" role="list">
              {COMPARATIVO.aSeco.itens.map((item) => (
                <li key={item} className="comparativo__item">
                  <span className="comparativo__marcador" aria-hidden="true">
                    <svg className="comparativo__check" viewBox="0 0 16 16" focusable="false">
                      <path d="M2 8.4 6.2 12.6 14 3.6" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="comparativo__responsavel" data-reveal>
          <SectionHeader
            titulo={COMPARATIVO.umResponsavel.titulo}
            palavraMarcada={COMPARATIVO.umResponsavel.palavraMarcada}
            as="h3"
          />

          <dl className="comparativo__pares">
            {COMPARATIVO.umResponsavel.itens.map((par) => (
              <div key={par.rotulo} className="comparativo__par">
                <dt className="comparativo__par-rotulo">{par.rotulo}</dt>
                <dd className="comparativo__par-valor">{par.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="comparativo__acao">
            <CtaButton id="comparativo-btn-orcamento" origin="comparativo">
              Pedir orçamento
            </CtaButton>
          </div>
        </div>
      </div>
    </Root>
  );
}
