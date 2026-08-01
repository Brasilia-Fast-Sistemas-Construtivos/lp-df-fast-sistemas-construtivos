"use client";

import styled from "@emotion/styled";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  id: string;
  label: string;
  erro?: string;
  ajuda?: string;
  onDark?: boolean;
};

type InputFieldProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & { multiline?: false };

type TextareaFieldProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true };

type FieldProps = InputFieldProps | TextareaFieldProps;

export const FieldRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  width: 100%;

  & > .field__label {
    font-family: var(--font-alt);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  & > .field__control,
  & > .field__select-wrap > .field__control {
    width: 100%;
    min-height: 44px;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-all);
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    font-family: var(--font-body);
    font-size: var(--text-md);
    color: var(--color-fg);
    transition: border-color var(--dur-fast) var(--ease-standard),
      box-shadow var(--dur-fast) var(--ease-standard);

    &::placeholder {
      color: var(--color-muted);
    }

    &:hover {
      border-color: var(--color-muted);
    }

    &:focus-visible {
      outline: 2px solid var(--color-brand);
      outline-offset: 2px;
      border-color: var(--color-brand);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  & > .field__select-wrap {
    position: relative;
    width: 100%;

    & > .field__control {
      appearance: none;
      padding-right: var(--space-8);
      cursor: pointer;
    }

    & > .field__chevron {
      position: absolute;
      right: var(--space-4);
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      color: var(--color-muted);
      transition: transform var(--dur-normal) var(--ease-standard);

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }

    &:focus-within > .field__chevron {
      transform: translateY(-50%) rotate(180deg);
      color: var(--color-dark);
    }
  }

  & > textarea.field__control {
    border-radius: var(--radius-lg);
    min-height: 96px;
    resize: vertical;
  }

  & > .field__ajuda {
    font-size: var(--text-xs);
    color: var(--color-muted);
  }

  & > .field__erro {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--text-sm);
    color: var(--color-danger);

    & > .field__erro-icone {
      flex-shrink: 0;
    }
  }

  &[data-invalid="true"] > .field__control {
    border-color: var(--color-danger);
  }

  &[data-on-dark="true"] {
    & > .field__label {
      color: var(--color-muted-white);
    }

    & > .field__control {
      background: transparent;
      border-color: var(--color-muted);
      color: var(--color-bg);

      &::placeholder {
        color: var(--color-muted);
      }

      &:focus-visible {
        outline-color: var(--color-bg);
        border-color: var(--color-bg);
      }
    }

    & > .field__ajuda {
      color: var(--color-muted-white);
    }
  }
`;

export function ErroIcone() {
  return (
    <svg
      className="field__erro-icone"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4.5v4.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.3" r="0.9" fill="currentColor" />
    </svg>
  );
}

export default function Field(props: FieldProps) {
  const { id, label, erro, ajuda, onDark = false, ...rest } = props;
  const ajudaId = ajuda ? `${id}-ajuda` : undefined;
  const erroId = erro ? `${id}-erro` : undefined;
  const describedBy = [ajudaId, erroId].filter(Boolean).join(" ") || undefined;

  return (
    <FieldRoot data-invalid={Boolean(erro)} data-on-dark={onDark}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      {"multiline" in rest && rest.multiline ? (
        <textarea
          id={id}
          className="field__control"
          aria-invalid={Boolean(erro)}
          aria-describedby={describedBy}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className="field__control"
          aria-invalid={Boolean(erro)}
          aria-describedby={describedBy}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {ajuda ? (
        <span className="field__ajuda" id={ajudaId}>
          {ajuda}
        </span>
      ) : null}

      {erro ? (
        <span className="field__erro" id={erroId} role="alert">
          <ErroIcone />
          {erro}
        </span>
      ) : null}
    </FieldRoot>
  );
}
