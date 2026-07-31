"use client";

import styled from "@emotion/styled";
import { useRef } from "react";

import { useSnap } from "@/components/motion/useSnap";

type SnapVariant = "underline" | "seam";

type SnapLineProps = {
  variant?: SnapVariant;
  trigger?: "load" | "scroll";
  delay?: number;
};

const Root = styled.span`
  position: relative;
  display: block;
  height: var(--line-w-strong);
  pointer-events: none;

  & > .snap__stroke {
    position: absolute;
    inset: 0;
    display: block;
    background: var(--color-brand);
    transform-origin: left center;
  }

  & > .snap__dust {
    position: absolute;
    inset: -8px -4px;
    display: block;
    opacity: 0;
    border-radius: var(--radius-all);
    background: radial-gradient(closest-side, var(--color-chalk), transparent 70%);
  }

  &[data-variant="underline"] {
    width: 100%;
  }

  &[data-variant="seam"] {
    height: var(--line-w);
    width: 100%;
  }

  html[data-motion="on"] & > .snap__stroke {
    transform: scaleX(0);
  }
`;

export default function SnapLine({
  variant = "underline",
  trigger = "scroll",
  delay = 0,
}: SnapLineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  useSnap(ref, { trigger, delay });

  return (
    <Root ref={ref} data-variant={variant} data-snap aria-hidden="true">
      <i className="snap__stroke" />
      <i className="snap__dust" />
    </Root>
  );
}
