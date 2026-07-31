"use client";

import styled from "@emotion/styled";
import type { ButtonHTMLAttributes, PointerEvent, ReactNode } from "react";

type ButtonVariant = "solid" | "outline" | "ghost";

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
  color: var(--btn-on);
  border: 1px solid var(--btn-color);
  background: transparent;
  cursor: pointer;
  transition: color var(--dur-fast) var(--ease-standard);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: var(--btn-color);
    transform: scaleX(var(--btn-fill));
    transform-origin: var(--btn-origin, left) center;
    transition: transform var(--dur-normal) var(--ease-standard);
  }

  &:hover::before {
    transform: scaleX(var(--btn-fill-hover));
  }

  &:active {
    transform: scale(0.985);
  }

  &:focus-visible {
    outline: 2px solid var(--btn-focus);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &[data-full="true"] {
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }

    &:active {
      transform: none;
    }
  }

  &[data-variant="solid"] {
    --btn-color: var(--color-brand);
    --btn-on: var(--color-bg);
    --btn-fill: 1;
    --btn-fill-hover: 1;
    --btn-focus: var(--color-brand);

    &:hover {
      --btn-color: var(--color-brand-contrast);
    }

    &::before {
      transition: background var(--dur-fast) var(--ease-standard);
    }
  }

  &[data-variant="outline"] {
    --btn-color: var(--color-dark);
    --btn-on: var(--color-dark);
    --btn-fill: 0;
    --btn-fill-hover: 1;
    --btn-focus: var(--color-brand);

    &:hover {
      color: var(--color-bg);
    }
  }

  &[data-variant="ghost"] {
    --btn-color: transparent;
    --btn-on: var(--color-fg);
    --btn-fill: 0;
    --btn-fill-hover: 0;
    --btn-focus: var(--color-brand);
    border-color: transparent;

    &:hover {
      color: var(--color-brand);
    }
  }

  &[data-on-dark="true"] {
    &[data-variant="outline"] {
      --btn-color: var(--color-bg);
      --btn-on: var(--color-bg);
      --btn-focus: var(--color-bg);

      &:hover {
        color: var(--color-dark);
      }
    }

    &[data-variant="ghost"] {
      --btn-on: var(--color-muted-white);
      --btn-focus: var(--color-bg);

      &:hover {
        color: var(--color-bg);
      }
    }

    &[data-variant="solid"] {
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
  onPointerEnter,
  ...rest
}: ButtonProps) {
  const handlePointerEnter = (event: PointerEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const bounds = target.getBoundingClientRect();
    const cameFromLeft = event.clientX - bounds.left < bounds.width / 2;
    target.style.setProperty("--btn-origin", cameFromLeft ? "left" : "right");
    onPointerEnter?.(event);
  };

  return (
    <Root
      id={id}
      type={rest.type ?? "button"}
      data-variant={variant}
      data-on-dark={onDark}
      data-full={fullWidth}
      onPointerEnter={handlePointerEnter}
      {...rest}
    >
      {children}
    </Root>
  );
}
