"use client";

import styled from "@emotion/styled";
import type { ElementType, ReactNode } from "react";

import Etiqueta, { type EtiquetaPar } from "@/components/ui/Etiqueta";
import SnapLine from "@/components/ui/SnapLine";

type SectionHeaderProps = {
  titulo: string;
  palavraMarcada?: string;
  comSnap?: boolean;
  etiqueta?: ReadonlyArray<EtiquetaPar>;
  descricao?: string;
  as?: ElementType;
  onDark?: boolean;
  children?: ReactNode;
};

const Root = styled.header`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 62ch;

  & > .section-header__titulo {
    font-family: var(--font-display);
    font-size: var(--text-3xl);
    font-weight: var(--weight-medium);
    letter-spacing: -0.025em;
    line-height: 1.05;
    color: var(--color-dark);

    & > .section-header__marcada {
      position: relative;
      display: inline-block;
      font-weight: var(--weight-semibold);

      & > .section-header__snap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -0.08em;
      }
    }
  }

  & > .section-header__descricao {
    font-size: var(--text-lg);
    line-height: var(--leading-normal);
    color: var(--color-fg);
  }

  &[data-on-dark="true"] {
    & > .section-header__titulo {
      color: var(--color-bg);
    }

    & > .section-header__descricao {
      color: var(--color-muted-white);
    }
  }
`;

function renderTitulo(titulo: string, palavraMarcada?: string, comSnap = false) {
  if (!palavraMarcada || !titulo.includes(palavraMarcada)) return titulo;

  const [antes, ...resto] = titulo.split(palavraMarcada);
  const depois = resto.join(palavraMarcada);

  return (
    <>
      {antes}
      <span className="section-header__marcada">
        {palavraMarcada}
        {comSnap ? (
          <span className="section-header__snap">
            <SnapLine variant="underline" trigger="scroll" />
          </span>
        ) : null}
      </span>
      {depois}
    </>
  );
}

export default function SectionHeader({
  titulo,
  palavraMarcada,
  comSnap = false,
  etiqueta,
  descricao,
  as: Tag = "h2",
  onDark = false,
  children,
}: SectionHeaderProps) {
  return (
    <Root data-on-dark={onDark}>
      {etiqueta ? <Etiqueta pares={etiqueta} onDark={onDark} /> : null}
      <Tag className="section-header__titulo">
        {renderTitulo(titulo, palavraMarcada, comSnap)}
      </Tag>
      {descricao ? <p className="section-header__descricao">{descricao}</p> : null}
      {children}
    </Root>
  );
}
