"use client";

import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";

import Button from "@/components/ui/Button";
import { updateConsentState } from "@/lib/analytics";
import { CONSENT_STORAGE_KEY, promoteAttributionToLocal } from "@/lib/attribution";

const ESCOLHAS_VALIDAS = ["accepted", "rejected"];

const Root = styled.div`
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  padding: var(--space-5);
  background: var(--color-backdrop);

  @media (max-width: 768px) {
    padding: var(--space-4);
    padding-bottom: 148px;
  }

  & > .cookie__painel {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    width: min(420px, 100%);
    max-height: calc(100svh - var(--space-6));
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: var(--space-5);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    background: var(--color-bg);
    box-shadow: var(--shadow-lg);

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
  }
`;

export default function CookieConsent() {
  const painelRef = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    try {
      const escolha = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      setVisivel(!escolha || !ESCOLHAS_VALIDAS.includes(escolha));
    } catch {
      setVisivel(true);
    }
  }, []);

  const prenderFoco = useCallback((evento: KeyboardEvent) => {
    if (evento.key !== "Tab") return;

    const painel = painelRef.current;
    if (!painel) return;

    const focaveis = painel.querySelectorAll<HTMLElement>("a[href], button");
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (!primeiro || !ultimo) return;

    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
      return;
    }

    if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }, []);

  useEffect(() => {
    if (!visivel) return;

    const focoAnterior = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() =>
      painelRef.current?.querySelector<HTMLElement>("button")?.focus()
    );
    window.addEventListener("keydown", prenderFoco);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", prenderFoco);
      if (focoAnterior && typeof focoAnterior.focus === "function") focoAnterior.focus();
    };
  }, [visivel, prenderFoco]);

  const registrar = (escolha: "accepted" | "rejected") => {
    updateConsentState(escolha === "accepted");

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
    <Root>
      <div
        className="cookie__painel"
        ref={painelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-titulo"
        aria-describedby="cookie-texto"
      >
        <h2 className="cookie__titulo" id="cookie-titulo">
          Cookies
        </h2>
        <p className="cookie__texto" id="cookie-texto">
          Usamos cookies para entender de onde vêm as visitas e melhorar o atendimento. Escolha uma
          opção para continuar: recusar não tira nenhuma função do site. Veja a{" "}
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
      </div>
    </Root>
  );
}
