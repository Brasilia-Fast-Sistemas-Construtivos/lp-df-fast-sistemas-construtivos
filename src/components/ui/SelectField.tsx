"use client";

import type { SelectHTMLAttributes } from "react";

import { ErroIcone, FieldRoot } from "@/components/ui/Field";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  options: ReadonlyArray<SelectOption>;
  placeholder?: string;
  ajuda?: string;
  erro?: string;
  onDark?: boolean;
};

export default function SelectField({
  id,
  label,
  options,
  placeholder = "Selecione",
  ajuda,
  erro,
  onDark = false,
  ...rest
}: SelectFieldProps) {
  const ajudaId = ajuda ? `${id}-ajuda` : undefined;
  const erroId = erro ? `${id}-erro` : undefined;
  const describedBy = [ajudaId, erroId].filter(Boolean).join(" ") || undefined;

  return (
    <FieldRoot data-invalid={Boolean(erro)} data-on-dark={onDark}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      <div className="field__select-wrap">
        <select
          id={id}
          className="field__control"
          aria-invalid={Boolean(erro)}
          aria-describedby={describedBy}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className="field__chevron"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 5.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

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
