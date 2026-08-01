"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";

import { useReveal } from "@/components/motion/useReveal";
import Etiqueta from "@/components/ui/Etiqueta";
import { CLIENTES, MARCAS } from "@/data/content";

const Section = styled.section`
  padding-block: var(--section-gap);

  & > .marcas__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);

    & > .marcas__bloco {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);

      & > .marcas__grade {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-7);

        @media (max-width: 768px) {
          gap: var(--space-5);
          justify-content: space-between;
        }

        & > .marcas__item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 44px;

          & > img {
            max-height: 100%;
            width: auto;
            object-fit: contain;
            filter: grayscale(1);
            opacity: 0.7;
            transition: filter var(--dur-normal) var(--ease-standard),
              opacity var(--dur-normal) var(--ease-standard);
          }

          &:hover > img {
            filter: grayscale(0);
            opacity: 1;
          }

          @media (prefers-reduced-motion: reduce) {
            & > img {
              transition: none;
            }
          }
        }
      }
    }
  }
`;

export default function MarcasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  if (MARCAS.length === 0 && CLIENTES.length === 0) return null;

  return (
    <Section ref={sectionRef} aria-label="Marcas e clientes">
      <div className="container marcas__inner">
        {MARCAS.length > 0 ? (
          <div className="marcas__bloco" data-reveal>
            <Etiqueta pares={[{ rotulo: "TRABALHAMOS COM", valor: "MARCAS LÍDERES" }]} />
            <div className="marcas__grade">
              {MARCAS.map((marca) => (
                <div key={marca.arquivo} className="marcas__item">
                  <Image
                    src={`/marcas/${marca.arquivo}`}
                    alt={marca.nome}
                    width={140}
                    height={44}
                    sizes="140px"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {CLIENTES.length > 0 ? (
          <div className="marcas__bloco" data-reveal>
            <Etiqueta pares={[{ rotulo: "JÁ ATENDEMOS", valor: "OBRAS DESTE PORTE" }]} />
            <div className="marcas__grade">
              {CLIENTES.map((cliente) => (
                <div key={cliente.arquivo} className="marcas__item">
                  <Image
                    src={`/clientes/${cliente.arquivo}`}
                    alt={cliente.nome}
                    width={140}
                    height={44}
                    sizes="140px"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
