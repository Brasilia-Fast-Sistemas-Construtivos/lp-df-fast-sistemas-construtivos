"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { gsap, motionEnabled, registerGsap } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/useReveal";
import { CONTACT } from "@/data/site";
import { CTA_FINAL, REGIOES_ATENDIDAS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";
import { appendAttribution } from "@/lib/attribution";

const Band = styled.section`
  width: 100%;
  padding: var(--space-7) 0;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: var(--space-5) 0;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
    pointer-events: none;

    @media (max-width: 768px) {
      width: 80px;
    }
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, var(--color-bg) 0%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, var(--color-bg) 0%, transparent 100%);
  }

  & > .band__titulo {
    font-size: var(--text-2xl);
    line-height: 1;
    font-weight: var(--weight-medium);
    letter-spacing: -0.025em;
    color: var(--color-dark);
    font-family: var(--font-display);
    text-align: center;
    margin-bottom: var(--space-6);
  }

  & > .band__marquee {
    display: flex;
    width: max-content;
    gap: var(--space-6);
    white-space: nowrap;

    @media (prefers-reduced-motion: reduce) {
      display: none;
    }

    & > .band__grupo {
      display: flex;
      align-items: center;
      gap: var(--space-6);

      & > .band__regiao {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        font-size: var(--text-xl);
        font-weight: var(--weight-regular);
        letter-spacing: -0.02em;
        color: var(--color-muted);
        font-family: var(--font-display);

        &::after {
          content: "";
          display: block;
          width: 1px;
          height: var(--space-5);
          background-color: var(--color-border);
        }
      }
    }
  }

  & > .band__lista {
    margin-top: var(--space-6);
    text-align: center;
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    color: var(--color-muted);
    font-family: var(--font-display);
    max-width: 900px;
    margin-inline: auto;
  }
`;

const Cta = styled.section`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-dark);
  border-radius: var(--radius-xl);
  overflow: hidden;
  isolation: isolate;
  margin-block: var(--space-7);

  @media (max-width: 768px) {
    margin-block: var(--space-5);
  }

  & > .cta__imagem {
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

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 2;
  }

  & > .cta__conteudo {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-5);
    padding: var(--space-9) var(--space-5);
    position: relative;
    z-index: 3;

    @media (max-width: 768px) {
      width: 100%;
      padding: var(--space-7) var(--space-4);
    }

    & > .cta__titulo {
      font-size: var(--text-2xl);
      line-height: 1;
      font-weight: var(--weight-medium);
      letter-spacing: -0.025em;
      color: var(--color-bg);
      font-family: var(--font-display);
      max-width: 600px;
      text-align: center;
    }

    & > .cta__descricao {
      font-size: var(--text-lg);
      line-height: 1.2;
      font-weight: var(--weight-regular);
      letter-spacing: -0.01em;
      color: var(--color-muted-white);
      font-family: var(--font-display);
      max-width: 56ch;
      text-align: center;
    }

    & > .cta__acoes {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2);

      @media (max-width: 768px) {
        flex-direction: column;
      }

      & > .cta__whatsapp {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        padding: var(--space-3) var(--space-5);
        border-radius: var(--radius-all);
        border: 1px solid var(--color-bg);
        color: var(--color-bg);
        font-size: var(--text-sm);
        font-weight: var(--weight-medium);
        font-family: var(--font-body);
        transition: background-color var(--dur-fast) var(--ease-standard),
          color var(--dur-fast) var(--ease-standard);

        &:hover {
          background-color: var(--color-bg);
          color: var(--color-dark);
        }

        &:focus-visible {
          outline: 2px solid var(--color-bg);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }
    }

    & > .cta__microcopy {
      font-size: var(--text-sm);
      color: var(--color-muted-white);
      font-family: var(--font-display);
      text-align: center;
    }
  }
`;

export function CoberturaBand() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || !motionEnabled()) return;

    registerGsap();

    const tween = gsap.to(marquee, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <Band id={SECTION_IDS.cobertura} aria-label="Onde atendemos">
      <h2 className="band__titulo">Onde atendemos</h2>

      <div className="band__marquee" ref={marqueeRef} aria-hidden="true">
        {[0, 1].map((grupo) => (
          <div key={grupo} className="band__grupo">
            {REGIOES_ATENDIDAS.map((regiao) => (
              <span key={`${grupo}-${regiao}`} className="band__regiao">
                {regiao}
              </span>
            ))}
          </div>
        ))}
      </div>

      <p className="band__lista">{REGIOES_ATENDIDAS.join(" · ")}</p>
    </Band>
  );
}

export function CtaFinalSection() {
  const ctaRef = useRef<HTMLElement>(null);
  const [whatsappHref, setWhatsappHref] = useState<string>(CONTACT.whatsappUrl);

  useReveal(ctaRef);

  useEffect(() => {
    const base = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMensagem)}`;
    setWhatsappHref(appendAttribution(base));
  }, []);

  return (
    <Cta id={SECTION_IDS.cta} ref={ctaRef} aria-labelledby="cta-final-titulo">
      <div className="cta__imagem" aria-hidden="true">
        <Image
          src="/obras/corporativo.webp"
          alt=""
          fill
          sizes="(max-width: 1420px) 92vw, 1372px"
          loading="lazy"
        />
      </div>

      <div className="cta__conteudo">
        <h2 className="cta__titulo" id="cta-final-titulo" data-reveal>
          {CTA_FINAL.titulo}
        </h2>
        <p className="cta__descricao" data-reveal>
          {CTA_FINAL.subtitulo}
        </p>
        <div className="cta__acoes" role="group" aria-label="Ações disponíveis" data-reveal>
          <CtaButton id="cta-final-btn-orcamento" origin="cta-final" onDark>
            Pedir orçamento
          </CtaButton>
          <a
            id="cta-final-btn-whatsapp"
            className="cta__whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-no-utm
          >
            Chamar no WhatsApp
          </a>
        </div>
        <p className="cta__microcopy">{CTA_FINAL.microcopy}</p>
      </div>
    </Cta>
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
