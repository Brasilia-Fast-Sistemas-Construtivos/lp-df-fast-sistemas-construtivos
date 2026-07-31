"use client";

import styled from "@emotion/styled";
import { useState } from "react";

import CtaButton from "@/components/forms/CtaButton";
import Etiqueta from "@/components/ui/Etiqueta";
import FiguraParede from "@/components/ui/FiguraParede";
import SelectField from "@/components/ui/SelectField";
import SnapLine from "@/components/ui/SnapLine";
import {
  CONTENT_GATES,
  FAIXAS_METRAGEM,
  HERO,
  REGIOES_OPTIONS,
  TIPOS_DE_OBRA,
} from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const TITULO_HERO =
  CONTENT_GATES.prazoMedioDias === null
    ? HERO.tituloSemPrazo
    : HERO.tituloComPrazo.replace("{prazo}", String(CONTENT_GATES.prazoMedioDias));

const Section = styled.section`
  position: relative;
  z-index: var(--z-base);
  background: var(--color-gray-surface);
  padding-top: calc(var(--header-height) + var(--space-8));
  scroll-margin-top: var(--header-height);

  @media (max-width: 900px) {
    padding-top: calc(var(--header-height) + var(--space-6));
  }

  & > .hero__inner {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    align-items: center;
    gap: var(--space-8);

    @media (max-width: 980px) {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-7);
    }

    & > .hero__conteudo {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);

      & > .hero__titulo {
        font-family: var(--font-display);
        font-size: var(--text-4xl);
        font-weight: var(--weight-medium);
        letter-spacing: -0.03em;
        line-height: var(--leading-tight);
        color: var(--color-dark);
        max-width: 18ch;

        & > .hero__marcada {
          position: relative;
          display: inline-block;
          font-weight: var(--weight-semibold);

          & > .hero__marcada-snap {
            position: absolute;
            left: 0;
            right: 0;
            bottom: -0.08em;
          }
        }
      }

      & > .hero__subtitulo {
        font-size: var(--text-lg);
        line-height: var(--leading-normal);
        color: var(--color-fg);
        max-width: 52ch;
      }

      & > .hero__acao {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-4);
        margin-top: var(--space-2);

        @media (max-width: 560px) {
          flex-direction: column;
          align-items: stretch;
          gap: var(--space-3);
        }

        & > button {
          @media (max-width: 560px) {
            width: 100%;
          }
        }

        & > .hero__microcopy {
          font-size: var(--text-sm);
          line-height: var(--leading-normal);
          color: var(--color-muted);

          @media (max-width: 560px) {
            text-align: center;
          }
        }
      }
    }

    & > .hero__figura {
      display: flex;
      justify-content: flex-end;

      @media (max-width: 980px) {
        justify-content: center;
      }
    }
  }
`;

const Barra = styled.div`
  position: relative;
  z-index: var(--z-base);
  margin-top: var(--space-9);
  margin-bottom: calc(var(--space-8) * -1);

  @media (max-width: 900px) {
    margin-top: var(--space-7);
    margin-bottom: calc(var(--space-5) * -1);
  }

  & > .barra__inner {
    display: flex;
    flex-direction: column;

    & > .barra__painel {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
      align-items: end;
      gap: var(--space-4);
      padding: var(--space-5);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-bg);

      @media (max-width: 900px) {
        grid-template-columns: minmax(0, 1fr);
        align-items: stretch;
        padding: var(--space-4);
      }

      & > .barra__acao {
        display: flex;
        align-items: flex-end;

        & > button {
          width: 100%;
        }
      }
    }
  }
`;

function TituloHero({ titulo, palavraMarcada }: { titulo: string; palavraMarcada: string }) {
  const posicao = titulo.indexOf(palavraMarcada);

  if (posicao < 0) return <>{titulo}</>;

  return (
    <>
      {titulo.slice(0, posicao)}
      <span className="hero__marcada">
        {palavraMarcada}
        <span className="hero__marcada-snap">
          <SnapLine variant="underline" trigger="load" delay={0.12} />
        </span>
      </span>
      {titulo.slice(posicao + palavraMarcada.length)}
    </>
  );
}

function BarraPreQualificacao() {
  const [tipoObra, setTipoObra] = useState("");
  const [metragem, setMetragem] = useState("");
  const [regiao, setRegiao] = useState("");

  return (
    <Barra>
      <div className="container barra__inner">
        <SnapLine variant="seam" trigger="load" delay={0.32} />

        <div
          className="barra__painel"
          role="group"
          aria-label="Pré-qualificação do orçamento"
        >
          <SelectField
            id="hero-form-tipo-obra"
            label="Tipo de obra"
            options={TIPOS_DE_OBRA}
            onChange={(evento) => setTipoObra(evento.target.value)}
          />

          <SelectField
            id="hero-form-metragem"
            label="Metragem"
            options={FAIXAS_METRAGEM}
            onChange={(evento) => setMetragem(evento.target.value)}
          />

          <SelectField
            id="hero-form-regiao"
            label="Região"
            options={REGIOES_OPTIONS}
            onChange={(evento) => setRegiao(evento.target.value)}
          />

          <div className="barra__acao">
            <CtaButton
              id="hero-btn-prequalificacao"
              origin="hero-prequalificacao"
              preFill={{ tipoObra, metragem, regiao }}
            >
              Pedir orçamento
            </CtaButton>
          </div>
        </div>
      </div>
    </Barra>
  );
}

export default function HeroSection() {
  return (
    <Section id={SECTION_IDS.hero} aria-labelledby="hero-titulo">
      <div className="container hero__inner">
        <div className="hero__conteudo">
          <Etiqueta pares={HERO.etiqueta} />

          <h1 className="hero__titulo" id="hero-titulo">
            <TituloHero titulo={TITULO_HERO} palavraMarcada={HERO.palavraMarcada} />
          </h1>

          <p className="hero__subtitulo">{HERO.subtitulo}</p>

          <div className="hero__acao">
            <CtaButton id="hero-btn-orcamento" origin="hero">
              Pedir orçamento
            </CtaButton>
            <p className="hero__microcopy">{HERO.microcopy}</p>
          </div>
        </div>

        <div className="hero__figura">
          <FiguraParede />
        </div>
      </div>

      <BarraPreQualificacao />
    </Section>
  );
}
