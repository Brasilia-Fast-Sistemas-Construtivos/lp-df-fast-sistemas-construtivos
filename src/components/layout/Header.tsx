"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { MENU_LINKS, SECTION_IDS } from "@/data/navigation";
import { BRAND_ASSETS, SITE } from "@/data/site";

const Root = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: var(--z-header);
  background: var(--color-bg);
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur-normal) var(--ease-standard);

  &[data-scrolled="true"] {
    border-bottom-color: var(--color-border);
  }

  & > .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-5);
    height: var(--header-height);
    transition: height var(--dur-normal) var(--ease-standard);

    @media (max-width: 900px) {
      height: var(--header-height-mobile);
    }

    @media (max-width: 480px) {
      gap: var(--space-3);
    }
  }

  &[data-scrolled="true"] > .header__inner {
    height: 56px;
  }

  & .header__logo {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;

    & > img {
      width: 150px;
      height: auto;

      @media (max-width: 900px) {
        width: 124px;
      }

      @media (max-width: 480px) {
        width: 96px;
      }
    }
  }

  & .header__nav {
    display: flex;
    align-items: center;
    gap: var(--space-5);

    @media (max-width: 900px) {
      display: none;
    }

    & > .header__link {
      position: relative;
      font-size: var(--text-sm);
      font-weight: var(--weight-medium);
      color: var(--color-fg);
      transition: color var(--dur-fast) var(--ease-standard);

      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        height: var(--line-w);
        background: var(--color-brand);
        transform: scaleX(0);
        transform-origin: left center;
        transition: transform var(--dur-fast) var(--ease-standard);
      }

      &:hover {
        color: var(--color-dark);
      }

      &:hover::after {
        transform: scaleX(1);
      }

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 4px;
      }
    }
  }

  & .header__acoes {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex-shrink: 0;

    @media (max-width: 480px) {
      gap: var(--space-2);

      & > button:first-of-type {
        padding: var(--space-2) var(--space-3);
        font-size: var(--text-xs);
      }
    }
  }

  & .header__toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: var(--radius-all);
    border: 1px solid var(--color-border);
    color: var(--color-dark);
    cursor: pointer;

    &:focus-visible {
      outline: 2px solid var(--color-brand);
      outline-offset: 2px;
    }

    @media (max-width: 900px) {
      display: inline-flex;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    & > .header__inner {
      transition: none;
    }
  }
`;

const Painel = styled.div`
  display: none;
  border-top: 1px solid var(--color-border);
  background: var(--color-bg);

  &[data-open="true"] {
    @media (max-width: 900px) {
      display: block;
    }
  }

  & > .painel__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    padding-block: var(--space-5);

    & > .painel__link {
      display: flex;
      align-items: center;
      min-height: 44px;
      font-size: var(--text-lg);
      font-weight: var(--weight-medium);
      color: var(--color-dark);

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 4px;
      }
    }
  }
`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Root data-scrolled={scrolled}>
      <div className="container header__inner">
        <a className="header__logo" href={`#${SECTION_IDS.hero}`} aria-label={`${SITE.name} — início`}>
          <Image
            src={BRAND_ASSETS.logo}
            alt={SITE.name}
            width={150}
            height={38}
            priority
          />
        </a>

        <nav className="header__nav" aria-label="Seções da página">
          {MENU_LINKS.map((link) => (
            <a key={link.href + link.label} className="header__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__acoes">
          <CtaButton id="header-btn-orcamento" origin="header">
            Pedir orçamento
          </CtaButton>

          <button
            id="header-btn-menu"
            className="header__toggle"
            type="button"
            aria-expanded={menuAberto}
            aria-controls="header-painel"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuAberto((estado) => !estado)}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              {menuAberto ? (
                <path
                  d="M2 2l14 10M16 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M1 1h16M1 7h16M1 13h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <Painel id="header-painel" data-open={menuAberto}>
        <nav className="container painel__inner" aria-label="Menu">
          {MENU_LINKS.map((link) => (
            <a
              key={`painel-${link.href}${link.label}`}
              className="painel__link"
              href={link.href}
              onClick={() => setMenuAberto(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </Painel>
    </Root>
  );
}
