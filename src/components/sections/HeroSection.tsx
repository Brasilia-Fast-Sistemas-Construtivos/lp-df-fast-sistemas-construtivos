"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";

import CtaButton from "@/components/forms/CtaButton";
import Field from "@/components/ui/Field";
import { HERO } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";
import { maskTelefone } from "@/lib/formatters";

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
      min-height: 56svh;
      border-radius: var(--radius-lg);
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
        padding: var(--space-5) var(--space-4) var(--space-6);
        gap: var(--space-3);
      }

      & > .hero__badge {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-4);

        @media (max-width: 768px) {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-3);
        }
        border-radius: var(--radius-all);
        border: 1px solid color-mix(in srgb, var(--color-bg) 35%, transparent);
        background: color-mix(in srgb, var(--color-dark) 35%, transparent);
        backdrop-filter: blur(8px);
        font-size: var(--text-sm);
        font-weight: var(--weight-medium);
        letter-spacing: -0.01em;
        color: var(--color-bg);
        font-family: var(--font-display);

        &::before {
          content: "";
          display: block;
          width: 6px;
          height: 6px;
          border-radius: var(--radius-all);
          background-color: var(--color-brand);
        }
      }

      & > .hero__titulo {
        font-size: var(--text-3xl);
        line-height: 1;
        font-weight: var(--weight-medium);
        letter-spacing: -0.03em;
        color: var(--color-bg);
        font-family: var(--font-display);

        @media (max-width: 768px) {
          font-size: var(--text-2xl);
        }

        & > .hero__ponto {
          color: var(--color-brand);
        }
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
      display: none;
    }
  }
`;

function BarraPreQualificacao() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  return (
    <div className="hero__barra" role="group" aria-label="Pedido de orçamento">
      <Field
        id="hero-form-nome"
        label="Nome"
        autoComplete="name"
        placeholder="Seu nome"
        value={nome}
        onChange={(evento) => setNome(evento.target.value)}
      />
      <Field
        id="hero-form-email"
        label="E-mail"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="voce@email.com"
        value={email}
        onChange={(evento) => setEmail(evento.target.value)}
      />
      <Field
        id="hero-form-telefone"
        label="Telefone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="(61) 9 0000-0000"
        value={telefone}
        onChange={(evento) => setTelefone(maskTelefone(evento.target.value))}
      />
      <CtaButton
        id="hero-btn-prequalificacao"
        origin="hero-prequalificacao"
        preFill={{ nome, email, telefone }}
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
            src="/produtos/loja-atacado.webp"
            alt=""
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
          />
        </div>

        <div className="hero__conteudo">
          <p className="hero__badge">Fast Sistemas Construtivos · Brasília e entorno</p>
          <h1 className="hero__titulo" id="hero-titulo">
            {HERO.titulo.endsWith(".") ? (
              <>
                {HERO.titulo.slice(0, -1)}
                <span className="hero__ponto">.</span>
              </>
            ) : (
              HERO.titulo
            )}
          </h1>
          <p className="hero__descricao">{HERO.subtitulo}</p>
          <div className="hero__acao">
            <CtaButton id="hero-btn-orcamento" origin="hero" onDark>
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
