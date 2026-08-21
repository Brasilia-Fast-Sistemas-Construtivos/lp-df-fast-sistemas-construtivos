"use client";

import styled from "@emotion/styled";
import Image from "next/image";

import { STEEL_CONECTA } from "@/data/site";

type LogoSteelConectaProps = {
  tamanho?: "sm" | "md" | "lg";
  onDark?: boolean;
};

const Root = styled.span`
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);

  &[data-tamanho="sm"] {
    --sc-marca: 30px;
    --sc-nome: var(--text-sm);

    & > .marca__nome {
      flex-direction: row;
      gap: 0.28em;
      letter-spacing: 0.04em;
    }
  }

  &[data-tamanho="md"] {
    --sc-marca: 44px;
    --sc-nome: var(--text-lg);
  }

  &[data-tamanho="lg"] {
    --sc-marca: 64px;
    --sc-nome: var(--text-2xl);
    gap: var(--space-4);

    @media (max-width: 900px) {
      --sc-marca: 52px;
      --sc-nome: var(--text-xl);
    }
  }

  & > .marca__icone {
    flex-shrink: 0;
    width: var(--sc-marca);
    height: var(--sc-marca);
  }

  & > .marca__nome {
    display: flex;
    flex-direction: column;
    font-family: var(--font-display);
    font-size: var(--sc-nome);
    font-weight: var(--weight-bold);
    line-height: 0.95;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    white-space: nowrap;

    & > .marca__steel {
      color: var(--color-dark);
    }

    & > .marca__conecta {
      color: var(--color-steel-conecta);
    }
  }

  &[data-on-dark="true"] > .marca__nome {
    & > .marca__steel {
      color: var(--color-bg);
    }

    & > .marca__conecta {
      color: var(--color-steel-conecta-on-dark);
    }
  }
`;

export default function LogoSteelConecta({
  tamanho = "md",
  onDark = false,
}: LogoSteelConectaProps) {
  return (
    <Root data-tamanho={tamanho} data-on-dark={onDark}>
      <Image
        className="marca__icone"
        src={onDark ? STEEL_CONECTA.iconeOnDark : STEEL_CONECTA.icone}
        alt=""
        width={STEEL_CONECTA.iconeTamanho}
        height={STEEL_CONECTA.iconeTamanho}
        sizes="64px"
      />
      <span className="marca__nome">
        <span className="marca__steel">Steel</span>
        <span className="marca__conecta">Conecta</span>
      </span>
    </Root>
  );
}
