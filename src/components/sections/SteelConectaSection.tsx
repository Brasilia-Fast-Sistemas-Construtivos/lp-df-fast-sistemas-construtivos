"use client";

import styled from "@emotion/styled";
import { ArrowRightIcon, InstagramLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import IconeEscopo from "@/components/ui/IconeEscopo";
import LogoSteelConecta from "@/components/ui/LogoSteelConecta";
import { INTERESSE_AMBOS, STEEL_CONECTA_SECAO } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";
import { STEEL_CONECTA } from "@/data/site";
import { pushDataLayerEvent } from "@/lib/analytics";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding: var(--space-8) 0;

  @media (max-width: 768px) {
    gap: var(--space-5);
    padding: var(--space-6) 0;
  }

  & > .conecta__topo {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);

    @media (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-4);
    }

    & > .conecta__titulos {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      max-width: 42ch;

      & > .conecta__eyebrow {
        font-family: var(--font-alt);
        font-size: var(--text-xs);
        font-weight: var(--weight-semibold);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--color-muted);
      }

      & > .conecta__titulo {
        font-family: var(--font-display);
        font-size: var(--text-2xl);
        line-height: 1;
        font-weight: var(--weight-medium);
        letter-spacing: -0.025em;
        color: var(--color-dark);
        text-wrap: balance;

        & > .conecta__ponto {
          color: var(--color-steel-conecta);
        }
      }
    }
  }

  & > .conecta__lead {
    max-width: 78ch;
    font-family: var(--font-display);
    font-size: var(--text-lg);
    line-height: 1.35;
    color: var(--color-muted);

    @media (max-width: 768px) {
      font-size: var(--text-md);
    }
  }

  & > .conecta__grid {
    display: grid;
    grid-template-columns: minmax(260px, 340px) 1fr;
    gap: var(--space-5);

    @media (max-width: 900px) {
      grid-template-columns: 1fr;
    }

    & > .conecta__cartao {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: var(--space-7);
      padding: var(--space-6);
      border-radius: var(--radius-md);
      background: var(--color-dark);

      @media (max-width: 900px) {
        gap: var(--space-5);
      }

      & > .conecta__marca {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        & > .conecta__legenda {
          font-family: var(--font-alt);
          font-size: var(--text-xs);
          font-weight: var(--weight-semibold);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-muted-white);
        }
      }

      & > .conecta__instagram {
        display: inline-flex;
        align-items: center;
        gap: var(--space-3);
        min-height: 44px;
        padding: var(--space-3) var(--space-5);
        border-radius: var(--radius-all);
        border: 1px solid var(--color-footer-rule);
        font-size: var(--text-sm);
        font-weight: var(--weight-medium);
        color: var(--color-bg);
        transition: border-color var(--dur-fast) var(--ease-standard);

        &:hover {
          border-color: var(--color-bg);
        }

        &:focus-visible {
          outline: 2px solid var(--color-bg);
          outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }

        & > svg {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: var(--color-steel-conecta-on-dark);
        }
      }
    }

    & > .conecta__conteudo {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);

      & > .conecta__diferenciais {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-4);

        @media (max-width: 1100px) {
          grid-template-columns: 1fr;
        }

        & > .conecta__diferencial {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-5);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          transition: border-color var(--dur-normal) var(--ease-standard);

          @media (max-width: 768px) {
            padding: var(--space-4);
          }

          &:hover {
            border-color: var(--color-dark);
          }

          @media (prefers-reduced-motion: reduce) {
            transition: none;
          }

          & > .conecta__icone {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: var(--space-7);
            height: var(--space-7);
            border-radius: var(--radius-all);
            background: var(--color-gray-surface);
            color: var(--color-steel-conecta);

            & > svg {
              width: 20px;
              height: 20px;
            }
          }

          & > .conecta__diferencial-titulo {
            font-family: var(--font-display);
            font-size: var(--text-md);
            font-weight: var(--weight-medium);
            line-height: var(--leading-snug);
            color: var(--color-dark);
          }

          & > .conecta__diferencial-descricao {
            font-size: var(--text-sm);
            line-height: var(--leading-normal);
            color: var(--color-muted);
          }
        }
      }

      & > .conecta__rodape {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--space-4);

        & > .conecta__link {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          min-height: 44px;
          font-size: var(--text-sm);
          font-weight: var(--weight-medium);
          color: var(--color-dark);
          text-decoration: underline;
          text-underline-offset: 4px;

          &:focus-visible {
            outline: 2px solid var(--color-steel-conecta);
            outline-offset: 3px;
          }

          & > svg {
            width: 16px;
            height: 16px;
            color: var(--color-steel-conecta);
          }
        }

        & > .conecta__microcopy {
          font-size: var(--text-sm);
          color: var(--color-muted);
        }
      }
    }
  }
