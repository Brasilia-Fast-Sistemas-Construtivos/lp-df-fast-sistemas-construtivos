"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useState } from "react";

import CtaButton from "@/components/forms/CtaButton";
import { useFormModal } from "@/components/forms/FormModalProvider";
import Button from "@/components/ui/Button";
import LogoSteelConecta from "@/components/ui/LogoSteelConecta";
import { MENU_LINKS, SECTION_IDS } from "@/data/navigation";
import { BRAND_ASSETS, CONTACT, SITE, STEEL_CONECTA } from "@/data/site";

const Root = styled.header`
  position: fixed;
  inset: 0 0 auto 0;
  z-index: var(--z-header);
  background: var(--color-bg);
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur-normal) var(--ease-standard);

  &[data-scrolled="true"],
  &[data-menu-aberto="true"] {
    border-bottom-color: var(--color-border);
  }

  & > .header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    height: var(--header-height);
    transition: height var(--dur-normal) var(--ease-standard);

    @media (max-width: 900px) {
      height: var(--header-height-mobile);
      transition: none;
    }

    & > .header__marcas {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      flex-shrink: 0;

      @media (max-width: 900px) {
        gap: var(--space-3);
      }

      @media (max-width: 600px) {
        gap: var(--space-2);
      }

      & > .header__logo {
        display: inline-flex;
        align-items: center;

        &:focus-visible {
          outline: 2px solid var(--color-brand);
          outline-offset: 4px;
        }

        & > img {
          width: 150px;
          height: auto;

          @media (max-width: 900px) {
            width: 120px;
          }

          @media (max-width: 600px) {
            width: 104px;
          }

          @media (max-width: 400px) {
            width: 88px;
          }
        }
      }

      & > .header__divisor {
        width: 1px;
        height: var(--space-6);
        background: var(--color-border);

        @media (max-width: 600px) {
          height: var(--space-5);
        }
      }

      & > .header__conecta {
        display: inline-flex;
        align-items: center;

        &:focus-visible {
          outline: 2px solid var(--color-steel-conecta);
          outline-offset: 4px;
        }
      }
    }

    & > .header__nav {
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
          height: 2px;
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

        @media (prefers-reduced-motion: reduce) {
          transition: none;

          &::after {
            transition: none;
          }
        }
      }
    }

    & > .header__acoes {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      flex-shrink: 0;

      & > .header__cta-desktop {
        @media (max-width: 900px) {
          display: none;
        }
      }

      & > .header__toggle {
        display: none;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        border-radius: var(--radius-all);
        border: 1px solid var(--color-border);
        background: var(--color-bg);
        color: var(--color-dark);
        cursor: pointer;
        transition: border-color var(--dur-fast) var(--ease-standard);

        &:hover {
          border-color: var(--color-dark);
        }

        &:focus-visible {
          outline: 2px solid var(--color-brand);
          outline-offset: 2px;
        }

        @media (max-width: 900px) {
          display: inline-flex;
        }

        & > .header__toggle-icone {
          position: relative;
          width: 18px;
          height: 12px;

          & > i {
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            border-radius: var(--radius-all);
            background: currentColor;
            transition: transform var(--dur-normal) var(--ease-standard),
              opacity var(--dur-fast) var(--ease-standard);

            &:nth-of-type(1) {
              top: 0;
            }

            &:nth-of-type(2) {
              top: 5px;
            }

            &:nth-of-type(3) {
              top: 10px;
            }

            @media (prefers-reduced-motion: reduce) {
              transition: none;
            }
          }
        }
      }
    }
  }

  &[data-menu-aberto="true"] .header__toggle-icone {
    & > i:nth-of-type(1) {
      transform: translateY(5px) rotate(45deg);
    }

    & > i:nth-of-type(2) {
      opacity: 0;
    }

    & > i:nth-of-type(3) {
      transform: translateY(-5px) rotate(-45deg);
    }
  }
`;

