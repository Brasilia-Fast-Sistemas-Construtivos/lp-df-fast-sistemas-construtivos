"use client";

import styled from "@emotion/styled";

export type EtiquetaPar = {
  rotulo: string;
  valor: string;
};

type EtiquetaProps = {
  pares: ReadonlyArray<EtiquetaPar>;
  onDark?: boolean;
};

const Root = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-alt);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: 0.18em;
  line-height: 1.2;
  text-transform: uppercase;
  color: var(--color-muted);

  & > .etiqueta__separador {
    display: block;
    width: 1px;
    height: 10px;
    background: var(--color-galvanized);
  }

  &[data-on-dark="true"] {
    color: var(--color-muted-white);

    & > .etiqueta__separador {
      background: var(--color-muted);
    }
  }
`;

export default function Etiqueta({ pares, onDark = false }: EtiquetaProps) {
  return (
    <Root data-on-dark={onDark}>
      {pares.map((par, index) => (
        <span key={`${par.rotulo}-${par.valor}`} className="etiqueta__item">
          {index > 0 ? <i className="etiqueta__separador" aria-hidden="true" /> : null}
          {par.rotulo} · {par.valor}
        </span>
      ))}
    </Root>
  );
}
