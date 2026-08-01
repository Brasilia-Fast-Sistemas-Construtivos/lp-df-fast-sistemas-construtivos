"use client";

import styled from "@emotion/styled";
import type { ElementType, ReactNode } from "react";

type SectionTextsProps = {
  titulo: string;
  descricao?: string;
  as?: ElementType;
  centrado?: boolean;
  onDark?: boolean;
  children?: ReactNode;
};

const Root = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-9);
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
  }

  & > .texts__title {
    font-size: var(--text-2xl);
    line-height: 1;
    font-weight: var(--weight-medium);
    letter-spacing: -0.025em;
    color: var(--color-dark);
    font-family: var(--font-display);
    flex: 1;

    & > .texts__ponto {
      color: var(--color-brand);
    }
  }

  & > .texts__description {
    font-size: var(--text-lg);
    line-height: 1.2;
    font-weight: var(--weight-regular);
    letter-spacing: -0.01em;
    color: var(--color-muted);
    font-family: var(--font-display);
    flex: 1;
  }

  &[data-centrado="true"] {
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
    text-align: center;

    & > .texts__title {
      max-width: 640px;
    }

    & > .texts__description {
      max-width: 560px;
    }
  }

  &[data-on-dark="true"] {
    & > .texts__title {
      color: var(--color-bg);
    }

    & > .texts__description {
      color: var(--color-muted-white);
    }
  }
`;

function renderTitulo(titulo: string) {
  if (!titulo.endsWith(".")) return titulo;

  return (
    <>
      {titulo.slice(0, -1)}
      <span className="texts__ponto">.</span>
    </>
  );
}

export default function SectionTexts({
  titulo,
  descricao,
  as: Tag = "h2",
  centrado = false,
  onDark = false,
  children,
}: SectionTextsProps) {
  return (
    <Root data-centrado={centrado} data-on-dark={onDark}>
      <Tag className="texts__title">{renderTitulo(titulo)}</Tag>
      {descricao ? <p className="texts__description">{descricao}</p> : null}
      {children}
    </Root>
  );
}
