"use client";

import styled from "@emotion/styled";
import { Fragment, useId } from "react";

type FiguraParedeProps = {
  className?: string;
};

const MONTANTES_X = [60, 186, 312, 438, 564];

const BAIAS_ISOLAMENTO = [202, 328];

const CAMADAS_COTADAS = [
  { chave: "estrutura", rotulo: "Estrutura" },
  { chave: "isolamento", rotulo: "Isolamento" },
  { chave: "fechamento", rotulo: "Fechamento" },
] as const;

const Root = styled.figure`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  width: 100%;
  margin: 0;

  & > .figura-parede__desenho {
    display: block;
    width: 100%;
    height: auto;

    & > .figura-parede__defs {
      & > .figura-parede__padrao {
        & > .figura-parede__la {
          fill: none;
          stroke: var(--color-galvanized);
          stroke-width: calc(var(--line-w) / 2);
        }
      }
    }

    & > .figura-parede__camada {
      & > .figura-parede__perfil {
        fill: none;
        stroke: var(--color-galvanized);
        stroke-width: var(--line-w);
      }

      & > .figura-parede__dobra {
        stroke: var(--color-galvanized);
        stroke-width: calc(var(--line-w) / 2);
      }

      & > .figura-parede__la-campo {
        stroke: none;
      }

      & > .figura-parede__placa {
        fill: var(--color-surface);
        stroke: var(--color-galvanized);
        stroke-width: var(--line-w);
      }

      & > .figura-parede__junta {
        stroke: var(--color-galvanized);
        stroke-width: calc(var(--line-w) / 2);
      }
    }
  }

  & > .figura-parede__cotas {
    display: flex;
    align-items: flex-start;
    padding-inline: 8.125%;

    @media (max-width: 560px) {
      flex-direction: column;
      align-items: stretch;
      gap: var(--space-3);
      padding-inline: 0;
    }

    & > .figura-parede__cota {
      display: flex;
      flex: var(--cota-proporcao) 1 0%;
      flex-direction: column;
      gap: var(--space-2);
      min-width: 0;

      &[data-camada="estrutura"] {
        --cota-proporcao: 142;
      }

      &[data-camada="isolamento"] {
        --cota-proporcao: 252;
      }

      &[data-camada="fechamento"] {
        --cota-proporcao: 142;
      }

      @media (max-width: 560px) {
        flex: none;
        flex-direction: row;
        align-items: center;
        gap: var(--space-4);
      }

      & > .figura-parede__fio {
        position: relative;
        display: block;
        height: calc(var(--line-w) / 2);
        background: var(--color-galvanized);

        @media (max-width: 560px) {
          flex: 1;
        }

        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          width: calc(var(--line-w) / 2);
          height: var(--space-3);
          background: var(--color-galvanized);
          transform: translateY(-50%);
        }

        &::before {
          left: 0;
        }

        &::after {
          right: 0;
        }
      }

      & > .figura-parede__rotulo {
        font-family: var(--font-alt);
        font-size: var(--text-xs);
        font-weight: var(--weight-semibold);
        letter-spacing: 0.18em;
        line-height: 1.2;
        text-transform: uppercase;
        text-align: center;
        white-space: nowrap;
        color: var(--color-muted);

        @media (max-width: 560px) {
          text-align: right;
        }
      }
    }
  }
`;

export default function FiguraParede({ className }: FiguraParedeProps) {
  const identificador = useId().replace(/[^a-zA-Z0-9]/g, "");
  const tituloId = `figura-parede-titulo-${identificador}`;
  const padraoId = `figura-parede-isolamento-${identificador}`;

  return (
    <Root className={className}>
      <svg
        className="figura-parede__desenho"
        viewBox="0 0 640 460"
        role="img"
        aria-labelledby={tituloId}
      >
        <title id={tituloId}>
          Parede a seco em corte: estrutura de montantes e guias, isolamento entre montantes e
          fechamento em placa.
        </title>

        <defs className="figura-parede__defs">
          <pattern
            className="figura-parede__padrao"
            id={padraoId}
            width="26"
            height="22"
            patternUnits="userSpaceOnUse"
          >
            <path className="figura-parede__la" d="M0 11q6.5-9 13 0t13 0" />
          </pattern>
        </defs>

        <g className="figura-parede__camada" data-camada="estrutura">
          <rect className="figura-parede__perfil" x="52" y="60" width="536" height="14" />
          <rect className="figura-parede__perfil" x="52" y="386" width="536" height="14" />
          {MONTANTES_X.map((posicao) => (
            <Fragment key={posicao}>
              <rect
                className="figura-parede__perfil"
                x={posicao}
                y="74"
                width="16"
                height="312"
              />
              <line
                className="figura-parede__dobra"
                x1={posicao + 4}
                y1="74"
                x2={posicao + 4}
                y2="386"
              />
              <line
                className="figura-parede__dobra"
                x1={posicao + 12}
                y1="74"
                x2={posicao + 12}
                y2="386"
              />
            </Fragment>
          ))}
        </g>

        <g className="figura-parede__camada" data-camada="isolamento">
          {BAIAS_ISOLAMENTO.map((posicao) => (
            <rect
              key={posicao}
              className="figura-parede__la-campo"
              x={posicao}
              y="74"
              width="110"
              height="312"
              fill={`url(#${padraoId})`}
            />
          ))}
        </g>

        <g className="figura-parede__camada" data-camada="fechamento">
          <rect className="figura-parede__placa" x="446" y="52" width="142" height="356" />
          <line className="figura-parede__junta" x1="452" y1="52" x2="452" y2="408" />
          <line className="figura-parede__junta" x1="517" y1="52" x2="517" y2="408" />
        </g>
      </svg>

      <figcaption className="figura-parede__cotas">
        {CAMADAS_COTADAS.map((camada) => (
          <span key={camada.chave} className="figura-parede__cota" data-camada={camada.chave}>
            <i className="figura-parede__fio" aria-hidden="true" />
            <span className="figura-parede__rotulo">{camada.rotulo}</span>
          </span>
        ))}
      </figcaption>
    </Root>
  );
}
