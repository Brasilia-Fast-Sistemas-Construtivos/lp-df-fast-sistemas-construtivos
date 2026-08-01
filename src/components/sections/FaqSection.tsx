"use client";

import styled from "@emotion/styled";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState, type TransitionEvent } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { ScrollTrigger, motionEnabled, registerGsap } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/useReveal";
import { FAQ_LP } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const Root = styled.section`
  width: 100%;
  padding: var(--space-7) 0;

  @media (max-width: 768px) {
    padding: var(--space-5) 0;
  }

  & > .faq__grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: var(--space-9);
    align-items: start;

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }

    & > .faq__intro {
      position: sticky;
      top: calc(var(--header-height) + var(--space-5));
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-4);

      @media (max-width: 900px) {
        position: static;
      }

      & > .faq__titulo {
        font-size: var(--text-2xl);
        line-height: 1;
        font-weight: var(--weight-medium);
        letter-spacing: -0.025em;
        color: var(--color-dark);
        font-family: var(--font-display);
      }

      & > .faq__descricao {
        font-size: var(--text-lg);
        line-height: 1.2;
        font-weight: var(--weight-regular);
        letter-spacing: -0.01em;
        color: var(--color-muted);
        font-family: var(--font-display);
        max-width: 40ch;
      }
    }

    & > .faq__lista {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      list-style: none;
    }
  }
`;

const Item = styled.li`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-bg);
  transition: border-color var(--dur-normal) var(--ease-standard);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  & > .item__pergunta {
    & > .item__gatilho {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      width: 100%;
      min-height: 44px;
      padding: var(--space-4) var(--space-5);
      border: 0;
      background: transparent;
      text-align: left;
      cursor: pointer;

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
        border-radius: var(--radius-md);
      }

      & > .item__texto {
        font-family: var(--font-display);
        font-size: var(--text-lg);
        font-weight: var(--weight-medium);
        letter-spacing: -0.01em;
        line-height: 1.2;
        color: var(--color-dark);
      }

      & > .item__icone {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: var(--radius-all);
        border: 1px solid var(--color-border);
        color: var(--color-dark);

        & > svg {
          width: 16px;
          height: 16px;
          transition: transform var(--dur-normal) var(--ease-standard);

          @media (prefers-reduced-motion: reduce) {
            transition: none;
          }
        }
      }
    }
  }

  & > .item__painel-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows var(--dur-normal) var(--ease-standard);

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    & > .item__painel {
      overflow: hidden;
      visibility: hidden;
      transition: visibility 0s linear var(--dur-normal);

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      & > .item__resposta {
        padding: 0 var(--space-5) var(--space-5);
        font-size: var(--text-md);
        line-height: 1.4;
        letter-spacing: -0.01em;
        color: var(--color-muted);
        font-family: var(--font-display);
      }
    }
  }

  &[data-aberto="true"] {
    border-color: var(--color-dark);

    & > .item__pergunta > .item__gatilho > .item__icone > svg {
      transform: rotate(180deg);
    }

    & > .item__painel-wrapper {
      grid-template-rows: 1fr;

      & > .item__painel {
        visibility: visible;
        transition-delay: 0s;
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
    <Root id={SECTION_IDS.faq} ref={secaoRef} aria-label="Dúvidas frequentes">
      <div className="faq__grid">
        <div className="faq__intro" data-reveal>
          <h2 className="faq__titulo">O que perguntam antes de fechar.</h2>
          <p className="faq__descricao">
            Resposta direta na primeira linha, o detalhe logo abaixo. O que não estiver aqui, a
            equipe responde no orçamento.
          </p>
          <CtaButton id="faq-btn-orcamento" origin="faq">
            Pedir orçamento
          </CtaButton>
        </div>

        <ul className="faq__lista" onTransitionEnd={aoTerminarTransicao}>
          {FAQ_LP.map((entrada, indice) => {
            const aberta = indice === indiceAberto;

            return (
              <Item key={entrada.question} data-aberto={aberta} data-reveal>
                <h3 className="item__pergunta">
                  <button
                    type="button"
                    id={`faq-btn-${indice}`}
                    className="item__gatilho"
                    aria-expanded={aberta}
                    aria-controls={`faq-painel-${indice}`}
                    onClick={() => alternarPergunta(indice)}
                  >
                    <span className="item__texto">{entrada.question}</span>
                    <span className="item__icone" aria-hidden="true">
                      <CaretDownIcon />
                    </span>
                  </button>
                </h3>

                <div className="item__painel-wrapper">
                  <div
                    className="item__painel"
                    id={`faq-painel-${indice}`}
                    role="region"
                    aria-labelledby={`faq-btn-${indice}`}
                  >
                    <p className="item__resposta">{entrada.answer}</p>
                  </div>
                </div>
              </Item>
            );
          })}
        </ul>
      </div>
    </Root>
  );
}
