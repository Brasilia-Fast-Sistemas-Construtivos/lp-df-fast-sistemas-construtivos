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
  erro?: string;
  onDark?: boolean;
};

export default function SelectField({
  id,
  label,
  options,
  placeholder = "Selecione",
  erro,
  onDark = false,
  ...rest
}: SelectFieldProps) {
  const erroId = erro ? `${id}-erro` : undefined;

  return (
    <FieldRoot data-invalid={Boolean(erro)} data-on-dark={onDark}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        className="field__control"
        aria-invalid={Boolean(erro)}
        aria-describedby={erroId}
        defaultValue=""
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

      {erro ? (
        <span className="field__erro" id={erroId} role="alert">
          <ErroIcone />
          {erro}
        </span>
      ) : null}
    </FieldRoot>
  );
}
