"use client";

import styled from "@emotion/styled";

import { ErroIcone } from "@/components/ui/Field";

export type ChoiceOption = {
  value: string;
  label: string;
};

type ChoiceFieldProps = {
  id: string;
  name: string;
  label: string;
  options: ReadonlyArray<ChoiceOption>;
  value: string;
  onChange: (valor: string) => void;
  erro?: string;
};

const Root = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: none;

  & > .choice__legend {
    padding: 0;
    font-family: var(--font-alt);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  & > .choice__opcoes {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    gap: var(--space-2);

    & > .choice__opcao {
      position: relative;
      display: block;

      & > .choice__input {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: 0;
        cursor: pointer;
      }

      & > .choice__box {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-all);
        border: 1px solid var(--color-border);
        background: var(--color-bg);
        font-family: var(--font-body);
        font-size: var(--text-sm);
        color: var(--color-fg);
        text-align: center;
        transition: border-color var(--dur-fast) var(--ease-standard),
          background-color var(--dur-fast) var(--ease-standard),
          color var(--dur-fast) var(--ease-standard);

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }

      & > .choice__input:hover + .choice__box {
        border-color: var(--color-muted);
      }

      & > .choice__input:checked + .choice__box {
        border-color: var(--color-dark);
        background: var(--color-dark);
        color: var(--color-bg);
      }

      & > .choice__input:focus-visible + .choice__box {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }
    }
  }

  & > .choice__erro {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-danger);

    & > .field__erro-icone {
      flex-shrink: 0;
    }
  }

  &[data-invalid="true"] > .choice__opcoes > .choice__opcao > .choice__box {
    border-color: var(--color-danger);
  }
`;

function idDaOpcao(id: string, valor: string): string {
  const normalizado = valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${id}-${normalizado}`;
}

export default function ChoiceField({
  id,
  name,
  label,
  options,
  value,
  onChange,
  erro,
}: ChoiceFieldProps) {
  const erroId = erro ? `${id}-erro` : undefined;

  return (
    <Root
      id={id}
      data-invalid={Boolean(erro)}
      aria-describedby={erroId}
      aria-invalid={Boolean(erro)}
    >
      <legend className="choice__legend">{label}</legend>

      <div className="choice__opcoes">
        {options.map((option) => (
          <label className="choice__opcao" key={option.value} htmlFor={idDaOpcao(id, option.value)}>
            <input
              className="choice__input"
              id={idDaOpcao(id, option.value)}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="choice__box">{option.label}</span>
          </label>
        ))}
      </div>

      {erro ? (
        <span className="choice__erro" id={erroId} role="alert">
          <ErroIcone />
          {erro}
        </span>
      ) : null}
    </Root>
  );
}
