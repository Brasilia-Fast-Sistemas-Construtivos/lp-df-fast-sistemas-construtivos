"use client";

import styled from "@emotion/styled";
import { useRef } from "react";

import { useReveal } from "@/components/motion/useReveal";
import Cota from "@/components/ui/Cota";
import Etiqueta, { type EtiquetaPar } from "@/components/ui/Etiqueta";
import { CREDIBILIDADE } from "@/data/content";

const ORIGEM_DOS_NUMEROS: ReadonlyArray<EtiquetaPar> = [
  { rotulo: "REDE NACIONAL", valor: "FAST SISTEMAS CONSTRUTIVOS" },
];

const Root = styled.section`
  background: var(--color-dark);
  padding-block: var(--space-8);

  @media (max-width: 768px) {
    padding-block: var(--space-7);
  }

  & > .credibilidade__container {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);
    width: 100%;
    max-width: var(--container-max);
    margin-inline: auto;
    padding-inline: var(--container-pad);

    @media (max-width: 768px) {
      gap: var(--space-6);
    }

    & > .credibilidade__origem {
      html[data-motion="on"] & {
        opacity: 0;
      }
    }

    & > .credibilidade__grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--space-7) var(--space-6);

      @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--space-6) var(--space-5);
      }

      & > .credibilidade__item {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);

        html[data-motion="on"] & {
          opacity: 0;
        }

        @media (max-width: 768px) {
          gap: var(--space-3);
        }

        & > .credibilidade__tick {
          display: block;
          width: var(--space-6);
          height: var(--line-w);
          background: var(--color-galvanized);
        }
      }
    }
  }
`;

export default function CredibilidadeSection() {
  const secaoRef = useRef<HTMLElement>(null);

  useReveal(secaoRef);

  return (
    <Root ref={secaoRef} aria-label="Números da rede nacional Fast Sistemas Construtivos">
      <div className="credibilidade__container">
        <div className="credibilidade__origem" data-reveal>
          <Etiqueta pares={ORIGEM_DOS_NUMEROS} onDark />
        </div>
        <ul className="credibilidade__grid">
          {CREDIBILIDADE.map((numero) => (
            <li key={numero.rotulo} className="credibilidade__item" data-reveal>
              <i className="credibilidade__tick" aria-hidden="true" />
              <Cota
                valor={numero.valor}
                unidade={numero.unidade}
                rotulo={numero.rotulo}
                onDark
                size="lg"
              />
            </li>
          ))}
        </ul>
      </div>
    </Root>
  );
}
