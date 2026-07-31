"use client";

import styled from "@emotion/styled";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { ScrollTrigger, gsap, motionEnabled, registerGsap } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/useReveal";
import Etiqueta from "@/components/ui/Etiqueta";
import SectionHeader from "@/components/ui/SectionHeader";
import SnapLine from "@/components/ui/SnapLine";
import { CTA_FINAL, REGIOES_ATENDIDAS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";
import { BUSINESS } from "@/data/site";

const COBERTURA_ETIQUETA = [
  { rotulo: "COBERTURA", valor: BUSINESS.areaServed },
  { rotulo: "REGIÕES", valor: String(REGIOES_ATENDIDAS.length) },
];

const COPIAS_DO_MARQUEE = ["a", "b"];

const DURACAO_DO_LOOP = 40;
const VELOCIDADE_MINIMA = 1;
const VELOCIDADE_MAXIMA = 2.6;
const DIVISOR_DE_VELOCIDADE = 1400;

const Banda = styled.section`
  background: var(--color-bg);
  padding-block: var(--space-8) var(--space-9);
  scroll-margin-top: var(--header-height);

  @media (max-width: 768px) {
    padding-block: var(--space-7);
  }

  & > .cobertura__topo {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    & > .cobertura__titulo {
      font-family: var(--font-display);
      font-size: var(--text-xl);
      font-weight: var(--weight-medium);
      letter-spacing: -0.01em;
      line-height: var(--leading-snug);
      color: var(--color-dark);
    }
  }

  & > .cobertura__marquee {
    overflow: hidden;
    margin-block: var(--space-6);
    padding-block: var(--space-4);
    border-block: 1px solid var(--color-border);

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }

    & > .cobertura__faixa {
      display: flex;
      width: max-content;

      & > .cobertura__grupo {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        padding-inline-end: var(--space-6);

        & > .cobertura__item {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          font-family: var(--font-alt);
          font-size: var(--text-xs);
          font-weight: var(--weight-semibold);
          letter-spacing: 0.18em;
          line-height: 1.2;
          text-transform: uppercase;
          white-space: nowrap;
          color: var(--color-muted);

          & > .cobertura__fio {
            display: block;
            flex: none;
            width: 1px;
            height: var(--space-3);
            background: var(--color-galvanized);
          }
        }
      }
    }
  }

  & > .cobertura__lista {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);

    & > .cobertura__intro {
      max-width: 62ch;
      font-size: var(--text-md);
      line-height: var(--leading-normal);
      color: var(--color-fg);
    }

    & > .cobertura__regioes {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-3) var(--space-5);

      & > .cobertura__regiao {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        font-size: var(--text-sm);
        line-height: var(--leading-normal);
        color: var(--color-fg);

        &::before {
          content: "";
          display: block;
          flex: none;
          width: var(--space-3);
          height: 1px;
          background: var(--color-galvanized);
        }
      }
    }
  }
`;

const FaixaCta = styled.section`
  position: relative;
  background: var(--color-dark);
  padding-block: var(--space-9);
  scroll-margin-top: var(--header-height);

  @media (max-width: 768px) {
    padding-block: var(--space-7);
  }

  & > .cta-final__costura {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

  & > .cta-final__conteudo {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);

    @media (max-width: 768px) {
      gap: var(--space-6);
    }

    & > .cta-final__acao {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-5);

      @media (max-width: 600px) {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-4);
      }

      & > .cta-final__microcopy {
        max-width: 42ch;
        font-size: var(--text-sm);
        line-height: var(--leading-normal);
        color: var(--color-muted-white);
      }
    }
  }
`;

export function CoberturaBand() {
  const bandaRef = useRef<HTMLElement>(null);
  const faixaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const banda = bandaRef.current;
      const faixa = faixaRef.current;
      if (!banda || !faixa) return;

      registerGsap();

      if (!motionEnabled()) return;

      const loop = gsap.to(faixa, {
        xPercent: -50,
        duration: DURACAO_DO_LOOP,
        ease: "none",
        repeat: -1,
      });

      let retornoSuave: gsap.core.Tween | null = null;

      const gatilhoDeVelocidade = ScrollTrigger.create({
        trigger: banda,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocidade = Math.abs(self.getVelocity());
          loop.timeScale(
            gsap.utils.clamp(
              VELOCIDADE_MINIMA,
              VELOCIDADE_MAXIMA,
              VELOCIDADE_MINIMA + velocidade / DIVISOR_DE_VELOCIDADE
            )
          );
          retornoSuave?.kill();
          retornoSuave = gsap.to(loop, {
            timeScale: VELOCIDADE_MINIMA,
            duration: 0.6,
            ease: "none",
          });
        },
      });

      return () => {
        retornoSuave?.kill();
        gatilhoDeVelocidade.kill();
        loop.kill();
      };
    },
    { scope: bandaRef }
  );

  return (
    <Banda id={SECTION_IDS.cobertura} ref={bandaRef} aria-labelledby="cobertura-titulo">
      <div className="container cobertura__topo">
        <Etiqueta pares={COBERTURA_ETIQUETA} />
        <h2 id="cobertura-titulo" className="cobertura__titulo">
          Onde atendemos
        </h2>
      </div>

      <div className="cobertura__marquee" aria-hidden="true">
        <div className="cobertura__faixa" ref={faixaRef}>
          {COPIAS_DO_MARQUEE.map((copia) => (
            <div className="cobertura__grupo" key={copia}>
              {REGIOES_ATENDIDAS.map((regiao) => (
                <span className="cobertura__item" key={`${copia}-${regiao}`}>
                  <i className="cobertura__fio" />
                  {regiao}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="container cobertura__lista">
        <p className="cobertura__intro">
          Atendemos obra nas regiões administrativas do Distrito Federal e no entorno, com equipe
          própria saindo de Brasília.
        </p>
        <ul className="cobertura__regioes">
          {REGIOES_ATENDIDAS.map((regiao) => (
            <li className="cobertura__regiao" key={regiao}>
              {regiao}
            </li>
          ))}
        </ul>
      </div>
    </Banda>
  );
}

export function CtaFinalSection() {
  const faixaRef = useRef<HTMLElement>(null);

  useReveal(faixaRef);

  return (
    <FaixaCta id={SECTION_IDS.cta} ref={faixaRef} aria-label={CTA_FINAL.titulo}>
      <div className="cta-final__costura">
        <SnapLine variant="seam" trigger="scroll" />
      </div>

      <div className="container cta-final__conteudo">
        <div className="cta-final__cabecalho" data-reveal>
          <SectionHeader
            titulo={CTA_FINAL.titulo}
            palavraMarcada={CTA_FINAL.palavraMarcada}
            descricao={CTA_FINAL.subtitulo}
            onDark
          />
        </div>

        <div className="cta-final__acao" data-reveal>
          <CtaButton id="cta-final-btn-orcamento" origin="cta-final">
            Pedir orçamento
          </CtaButton>
          <p className="cta-final__microcopy">{CTA_FINAL.microcopy}</p>
        </div>
      </div>
    </FaixaCta>
  );
}

export default function CoberturaECtaSection() {
  return (
    <>
      <CoberturaBand />
      <CtaFinalSection />
    </>
  );
}
