"use client";

import styled from "@emotion/styled";
import Image from "next/image";

import CtaButton from "@/components/forms/CtaButton";
import { useFormModal } from "@/components/forms/FormModalProvider";
import { FORMATO_WHATSAPP } from "@/data/content";
import {
  FOOTER_NAVEGACAO,
  FOOTER_SOLUCOES,
  POLITICAS_LINKS,
  SECTION_IDS,
} from "@/data/navigation";
import { BRAND_ASSETS, CONTACT, SITE, SOCIAL } from "@/data/site";

const ANO_ATUAL = new Date().getFullYear();

const Root = styled.footer`
  background: var(--color-dark);
  color: var(--color-muted-white);

  & > .footer__topo {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: var(--space-7);
    padding-block: var(--space-9) var(--space-7);

    @media (max-width: 1000px) {
      grid-template-columns: 1fr 1fr;
      gap: var(--space-6);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      padding-block: var(--space-7) var(--space-6);

      & > .footer__coluna:nth-of-type(2),
      & > .footer__coluna:nth-of-type(3) {
        display: none;
      }
    }

    & > .footer__coluna {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);

      & > .footer__titulo {
        font-family: var(--font-alt);
        font-size: var(--text-xs);
        font-weight: var(--weight-semibold);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--color-muted-white);
      }

      & > .footer__lista {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        & > li > a {
          display: inline-flex;
          align-items: center;
          min-height: var(--space-6);
          font-size: var(--text-sm);
          color: var(--color-muted-white);
          transition: color var(--dur-fast) var(--ease-standard);

          &:hover {
            color: var(--color-bg);
          }

          &:focus-visible {
            outline: 2px solid var(--color-bg);
            outline-offset: 3px;
          }

          @media (prefers-reduced-motion: reduce) {
            transition: none;
          }
        }
      }

      & > .footer__logo {
        width: 160px;
        height: auto;
      }

      & > .footer__frase {
        font-size: var(--text-sm);
        line-height: var(--leading-normal);
        max-width: 34ch;
      }

      & > .footer__contatos {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        & > a,
        & > button {
          display: inline-flex;
          align-items: center;
          align-self: flex-start;
          min-height: var(--space-6);
          padding: 0;
          border: none;
          background: none;
          font-family: inherit;
          font-size: var(--text-md);
          font-weight: var(--weight-medium);
          text-align: left;
          color: var(--color-bg);
          cursor: pointer;
          touch-action: manipulation;

          &:hover {
            color: var(--color-muted-white);
          }

          &:focus-visible {
            outline: 2px solid var(--color-bg);
            outline-offset: 3px;
          }
        }
      }

      & > .footer__regioes {
        font-size: var(--text-sm);
        line-height: var(--leading-relaxed);
        color: var(--color-muted-white);
      }
    }
  }

  & > .footer__base {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-4);
    padding-block: var(--space-5);
    border-top: 1px solid var(--color-footer-rule);

    & > .footer__legal {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-4);

      & > a {
        display: inline-flex;
        align-items: center;
        min-height: var(--space-6);
        font-size: var(--text-xs);
        color: var(--color-muted-white);

        &:hover {
          color: var(--color-bg);
        }

        &:focus-visible {
          outline: 2px solid var(--color-bg);
          outline-offset: 3px;
        }
      }
    }

    & > .footer__copy {
      font-size: var(--text-xs);
      color: var(--color-muted-white);
    }
  }
`;

export default function Footer() {
  const { open } = useFormModal();

  return (
    <Root>
      <div className="container footer__topo">
        <div className="footer__coluna">
          <Image
            className="footer__logo"
            src={BRAND_ASSETS.logoWhite}
            alt={SITE.name}
            width={160}
            height={40}
          />
          <p className="footer__frase">
            Sistemas construtivos a seco em Brasília e no Distrito Federal. Material e mão de obra
            especializada, com um único responsável pela obra.
          </p>
          <div className="footer__contatos">
            <a id="footer-btn-telefone" href={CONTACT.phoneUrl}>
              {CONTACT.phoneDisplay}
            </a>
            <a id="footer-btn-email" href={CONTACT.emailUrl}>
              {CONTACT.email}
            </a>
            <button
              id="footer-btn-whatsapp"
              type="button"
              onClick={(evento) =>
                open({
                  origin: "footer-whatsapp",
                  clickId: evento.currentTarget.id,
                  formato: FORMATO_WHATSAPP,
                })
              }
            >
              WhatsApp
            </button>
            <a
              id="footer-btn-instagram"
              href={SOCIAL.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram · {SOCIAL.instagramHandle}
            </a>
          </div>
          <CtaButton id="footer-btn-orcamento" origin="footer" variant="outline" onDark>
            Pedir orçamento
          </CtaButton>
        </div>

        <div className="footer__coluna">
          <h2 className="footer__titulo">Soluções</h2>
          <ul className="footer__lista">
            {FOOTER_SOLUCOES.map((item) => (
              <li key={item.slug}>
                <a id={`footer-link-solucao-${item.slug}`} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__coluna">
          <h2 className="footer__titulo">Navegação</h2>
          <ul className="footer__lista">
            {FOOTER_NAVEGACAO.map((item) => (
              <li key={item.slug}>
                <a id={`footer-link-${item.slug}`} href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                id="footer-link-site-nacional"
                href={SITE.institutionalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Site nacional
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__coluna">
          <h2 className="footer__titulo">Onde atendemos</h2>
          <p className="footer__regioes">
            Todo o Distrito Federal e entorno, do Plano Piloto às demais regiões
            administrativas.
          </p>
          <ul className="footer__lista">
            <li>
              <a id="footer-link-cobertura" href={`#${SECTION_IDS.cobertura}`}>
                Ver regiões atendidas
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__base">
        <nav className="footer__legal" aria-label="Políticas">
          {POLITICAS_LINKS.map((item) => (
            <a key={item.slug} id={`footer-link-politica-${item.slug}`} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <p className="footer__copy">
          © {ANO_ATUAL} {SITE.name} · {SITE.region}
        </p>
      </div>
    </Root>
  );
}
