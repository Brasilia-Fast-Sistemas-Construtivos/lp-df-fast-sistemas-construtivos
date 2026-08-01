"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

import CtaButton from "@/components/forms/CtaButton";
import SelectField from "@/components/ui/SelectField";
import {
  CONTENT_GATES,
  FAIXAS_METRAGEM,
  HERO,
  REGIOES_OPTIONS,
  TIPOS_DE_OBRA,
} from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

const TITULO_HERO = CONTENT_GATES.prazoMedioDias
  ? HERO.tituloComPrazo.replace("{prazo}", String(CONTENT_GATES.prazoMedioDias))
  : HERO.tituloSemPrazo;

const Section = styled.section`
  width: 100%;
  position: relative;
  padding-top: var(--space-4);

  & > .hero__banner {
    position: relative;
    width: 100%;
    min-height: 72svh;
    border-radius: var(--radius-xl);
    overflow: hidden;
    isolation: isolate;
    display: flex;
    align-items: flex-end;

    @media (max-width: 768px) {
      min-height: 62svh;
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.25) 55%, rgba(0, 0, 0, 0.1) 100%);
      z-index: 2;
    }

    & > .hero__imagem {
      position: absolute;
      inset: 0;
      z-index: 1;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }

    & > .hero__conteudo {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-5);
      padding: var(--space-8) var(--space-7) var(--space-9);
      max-width: 720px;

      @media (max-width: 768px) {
        padding: var(--space-6) var(--space-5) var(--space-8);
        gap: var(--space-4);
      }

      & > .hero__titulo {
        font-size: var(--text-3xl);
        line-height: 1;
        font-weight: var(--weight-medium);
        letter-spacing: -0.03em;
        color: var(--color-bg);
        font-family: var(--font-display);
      }

      & > .hero__descricao {
        font-size: var(--text-lg);
        line-height: 1.2;
        font-weight: var(--weight-regular);
        letter-spacing: -0.01em;
        color: var(--color-muted-white);
        font-family: var(--font-display);
        max-width: 52ch;
      }

      & > .hero__acao {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        flex-wrap: wrap;

        & > .hero__microcopy {
          font-size: var(--text-sm);
          color: var(--color-muted-white);
        }
      }
    }
  }

  & > .hero__barra {
    position: relative;
    z-index: 4;
    width: min(100%, 1080px);
    margin: calc(var(--space-8) * -1) auto 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    align-items: end;
    gap: var(--space-4);
    padding: var(--space-5);
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-bg);
    box-shadow: var(--shadow-md);

    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
      margin-top: calc(var(--space-6) * -1);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      margin-top: var(--space-4);
    }
  }
`;

function BarraPreQualificacao() {
  const [tipoObra, setTipoObra] = useState("");
  const [metragem, setMetragem] = useState("");
  const [regiao, setRegiao] = useState("");

  return (
    <div className="hero__barra" role="group" aria-label="Pré-qualificação do orçamento">
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
      <CtaButton
        id="hero-btn-prequalificacao"
        origin="hero-prequalificacao"
        preFill={{ tipoObra, metragem, regiao }}
      >
        Pedir orçamento
      </CtaButton>
    </div>
  );
}

export default function HeroSection() {
  return (
    <Section id={SECTION_IDS.hero} aria-labelledby="hero-titulo">
      <div className="hero__banner">
        <div className="hero__imagem" aria-hidden="true">
          <Image
            src="/obras/residencial.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
          />
        </div>

        <div className="hero__conteudo">
          <h1 className="hero__titulo" id="hero-titulo">
            {TITULO_HERO}
          </h1>
          <p className="hero__descricao">{HERO.subtitulo}</p>
          <div className="hero__acao">
            <CtaButton id="hero-btn-orcamento" origin="hero">
              Pedir orçamento
            </CtaButton>
            <p className="hero__microcopy">{HERO.microcopy}</p>
          </div>
        </div>
      </div>

      <BarraPreQualificacao />
    </Section>
  );
}
