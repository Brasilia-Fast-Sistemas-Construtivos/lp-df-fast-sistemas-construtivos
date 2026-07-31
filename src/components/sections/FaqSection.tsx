"use client";

import styled from "@emotion/styled";
import { useEffect, useRef, useState, type TransitionEvent } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { ScrollTrigger, motionEnabled, registerGsap } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/useReveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQ_LP } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const Root = styled.section`
  background: var(--color-bg);
  padding-block: var(--section-gap);

  & .faq__conteudo {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);

    @media (max-width: 768px) {
      gap: var(--space-6);
    }

    & > .faq__lista {
      list-style: none;
      max-width: 76ch;
      border-top: 1px solid var(--color-border);
    }

    & > .faq__fecho {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-5);
      max-width: 76ch;

      & > .faq__fecho-texto {
        flex: 1 1 30ch;
        font-size: var(--text-sm);
        line-height: var(--leading-normal);
        color: var(--color-muted);
      }
    }
  }

  & .faq__item {
    border-bottom: 1px solid var(--color-border);

    & > .faq__pergunta {
      font-size: var(--text-xl);

      & > .faq__gatilho {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-5);
        width: 100%;
        min-height: var(--space-8);
        padding-block: var(--space-5);
        border: 0;
        background: transparent;
        text-align: left;
        cursor: pointer;
        color: var(--color-dark);

        &:focus-visible {
          outline: 2px solid var(--color-brand);
          outline-offset: 3px;
        }

        & > .faq__gatilho-texto {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: var(--weight-medium);
          letter-spacing: -0.01em;
          line-height: var(--leading-snug);
          color: inherit;
        }

        & > .faq__icone {
          display: flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          width: var(--space-5);
          height: var(--space-5);
          color: var(--color-galvanized);
          transition: color var(--dur-fast) var(--ease-standard);

          & > svg {
            width: 100%;
            height: 100%;
            fill: none;
            stroke: currentColor;
            stroke-width: var(--line-w);
            stroke-linecap: square;

            & > .faq__icone-barra {
              transform-box: fill-box;
              transform-origin: center;
              transition: transform var(--dur-normal) var(--ease-standard);

              @media (prefers-reduced-motion: reduce) {
                transition: none;
              }
            }
          }
        }

        &:hover > .faq__icone {
          color: var(--color-dark);
        }
      }
    }

    & > .faq__painel-wrapper {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows var(--dur-normal) var(--ease-standard);

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      & > .faq__painel {
        overflow: hidden;
        visibility: hidden;
        transition: visibility 0s linear var(--dur-normal);

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }

        & > .faq__resposta {
          max-width: 62ch;
          padding-bottom: var(--space-5);
          font-size: var(--text-md);
          line-height: var(--leading-relaxed);
          color: var(--color-fg);
        }
      }
    }

    &[data-aberto="true"] {
      & > .faq__pergunta > .faq__gatilho > .faq__icone {
        color: var(--color-dark);

        & > svg > .faq__icone-barra {
          transform: rotate(90deg);
        }
      }

      & > .faq__painel-wrapper {
        grid-template-rows: 1fr;

        & > .faq__painel {
          visibility: visible;
          transition-delay: 0s;
        }
      }
    }
  }
`;

export default function FaqSection() {
  const secaoRef = useRef<HTMLElement>(null);
  const [indiceAberto, setIndiceAberto] = useState<number | null>(0);
  const primeiraRenderizacao = useRef(true);

  useReveal(secaoRef);

  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }

    if (motionEnabled()) return;

    registerGsap();
    ScrollTrigger.refresh();
  }, [indiceAberto]);

  const alternarPergunta = (indice: number) => {
    setIndiceAberto((atual) => (atual === indice ? null : indice));
  };

  const aoTerminarTransicao = (evento: TransitionEvent<HTMLUListElement>) => {
    if (evento.propertyName !== "grid-template-rows") return;

    registerGsap();
    ScrollTrigger.refresh();
  };

  return (
    <Root id={SECTION_IDS.faq} ref={secaoRef} aria-label="Dúvidas">
      <div className="container faq__conteudo">
        <div data-reveal>
          <SectionHeader
            titulo="O que perguntam antes de fechar."
            palavraMarcada="fechar"
            etiqueta={[{ rotulo: "DÚVIDAS", valor: `${FAQ_LP.length} PERGUNTAS` }]}
            descricao="Resposta direta na primeira linha, o detalhe logo abaixo."
            as="h2"
          />
        </div>

        <ul className="faq__lista" onTransitionEnd={aoTerminarTransicao}>
          {FAQ_LP.map((entrada, indice) => {
            const aberta = indice === indiceAberto;

            return (
              <li className="faq__item" key={entrada.question} data-aberto={aberta} data-reveal>
                <h3 className="faq__pergunta">
                  <button
                    type="button"
                    id={`faq-btn-${indice}`}
                    className="faq__gatilho"
                    aria-expanded={aberta}
                    aria-controls={`faq-painel-${indice}`}
                    onClick={() => alternarPergunta(indice)}
                  >
                    <span className="faq__gatilho-texto">{entrada.question}</span>
                    <span className="faq__icone" aria-hidden="true">
                      <svg viewBox="0 0 20 20" focusable="false">
                        <path d="M3 10 H17" />
                        <path className="faq__icone-barra" d="M10 3 V17" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div className="faq__painel-wrapper">
                  <div
                    className="faq__painel"
                    id={`faq-painel-${indice}`}
                    role="region"
                    aria-labelledby={`faq-btn-${indice}`}
                  >
                    <p className="faq__resposta">{entrada.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="faq__fecho" data-reveal>
          <p className="faq__fecho-texto">
            Ficou uma dúvida que não está aqui? Ela entra na visita técnica, no seu endereço.
          </p>
          <CtaButton id="faq-btn-orcamento" origin="faq">
            Pedir orçamento
          </CtaButton>
        </div>
      </div>
    </Root>
  );
}
