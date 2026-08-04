"use client";

import styled from "@emotion/styled";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { gsap, motionEnabled, registerGsap } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/useReveal";
import SectionTexts from "@/components/ui/SectionTexts";
import { OBRA_COMPLETA } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const Section = styled.section`
  width: 100%;
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-9) 0;
  margin-block: var(--space-7);

  @media (max-width: 768px) {
    gap: var(--space-6);
    padding: var(--space-7) 0;
    margin-block: var(--space-5);
  }

  & > .bg {
    position: absolute;
    inset: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    background-color: var(--color-dark);
    z-index: -1;
  }

  & > .obra__topo {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-5);

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;

      & > button {
        display: none;
      }
    }
  }

  & > .obra__fases {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--space-4);

    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
      gap: var(--space-5);
    }

    & > .obra__fase {
      position: relative;
      display: flex;
      flex-direction: column;
      padding-top: var(--space-6);

      @media (max-width: 1100px) {
        padding-top: 0;
        padding-left: var(--space-6);
      }

      &:nth-of-type(1) {
        --obra-fase-fill: var(--obra-fill-0, 1);
      }

      &:nth-of-type(2) {
        --obra-fase-fill: var(--obra-fill-1, 1);
      }

      &:nth-of-type(3) {
        --obra-fase-fill: var(--obra-fill-2, 1);
      }

      &:nth-of-type(4) {
        --obra-fase-fill: var(--obra-fill-3, 1);
      }

      & > .obra__no {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: var(--space-3);
        height: var(--space-3);
        border-radius: var(--radius-all);
        border: var(--line-w) solid color-mix(in srgb, var(--color-bg) 38%, transparent);
        background-color: var(--color-dark);
      }

      & > .obra__trilho {
        position: absolute;
        top: calc(var(--space-3) / 2 - var(--line-w) / 2);
        left: calc(var(--space-3) / 2);
        right: calc(var(--space-4) * -1);
        height: var(--line-w);
        background-color: color-mix(in srgb, var(--color-bg) 18%, transparent);

        @media (max-width: 1100px) {
          top: var(--space-3);
          right: auto;
          bottom: calc(var(--space-5) * -1);
          left: calc(var(--space-3) / 2 - var(--line-w) / 2);
          width: var(--line-w);
          height: auto;
        }

        & > i {
          display: block;
          width: 100%;
          height: 100%;
          background-color: var(--color-brand);
          transform: scaleX(var(--obra-fase-fill, 1));
          transform-origin: left center;

          @media (max-width: 1100px) {
            transform: scaleY(var(--obra-fase-fill, 1));
            transform-origin: center top;
          }
        }
      }

      & > .obra__painel {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        padding: var(--space-5);
        border-radius: var(--radius-md);
        border: 1px solid color-mix(in srgb, var(--color-bg) 12%, transparent);
        background-color: color-mix(in srgb, var(--color-bg) 5%, transparent);
        transition: transform var(--dur-normal) var(--ease-standard),
          border-color var(--dur-normal) var(--ease-standard);

        @media (max-width: 768px) {
          padding: var(--space-4);
        }

        & > .obra__fase-nome {
          font-family: var(--font-alt);
          font-size: var(--text-xs);
          font-weight: var(--weight-semibold);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-chalk);
        }

        & > .obra__fase-descricao {
          font-size: var(--text-md);
          line-height: 1.35;
          font-weight: var(--weight-regular);
          letter-spacing: -0.01em;
          color: var(--color-muted-white);
          font-family: var(--font-display);

          @media (max-width: 1100px) {
            max-width: 60ch;
          }
        }
      }

      &:hover > .obra__painel {
        transform: translateY(-4px);
        border-color: color-mix(in srgb, var(--color-bg) 26%, transparent);
      }

      @media (prefers-reduced-motion: reduce) {
        & > .obra__painel {
          transition: none;
        }

        &:hover > .obra__painel {
          transform: none;
        }
      }

      &:last-of-type {
        & > .obra__trilho {
          display: none;
        }

        & > .obra__no {
          border-color: var(--color-brand);
          background-color: var(--color-brand);
          box-shadow: 0 0 0 var(--space-1) color-mix(in srgb, var(--color-brand) 28%, transparent);
        }

        & > .obra__painel {
          border-color: var(--color-brand);
          background-color: var(--color-brand);

          & > .obra__fase-nome {
            color: var(--color-bg);
          }

          & > .obra__fase-descricao {
            color: var(--color-bg);
          }
        }

        &:hover > .obra__painel {
          border-color: var(--color-brand);
        }
      }
    }
  }
`;

export default function ObraCompletaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef);

  useGSAP(
    () => {
      const element = sectionRef.current;
      if (!element || !motionEnabled()) return;

      registerGsap();

      const totalTrilhos = OBRA_COMPLETA.fases.length - 1;
      const avanco = { valor: 0 };

      const escreverPreenchimento = () => {
        for (let indice = 0; indice < totalTrilhos; indice += 1) {
          const preenchimento = Math.min(Math.max(avanco.valor * totalTrilhos - indice, 0), 1);
          element.style.setProperty(`--obra-fill-${indice}`, String(preenchimento));
        }
      };

      escreverPreenchimento();

      gsap.to(avanco, {
        valor: 1,
        ease: "none",
        onUpdate: escreverPreenchimento,
        scrollTrigger: {
          trigger: element,
          start: "top 72%",
          end: "bottom 80%",
          scrub: 0.6,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <Section
      id={SECTION_IDS.obraCompleta}
      ref={sectionRef}
      aria-label="Fornecimento do projeto à conclusão da obra"
    >
      <div className="bg" aria-hidden="true" />

      <div className="obra__topo" data-reveal>
        <SectionTexts
          titulo={OBRA_COMPLETA.titulo}
          descricao={OBRA_COMPLETA.descricao}
          onDark
        />
        <CtaButton id="obra-completa-btn-orcamento" origin="obra-completa" onDark>
          Pedir orçamento
        </CtaButton>
      </div>

      <ol className="obra__fases">
        {OBRA_COMPLETA.fases.map((fase) => (
          <li key={fase.slug} className="obra__fase" data-reveal>
            <span className="obra__no" aria-hidden="true" />
            <span className="obra__trilho" aria-hidden="true">
              <i />
            </span>
            <div className="obra__painel">
              <h3 className="obra__fase-nome">{fase.nome}</h3>
              <p className="obra__fase-descricao">{fase.descricao}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
