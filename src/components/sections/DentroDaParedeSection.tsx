"use client";

import styled from "@emotion/styled";
import { useGSAP } from "@gsap/react";
import { useRef, type ReactElement } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { gsap, motionEnabled, registerGsap } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/useReveal";
import Etiqueta, { type EtiquetaPar } from "@/components/ui/Etiqueta";
import SectionHeader from "@/components/ui/SectionHeader";
import { SECTION_IDS } from "@/data/navigation";

const MONTANTES_X = [52, 106, 160, 214];
const BAIAS_X: ReadonlyArray<readonly [number, number]> = [
  [24, 52],
  [62, 106],
  [116, 160],
  [170, 214],
  [224, 256],
];
const FUROS_Y = [66, 108, 150];
const HACHURAS_Y = [70, 110, 150];

const Section = styled.section`
  background: var(--color-gray-surface);
  padding-block: var(--section-gap);

  & > .parede__container {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);

    @media (min-width: 1100px) {
      gap: var(--space-9);
    }

    & > .parede__cabecalho {
      html[data-motion="on"] & {
        opacity: 0;

        @media (prefers-reduced-motion: reduce) {
          opacity: 1;
        }
      }
    }

    & > .parede__momentos {
      display: grid;
      gap: var(--space-7);

      @media (min-width: 900px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--space-6);
      }

      & > .parede__momento {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);

        & > .parede__quadro {
          position: relative;
          padding-top: var(--space-5);
          border-top: 1px solid var(--color-galvanized);

          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            height: var(--space-3);
            background: var(--color-galvanized);
          }

          &::after {
            content: "";
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            height: var(--space-3);
            background: var(--color-galvanized);
          }

          & > .parede__figura {
            display: block;
            width: 100%;
            height: auto;

            html[data-motion="on"] & {
              clip-path: inset(100% 0% 0% 0%);

              @media (prefers-reduced-motion: reduce) {
                clip-path: none;
              }
            }

            & .parede__figura-traco {
              fill: none;
              stroke: var(--color-galvanized);
              stroke-width: var(--line-w);
            }

            & .parede__figura-fio {
              fill: none;
              stroke: var(--color-galvanized);
              stroke-width: var(--line-w);
              stroke-opacity: 0.45;
            }

            & .parede__figura-la {
              fill: var(--color-bg);
              stroke: var(--color-galvanized);
              stroke-width: var(--line-w);
              stroke-opacity: 0.5;
            }

            & .parede__figura-hachura {
              fill: none;
              stroke: var(--color-galvanized);
              stroke-width: var(--line-w);
              stroke-opacity: 0.3;
            }

            & .parede__figura-instalacao {
              fill: none;
              stroke: var(--color-galvanized);
              stroke-width: var(--line-w);
              stroke-linecap: round;
            }

            & .parede__figura-superficie {
              fill: var(--color-bg);
              stroke: var(--color-border);
              stroke-width: var(--line-w);
            }

            & .parede__figura-junta {
              fill: none;
              stroke: var(--color-border);
              stroke-width: var(--line-w);
            }
          }
        }

        & > .parede__legenda {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);

          html[data-motion="on"] & {
            opacity: 0;

            @media (prefers-reduced-motion: reduce) {
              opacity: 1;
            }
          }

          & > .parede__texto {
            max-width: 42ch;
            font-size: var(--text-sm);
            line-height: var(--leading-normal);
            color: var(--color-muted);
          }
        }
      }
    }

    & > .parede__saida {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-5);
      padding-top: var(--space-6);
      border-top: 1px solid var(--color-border);

      @media (min-width: 900px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-6);
      }

      html[data-motion="on"] & {
        opacity: 0;

        @media (prefers-reduced-motion: reduce) {
          opacity: 1;
        }
      }

      & > .parede__saida-texto {
        max-width: 48ch;
        font-size: var(--text-lg);
        line-height: var(--leading-normal);
        color: var(--color-fg);
      }
    }
  }
`;

