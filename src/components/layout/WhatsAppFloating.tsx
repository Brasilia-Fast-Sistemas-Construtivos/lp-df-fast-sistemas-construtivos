"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { useFormModal } from "@/components/forms/FormModalProvider";
import IconeWhatsApp from "@/components/ui/IconeWhatsApp";
import { FORMATO_WHATSAPP } from "@/data/content";

const Root = styled.button`
  position: fixed;
  right: var(--space-5);
  bottom: var(--space-5);
  z-index: var(--z-sticky);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  border-radius: var(--radius-all);
  background: var(--color-whatsapp);
  color: var(--color-bg);
  cursor: pointer;
  touch-action: manipulation;
  box-shadow: var(--shadow-md);
  transition: transform var(--dur-normal) var(--ease-standard),
    background var(--dur-fast) var(--ease-standard);

  &:hover {
    background: var(--color-whatsapp-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--color-dark);
    outline-offset: 3px;
  }

  &[data-lifted="true"] {
    transform: translateY(-6px);
  }

  @media (max-width: 768px) {
    right: var(--space-4);
    bottom: 84px;
    width: 50px;
    height: 50px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: background var(--dur-fast) var(--ease-standard);

    &[data-lifted="true"] {
      transform: none;
    }
  }
`;

export default function WhatsAppFloating() {
  const { open } = useFormModal();
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setLifted(window.scrollY > 100);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Root
      id="flutuante-btn-whatsapp"
      type="button"
      data-lifted={lifted}
      onClick={(evento) =>
        open({
          origin: "whatsapp-flutuante",
          clickId: evento.currentTarget.id,
          formato: FORMATO_WHATSAPP,
        })
      }
      aria-label="Pedir orçamento pelo WhatsApp"
    >
      <IconeWhatsApp size={28} />
    </Root>
  );
}
