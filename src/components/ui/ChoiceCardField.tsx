"use client";

import styled from "@emotion/styled";

import { ErroIcone } from "@/components/ui/Field";
import IconeEscopo, { type EscopoIcone } from "@/components/ui/IconeEscopo";

export type ChoiceCardOption = {
  value: string;
  label: string;
  descricao: string;
  icone: EscopoIcone;
};

type ChoiceCardFieldProps = {
  id: string;
  name: string;
  label: string;
  options: ReadonlyArray<ChoiceCardOption>;
  value: string;
  onChange: (valor: string) => void;
  erro?: string;
};

const Root = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: none;

  & > .cards__legend {
    padding: 0;
    font-family: var(--font-alt);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  & > .cards__opcoes {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    & > .cards__opcao {
      position: relative;
      display: block;

      & > .cards__input {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        opacity: 0;
        cursor: pointer;
      }

      & > .cards__box {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: start;
        gap: var(--space-4);
        min-height: 44px;
        padding: var(--space-4);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
        background: var(--color-bg);
        transition: border-color var(--dur-fast) var(--ease-standard),
          background-color var(--dur-fast) var(--ease-standard);

        @media (max-width: 480px) {
          gap: var(--space-3);
          padding: var(--space-3);
        }

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }

        & > .cards__icone {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: var(--space-7);
          height: var(--space-7);
          border-radius: var(--radius-all);
          border: 1px solid var(--color-border);
          color: var(--color-dark);
          transition: border-color var(--dur-fast) var(--ease-standard),
            background-color var(--dur-fast) var(--ease-standard),
            color var(--dur-fast) var(--ease-standard);

          @media (prefers-reduced-motion: reduce) {
            transition: none;
          }

          & > svg {
            width: 20px;
            height: 20px;
          }
        }

        & > .cards__texto {
          display: flex;
          flex-direction: column;
          gap: var(--space-1);

          & > .cards__titulo {
            font-family: var(--font-display);
            font-size: var(--text-md);
            font-weight: var(--weight-medium);
            line-height: var(--leading-snug);
            color: var(--color-dark);
          }

          & > .cards__descricao {
            font-size: var(--text-sm);
            line-height: var(--leading-snug);
            color: var(--color-muted);
          }
        }
      }

      & > .cards__input:hover + .cards__box {
        border-color: var(--color-muted);
      }

      & > .cards__input:checked + .cards__box {
        border-color: var(--color-dark);
        background: var(--color-gray-surface);

        & > .cards__icone {
          border-color: var(--color-brand);
          background: var(--color-brand);
          color: var(--color-bg);
        }
      }

      & > .cards__input:focus-visible + .cards__box {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }
    }
  }

  & > .cards__erro {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-danger);

    & > .field__erro-icone {
      flex-shrink: 0;
    }
  }

  &[data-invalid="true"] > .cards__opcoes > .cards__opcao > .cards__box {
    border-color: var(--color-danger);
  }
`;

export default function ChoiceCardField({
  id,
  name,
  label,
  options,
  value,
  onChange,
  erro,
}: ChoiceCardFieldProps) {
  const erroId = erro ? `${id}-erro` : undefined;

  return (
    <Root
      id={id}
      data-invalid={Boolean(erro)}
      aria-describedby={erroId}
      aria-invalid={Boolean(erro)}
    >
      <legend className="cards__legend">{label}</legend>

      <div className="cards__opcoes">
        {options.map((option) => (
          <label className="cards__opcao" key={option.value} htmlFor={`${id}-${option.value}`}>
            <input
              className="cards__input"
              id={`${id}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
            />
            <span className="cards__box">
              <span className="cards__icone">
                <IconeEscopo nome={option.icone} />
              </span>
              <span className="cards__texto">
                <span className="cards__titulo">{option.label}</span>
                <span className="cards__descricao">{option.descricao}</span>
              </span>
            </span>
          </label>
        ))}
      </div>

      {erro ? (
        <span className="cards__erro" id={erroId} role="alert">
          <ErroIcone />
          {erro}
        </span>
      ) : null}
    </Root>
  );
}