const Drawer = styled.nav`
  position: fixed;
  top: var(--header-height-mobile);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: var(--z-header);
  display: none;
  flex-direction: column;
  background: var(--color-bg);
  padding: var(--space-4) var(--container-pad) var(--space-6);
  overflow-y: auto;
  overscroll-behavior: contain;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity var(--dur-normal) var(--ease-standard),
    transform var(--dur-normal) var(--ease-standard);

  @media (max-width: 900px) {
    display: flex;
  }

  @media (min-width: 901px) {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &[data-open="false"] {
    pointer-events: none;
    visibility: hidden;
  }

  &[data-open="true"] {
    opacity: 1;
    transform: translateY(0);
    visibility: visible;
  }

  & > .drawer__links {
    display: flex;
    flex-direction: column;

    & > .drawer__link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 56px;
      padding-block: var(--space-3);
      border-bottom: 1px solid var(--color-border);
      font-size: var(--text-lg);
      font-weight: var(--weight-medium);
      letter-spacing: -0.01em;
      color: var(--color-dark);
      font-family: var(--font-display);

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      &::after {
        content: "→";
        font-size: var(--text-md);
        color: var(--color-muted);
      }
    }
  }

  & > .drawer__rodape {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-top: auto;
    padding-top: var(--space-6);

    & > .drawer__contatos {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);

      & > .drawer__contato {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
        font-size: var(--text-md);
        font-weight: var(--weight-medium);
        color: var(--color-fg);

        &:focus-visible {
          outline: 2px solid var(--color-brand);
          outline-offset: 2px;
        }
      }
    }
  }
`;

export default function Header() {
  const { open } = useFormModal();
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

  useEffect(() => {
    if (menuAberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  useEffect(() => {
    if (!menuAberto) return;

    const onKeyDown = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setMenuAberto(false);
    };

    const onResize = () => {
      if (window.innerWidth > 900) setMenuAberto(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuAberto]);

  const fecharEAbrirModal = () => {
    setMenuAberto(false);
    open({ origin: "header-menu" });
  };

  return (
    <Root data-scrolled={scrolled} data-menu-aberto={menuAberto}>
      <div className="container header__inner">
        <div className="header__marcas">
          <a
            className="header__logo"
            href={`#${SECTION_IDS.hero}`}
            aria-label={`${SITE.name}, voltar ao início`}
            onClick={() => setMenuAberto(false)}
          >
            <Image src={BRAND_ASSETS.logo} alt={SITE.name} width={150} height={38} priority />
          </a>

          <span className="header__divisor" aria-hidden="true" />

          <a
            id="header-link-steel-conecta"
            className="header__conecta"
            href={`#${SECTION_IDS.steelConecta}`}
            aria-label={`${STEEL_CONECTA.nome}, ir para a seção de execução de obra`}
            onClick={() => setMenuAberto(false)}
          >
            <LogoSteelConecta tamanho="sm" />
          </a>
        </div>

        <nav className="header__nav" aria-label="Seções da página">
          {MENU_LINKS.map((link) => (
            <a key={link.href + link.label} className="header__link" href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__acoes">
          <span className="header__cta-desktop">
            <CtaButton id="header-btn-orcamento" origin="header">
              Pedir orçamento
            </CtaButton>
          </span>

          <button
            id="header-btn-menu"
            className="header__toggle"
            type="button"
            aria-expanded={menuAberto}
            aria-controls="header-drawer"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuAberto((estado) => !estado)}
          >
            <span className="header__toggle-icone" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </button>
        </div>
      </div>

      <Drawer id="header-drawer" data-open={menuAberto} aria-label="Menu" aria-hidden={!menuAberto}>
        <div className="drawer__links">
          {MENU_LINKS.map((link) => (
            <a
              key={`drawer-${link.href}${link.label}`}
              className="drawer__link"
              href={link.href}
              tabIndex={menuAberto ? 0 : -1}
              onClick={() => setMenuAberto(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="drawer__rodape">
          <div className="drawer__contatos">
            <a
              className="drawer__contato"
              href={CONTACT.phoneUrl}
              tabIndex={menuAberto ? 0 : -1}
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              className="drawer__contato"
              href={CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={menuAberto ? 0 : -1}
            >
              WhatsApp
            </a>
          </div>

          <Button
            id="drawer-btn-orcamento"
            fullWidth
            tabIndex={menuAberto ? 0 : -1}
            onClick={fecharEAbrirModal}
          >
            Pedir orçamento
          </Button>
        </div>
      </Drawer>
    </Root>
  );
}