function EstruturaMetalica() {
  return (
    <>
      <g className="parede__figura-traco">
        <path d="M24 20 L256 20 M24 30 L256 30 M24 20 L24 30 M256 20 L256 30" />
        <path d="M24 186 L256 186 M24 196 L256 196 M24 186 L24 196 M256 186 L256 196" />
        {MONTANTES_X.map((montanteX) => (
          <path
            key={`montante-${montanteX}`}
            d={`M${montanteX} 30 L${montanteX} 186 M${montanteX + 10} 30 L${montanteX + 10} 186`}
          />
        ))}
      </g>
      <g className="parede__figura-fio">
        {MONTANTES_X.map((montanteX) => (
          <path key={`alma-${montanteX}`} d={`M${montanteX + 3} 30 L${montanteX + 3} 186`} />
        ))}
        {MONTANTES_X.map((montanteX) =>
          FUROS_Y.map((furoY) => (
            <ellipse
              key={`furo-${montanteX}-${furoY}`}
              cx={montanteX + 5}
              cy={furoY}
              rx={3}
              ry={6}
            />
          ))
        )}
      </g>
    </>
  );
}

function FiguraEstrutura() {
  return (
    <svg
      className="parede__figura"
      viewBox="0 0 280 220"
      aria-hidden="true"
      focusable="false"
      data-momento-figura
    >
      <EstruturaMetalica />
      <g className="parede__figura-traco">
        <path d="M62 100 L106 100 M62 108 L106 108 M62 100 L62 108 M106 100 L106 108" />
        <path d="M6 206 L274 206" />
      </g>
    </svg>
  );
}

function FiguraIsolamento() {
  return (
    <svg
      className="parede__figura"
      viewBox="0 0 280 220"
      aria-hidden="true"
      focusable="false"
      data-momento-figura
    >
      <EstruturaMetalica />
      <g className="parede__figura-la">
        {BAIAS_X.map(([inicioX, fimX]) => (
          <path
            key={`la-${inicioX}`}
            d={`M${inicioX} 178 L${inicioX} 44 Q${(inicioX + fimX) / 2} 34 ${fimX} 44 L${fimX} 178 Q${(inicioX + fimX) / 2} 188 ${inicioX} 178 Z`}
          />
        ))}
      </g>
      <g className="parede__figura-hachura">
        {BAIAS_X.map(([inicioX, fimX]) =>
          HACHURAS_Y.map((hachuraY) => (
            <path
              key={`hachura-${inicioX}-${hachuraY}`}
              d={`M${inicioX + 4} ${hachuraY} Q${(inicioX + fimX) / 2} ${hachuraY - 8} ${fimX - 4} ${hachuraY}`}
            />
          ))
        )}
      </g>
      <path className="parede__figura-instalacao" d="M24 108 L256 108" />
      <path className="parede__figura-traco" d="M6 206 L274 206" />
    </svg>
  );
}

function FiguraFechamento() {
  return (
    <svg
      className="parede__figura"
      viewBox="0 0 280 220"
      aria-hidden="true"
      focusable="false"
      data-momento-figura
    >
      <rect className="parede__figura-superficie" x="24" y="20" width="232" height="176" />
      <rect className="parede__figura-superficie" x="256" y="20" width="8" height="176" />
      <g className="parede__figura-junta">
        <path d="M140 20 L140 196" />
        <path d="M24 180 L256 180" />
      </g>
      <path className="parede__figura-traco" d="M6 206 L274 206" />
    </svg>
  );
}

