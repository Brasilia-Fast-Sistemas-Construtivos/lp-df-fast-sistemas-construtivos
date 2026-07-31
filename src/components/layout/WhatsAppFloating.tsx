"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { CONTACT } from "@/data/site";
import { appendAttribution } from "@/lib/attribution";

const Root = styled.a`
  position: fixed;
  right: var(--space-5);
  bottom: var(--space-5);
  z-index: var(--z-sticky);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-all);
  background: var(--color-whatsapp);
  color: var(--color-bg);
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
  const [lifted, setLifted] = useState(false);
  const [href, setHref] = useState<string>(CONTACT.whatsappUrl);

  useEffect(() => {
    const base = `${CONTACT.whatsappUrl}?text=${encodeURIComponent(CONTACT.whatsappMensagem)}`;
    setHref(appendAttribution(base));
  }, []);

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
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-lifted={lifted}
      data-no-utm
      aria-label="Falar no WhatsApp com a Fast Brasília"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 015.83 2.42 8.19 8.19 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23z" />
      </svg>
    </Root>
  );
}
