"use client";

import styled from "@emotion/styled";

type CotaProps = {
  valor: string;
  unidade: string;
  rotulo?: string;
  onDark?: boolean;
  size?: "md" | "lg";
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);

  & > .cota__valor {
    display: flex;
    align-items: baseline;
    gap: var(--space-2);
    font-family: var(--font-display);
    font-weight: var(--weight-medium);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    line-height: 1;
    color: var(--color-dark);

    & > .cota__unidade {
      font-family: var(--font-alt);
      font-size: var(--text-xs);
      font-weight: var(--weight-semibold);
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-brand);
    }
  }

  & > .cota__rotulo {
    font-family: var(--font-alt);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  &[data-size="md"] > .cota__valor {
    font-size: var(--text-xl);
  }

  &[data-size="lg"] > .cota__valor {
    font-size: var(--text-2xl);
  }

  &[data-on-dark="true"] {
    & > .cota__valor {
      color: var(--color-bg);

      & > .cota__unidade {
        color: var(--color-muted-white);
      }
    }

    & > .cota__rotulo {
      color: var(--color-muted-white);
    }
  }
`;

export default function Cota({ valor, unidade, rotulo, onDark = false, size = "md" }: CotaProps) {
  return (
    <Root data-on-dark={onDark} data-size={size}>
      <span className="cota__valor">
        {valor}
        <span className="cota__unidade">{unidade}</span>
      </span>
      {rotulo ? <span className="cota__rotulo">{rotulo}</span> : null}
    </Root>
  );
}