const MOMENTOS: ReadonlyArray<{
  chave: string;
  etiqueta: ReadonlyArray<EtiquetaPar>;
  texto: string;
  Figura: () => ReactElement;
}> = [
  {
    chave: "estrutura",
    etiqueta: [{ rotulo: "ESTRUTURA", valor: "MONTANTE DE AÇO" }],
    texto:
      "Os perfis de aço definem o alinhamento da parede e recebem o reforço no ponto onde a carga vai ser pendurada, antes do fechamento.",
    Figura: FiguraEstrutura,
  },
  {
    chave: "isolamento",
    etiqueta: [{ rotulo: "ISOLAMENTO", valor: "LÃ E INSTALAÇÕES" }],
    texto:
      "O miolo recebe a lã de isolamento e as instalações passam por dentro da própria estrutura, sem rasgo em parede pronta.",
    Figura: FiguraIsolamento,
  },
  {
    chave: "fechamento",
    etiqueta: [{ rotulo: "FECHAMENTO", valor: "PLACA, MASSA E PINTURA" }],
    texto:
      "As placas fecham os dois lados. Tratamento de junta, massa e pintura: é essa superfície que você recebe, e nada do que está atrás dela aparece.",
    Figura: FiguraFechamento,
  },
];

export default function DentroDaParedeSection() {
  const secaoRef = useRef<HTMLElement>(null);
  useReveal(secaoRef);

  useGSAP(
    () => {
      const secao = secaoRef.current;
      if (!secao) return;

      registerGsap();

      const figuras = secao.querySelectorAll<SVGSVGElement>("[data-momento-figura]");
      const legendas = secao.querySelectorAll<HTMLElement>("[data-momento-legenda]");
      if (!figuras.length) return;

      if (!motionEnabled()) {
        gsap.set(figuras, { clipPath: "none" });
        gsap.set(legendas, { opacity: 1, x: 0 });
        return;
      }

      const linhaDoTempo = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: secao,
          start: "top 78%",
          end: "bottom 62%",
          scrub: 0.6,
          onEnter: () => {
            figuras.forEach((figura) => {
              figura.style.willChange = "clip-path";
            });
          },
          onLeave: () => {
            figuras.forEach((figura) => {
              figura.style.willChange = "auto";
            });
          },
          onEnterBack: () => {
            figuras.forEach((figura) => {
              figura.style.willChange = "clip-path";
            });
          },
          onLeaveBack: () => {
            figuras.forEach((figura) => {
              figura.style.willChange = "auto";
            });
          },
        },
      });

      figuras.forEach((figura, indice) => {
        const posicao = indice * 0.85;

        linhaDoTempo.fromTo(
          figura,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
          posicao
        );

        const legenda = legendas[indice];
        if (legenda) {
          linhaDoTempo.fromTo(
            legenda,
            { opacity: 0, x: -8 },
            { opacity: 1, x: 0, duration: 0.4 },
            posicao + 0.5
          );
        }
      });
    },
    { scope: secaoRef }
  );

  return (
    <Section id={SECTION_IDS.parede} ref={secaoRef} aria-label="Dentro da parede">
      <div className="container parede__container">
        <div className="parede__cabecalho" data-reveal>
          <SectionHeader
            titulo="O que fica dentro da parede."
            palavraMarcada="dentro"
            etiqueta={[
              { rotulo: "CORTE", valor: "PAREDE A SECO" },
              { rotulo: "FIGURA", valor: "SEM ESCALA" },
            ]}
            descricao="Três momentos da mesma parede, na ordem em que ela é montada: a estrutura que sustenta, o miolo que isola e a superfície que é entregue."
          />
        </div>

        <ol className="parede__momentos" role="list">
          {MOMENTOS.map((momento) => (
            <li key={momento.chave} className="parede__momento">
              <div className="parede__quadro">
                <momento.Figura />
              </div>
              <div className="parede__legenda" data-momento-legenda>
                <Etiqueta pares={momento.etiqueta} />
                <p className="parede__texto">{momento.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="parede__saida" data-reveal>
          <p className="parede__saida-texto">
            Do primeiro perfil à pintura, é a mesma equipe e o mesmo contrato.
          </p>
          <CtaButton id="parede-btn-orcamento" origin="dentro-da-parede">
            Pedir orçamento
          </CtaButton>
        </div>
      </div>
    </Section>
  );
}
