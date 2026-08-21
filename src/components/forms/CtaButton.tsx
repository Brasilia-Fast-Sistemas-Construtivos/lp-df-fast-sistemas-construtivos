"use client";

import type { ReactNode } from "react";

import { useFormModal, type PreFill } from "@/components/forms/FormModalProvider";
import Button from "@/components/ui/Button";

type CtaButtonProps = {
  id: string;
  origin: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost" | "steel";
  onDark?: boolean;
  fullWidth?: boolean;
  preFill?: PreFill;
};

export default function CtaButton({
  id,
  origin,
  children,
  variant = "solid",
  onDark = false,
  fullWidth = false,
  preFill,
}: CtaButtonProps) {
  const { open } = useFormModal();

  return (
    <Button
      id={id}
      variant={variant}
      onDark={onDark}
      fullWidth={fullWidth}
      onClick={() => open({ origin, ...preFill })}
    >
      {children}
    </Button>
  );
}
