"use client";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";
import { CONSENT_STORAGE_KEY, promoteAttributionToLocal } from "@/lib/attribution";

const Root = styled.aside`
  position: fixed;
  left: var(--space-5);
  bottom: var(--space-5);
  z-index: var(--z-overlay);
  width: min(420px, calc(100vw - var(--space-6)));
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  box-shadow: var(--shadow-lg);

  @media (max-width: 768px) {
    left: var(--space-4);
    right: var(--space-4);
    bottom: 148px;
    width: auto;
  }

  & > .cookie__titulo {
    font-family: var(--font-alt);
    font-size: var(--text-xs);
    font-weight: var(--weight-semibold);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  & > .cookie__texto {
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--color-fg);

    & > a {
      color: var(--color-brand);
      text-decoration: underline;
      text-underline-offset: 3px;

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }
    }
  }

  & > .cookie__acoes {
    display: flex;
    gap: var(--space-3);

    @media (max-width: 420px) {
      flex-direction: column;
    }
  }
`;

export default function CookieConsent() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      const escolha = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!escolha) setVisivel(true);
    } catch {
      return;
    }
  }, []);

  const registrar = (escolha: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, escolha);
      if (escolha === "accepted") promoteAttributionToLocal();
    } catch {
      setVisivel(false);
      return;
    }
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <Root role="dialog" aria-labelledby="cookie-titulo" aria-describedby="cookie-texto">
      <h2 className="cookie__titulo" id="cookie-titulo">
        Cookies
      </h2>
      <p className="cookie__texto" id="cookie-texto">
        Usamos cookies para entender de onde vêm as visitas e melhorar o atendimento. Você pode
        recusar sem perder nenhuma função do site. Veja a{" "}
        <a href="/politicas/cookies">política de cookies</a>.
      </p>
      <div className="cookie__acoes">
        <Button id="cookie-btn-aceitar" onClick={() => registrar("accepted")}>
          Aceitar
        </Button>
        <Button id="cookie-btn-recusar" variant="outline" onClick={() => registrar("rejected")}>
          Recusar
        </Button>
      </div>
    </Root>
  );
}