`;

function renderTitulo(titulo: string) {
  return (
    <>
      {titulo.slice(0, -1)}
      <span className="conecta__ponto">.</span>
    </>
  );
}

export default function SteelConectaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useReveal(sectionRef);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((entrada) => entrada.isIntersecting)) return;
        pushDataLayerEvent({ event: "steel_conecta_view" });
        observador.disconnect();
      },
      { threshold: 0.4 }
    );

    observador.observe(element);
    return () => observador.disconnect();
  }, []);

  return (
    <Section
      id={SECTION_IDS.steelConecta}
      ref={sectionRef}
      aria-labelledby="steel-conecta-titulo"
    >
      <div className="conecta__topo" data-reveal>
        <div className="conecta__titulos">
          <p className="conecta__eyebrow">{STEEL_CONECTA_SECAO.eyebrow}</p>
          <h2 className="conecta__titulo" id="steel-conecta-titulo">
            {renderTitulo(STEEL_CONECTA_SECAO.titulo)}
          </h2>
        </div>

        <CtaButton
          id="steel-conecta-btn-execucao"
          origin="steel-conecta"
          variant="steel"
          preFill={{ interesse: INTERESSE_AMBOS }}
        >
          Falar com a Steel Conecta
        </CtaButton>
      </div>

      <p className="conecta__lead" data-reveal>
        {STEEL_CONECTA_SECAO.descricao}
      </p>

      <div className="conecta__grid">
        <div className="conecta__cartao" data-reveal>
          <div className="conecta__marca">
            <LogoSteelConecta tamanho="lg" onDark />
            <p className="conecta__legenda">{STEEL_CONECTA_SECAO.cartaoLegenda}</p>
          </div>

          <a
            id="steel-conecta-btn-instagram"
            className="conecta__instagram"
            href={STEEL_CONECTA.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram da Steel Conecta, ${STEEL_CONECTA.instagramHandle}`}
          >
            <InstagramLogoIcon aria-hidden="true" />
            {STEEL_CONECTA.instagramHandle}
          </a>
        </div>

        <div className="conecta__conteudo">
          <ul className="conecta__diferenciais">
            {STEEL_CONECTA_SECAO.diferenciais.map((diferencial) => (
              <li key={diferencial.slug} className="conecta__diferencial" data-reveal>
                <span className="conecta__icone">
                  <IconeEscopo nome={diferencial.icone} />
                </span>
                <h3 className="conecta__diferencial-titulo">{diferencial.titulo}</h3>
                <p className="conecta__diferencial-descricao">{diferencial.descricao}</p>
              </li>
            ))}
          </ul>

          <div className="conecta__rodape" data-reveal>
            <a
              id="steel-conecta-link-obras"
              className="conecta__link"
              href={`#${SECTION_IDS.obras}`}
            >
              Ver obras executadas
              <ArrowRightIcon aria-hidden="true" />
            </a>
            <span className="conecta__microcopy">{STEEL_CONECTA_SECAO.microcopy}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
