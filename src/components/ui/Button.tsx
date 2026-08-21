"use client";

import styled from "@emotion/styled";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "ghost" | "steel";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  id: string;
  children: ReactNode;
  variant?: ButtonVariant;
  onDark?: boolean;
  fullWidth?: boolean;
};

const Root = styled.button`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-all);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  line-height: 1;
  white-space: nowrap;
  color: var(--btn-fg);
  border: 1px solid var(--btn-border);
  background: transparent;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-standard),
    border-color var(--dur-fast) var(--ease-standard);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: var(--btn-color);
    opacity: var(--btn-fill);
    transition: opacity var(--dur-fast) var(--ease-standard);
    z-index: -1;
  }

  &:hover {
    color: var(--btn-fg-hover);
    border-color: var(--btn-border-hover);
  }

  &:hover::before {
    opacity: var(--btn-fill-hover);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid var(--btn-focus);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;

    &:hover {
      color: var(--btn-fg);
      border-color: var(--btn-border);
    }

    &:hover::before {
      opacity: var(--btn-fill);
    }
  }

  &[data-full="true"] {
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &::before {
      transition: none;
    }

    &:active {
      transform: none;
    }
  }

  &[data-variant="solid"] {
    --btn-color: var(--color-brand);
    --btn-fill: 1;
    --btn-fill-hover: 0;
    --btn-fg: var(--color-bg);
    --btn-fg-hover: var(--color-brand);
    --btn-border: transparent;
    --btn-border-hover: var(--color-brand);
    --btn-focus: var(--color-brand);
  }

  &[data-variant="outline"] {
    --btn-color: var(--color-dark);
    --btn-fill: 0;
    --btn-fill-hover: 1;
    --btn-fg: var(--color-dark);
    --btn-fg-hover: var(--color-bg);
    --btn-border: var(--color-dark);
    --btn-border-hover: transparent;
    --btn-focus: var(--color-brand);
  }

  &[data-variant="steel"] {
    --btn-color: var(--color-steel-conecta);
    --btn-fill: 1;
    --btn-fill-hover: 0;
    --btn-fg: var(--color-bg);
    --btn-fg-hover: var(--color-steel-conecta);
    --btn-border: transparent;
    --btn-border-hover: var(--color-steel-conecta);
    --btn-focus: var(--color-steel-conecta);
  }

  &[data-variant="ghost"] {
    --btn-color: transparent;
    --btn-fill: 0;
    --btn-fill-hover: 0;
    --btn-fg: var(--color-fg);
    --btn-fg-hover: var(--color-brand);
    --btn-border: transparent;
    --btn-border-hover: transparent;
    --btn-focus: var(--color-brand);
  }

  &[data-on-dark="true"] {
    &[data-variant="solid"] {
      --btn-fg-hover: var(--color-bg);
      --btn-border-hover: var(--color-bg);
      --btn-focus: var(--color-bg);
    }


    &[data-variant="outline"] {
      --btn-color: var(--color-bg);
      --btn-fg: var(--color-bg);
      --btn-fg-hover: var(--color-dark);
      --btn-border: var(--color-bg);
      --btn-focus: var(--color-bg);
    }

    &[data-variant="ghost"] {
      --btn-fg: var(--color-muted-white);
      --btn-fg-hover: var(--color-bg);
      --btn-focus: var(--color-bg);
    }
  }
`;

export default function Button({
  id,
  children,
  variant = "solid",
  onDark = false,
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <Root
      id={id}
      type={rest.type ?? "button"}
      data-variant={variant}
      data-on-dark={onDark}
      data-full={fullWidth}
      {...rest}
    >
      {children}
    </Root>
  );
}
