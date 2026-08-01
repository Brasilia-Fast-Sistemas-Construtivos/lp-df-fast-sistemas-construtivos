"use client";

import styled from "@emotion/styled";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { useFormModal } from "@/components/forms/FormModalProvider";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import { CONTACT } from "@/data/site";
import { submitLead } from "@/lib/leads";

type Estado = "editando" | "enviando" | "sucesso" | "erro";

type Erros = Partial<Record<"nome" | "email" | "telefone", string>>;

const CAMPO_IDS = {
  nome: "contato-form-nome",
  email: "contato-form-email",
  telefone: "contato-form-telefone",
} as const;

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Dialog = styled.dialog`
  margin: auto;
  width: min(440px, calc(100vw - var(--space-6)));
  max-height: calc(100svh - var(--space-6));
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-fg);
  overflow: visible;

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(16px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes backdropIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &::backdrop {
    background: var(--color-backdrop);
  }

  &[open] {
    display: block;
    animation: modalIn var(--dur-slow) var(--ease-standard);

    &::backdrop {
      animation: backdropIn var(--dur-normal) var(--ease-standard);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &[open] {
      animation: none;

      &::backdrop {
        animation: none;
      }
    }
  }

  & > .modal__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding: var(--space-6);
    max-height: calc(100svh - var(--space-6));
    overflow-y: auto;
    overscroll-behavior: contain;

    @media (max-width: 600px) {
      padding: var(--space-5);
    }

    & > .modal__topo {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-4);

      & > .modal__titulos {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);

        & > .modal__titulo {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: var(--weight-medium);
          letter-spacing: -0.02em;
          line-height: var(--leading-tight);
          color: var(--color-dark);
        }

        & > .modal__descricao {
          font-size: var(--text-sm);
          color: var(--color-muted);
          font-family: var(--font-display);
        }
      }
    }

    & > form {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);

      & > .modal__rodape {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        & > .modal__microcopy {
          font-size: var(--text-xs);
          color: var(--color-muted);
          text-align: center;

          & > a {
            color: var(--color-brand);
            text-decoration: underline;
            text-underline-offset: 2px;
          }
        }
      }
    }

    & > .modal__feedback {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      align-items: flex-start;
      padding: var(--space-2) 0;

      & > .modal__feedback-titulo {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        font-family: var(--font-display);
        font-size: var(--text-xl);
        font-weight: var(--weight-medium);
        color: var(--color-dark);
      }

      & > .modal__feedback-texto {
        font-size: var(--text-md);
        color: var(--color-fg);
        font-family: var(--font-display);
      }
    }
  }
`;

const FecharBotao = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-all);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-dark);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-standard),
    transform var(--dur-fast) var(--ease-standard);

  &:hover {
    border-color: var(--color-dark);
    transform: rotate(90deg);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

export default function FormModal() {
  const { isOpen, origin, preFill, close } = useFormModal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [estado, setEstado] = useState<Estado>("editando");
  const [erros, setErros] = useState<Erros>({});

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      setEstado("editando");
      setErros({});
    }

    if (!isOpen && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      document.body.style.overflow = "";
    };
  }, [close]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const nome = String(data.get("nome") || "").trim();
    const email = String(data.get("email") || "").trim();
    const telefone = String(data.get("telefone") || "").trim();

    const proximosErros: Erros = {};
    if (nome.length < 2) proximosErros.nome = "Informe seu nome.";
    if (!EMAIL_VALIDO.test(email)) proximosErros.email = "Informe um e-mail válido.";
    if (telefone.replace(/\D/g, "").length < 10) {
      proximosErros.telefone = "Informe um telefone com DDD.";
    }

    setErros(proximosErros);
    if (Object.keys(proximosErros).length > 0) {
      const ordem: Array<keyof Erros> = ["nome", "email", "telefone"];
      const primeiro = ordem.find((campo) => proximosErros[campo]);
      if (primeiro) {
        const alvo = form.querySelector<HTMLElement>(`#${CAMPO_IDS[primeiro]}`);
        window.requestAnimationFrame(() => alvo?.focus());
      }
      return;
    }

    setEstado("enviando");

    try {
      await submitLead({
        nome,
        email,
        telefone,
        origin,
        ...(preFill.tipoObra ? { tipoObra: preFill.tipoObra } : {}),
        ...(preFill.metragem ? { metragem: preFill.metragem } : {}),
        ...(preFill.regiao ? { regiao: preFill.regiao } : {}),
      });
      setEstado("sucesso");
    } catch {
      setEstado("erro");
    }
  };

  return (
    <Dialog ref={dialogRef} aria-labelledby="contato-modal-titulo">
      <div className="modal__inner">
        <div className="modal__topo">
          <div className="modal__titulos">
            <h2 className="modal__titulo" id="contato-modal-titulo">
              Pedir orçamento
            </h2>
            <p className="modal__descricao">
              Deixe seu contato e retornamos com preço e prazo.
            </p>
          </div>

          <FecharBotao id="contato-btn-fechar" type="button" onClick={close} aria-label="Fechar">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </FecharBotao>
        </div>

        {estado === "sucesso" ? (
          <div className="modal__feedback">
            <p className="modal__feedback-titulo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10.5" stroke="var(--color-success)" strokeWidth="1.6" />
                <path
                  d="M7.5 12.4l3 3 6-6.5"
                  stroke="var(--color-success)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Orçamento solicitado
            </p>
            <p className="modal__feedback-texto">
              Recebemos seu pedido. Nossa equipe em Brasília entra em contato pelo telefone ou
              e-mail informado.
            </p>
            <Button id="contato-btn-concluir" variant="outline" onClick={close}>
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <Field
              id="contato-form-nome"
              name="nome"
              label="Nome"
              autoComplete="name"
              placeholder="Seu nome"
              erro={erros.nome}
              required
            />

            <Field
              id="contato-form-email"
              name="email"
              label="E-mail"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="voce@email.com"
              erro={erros.email}
              required
            />

            <Field
              id="contato-form-telefone"
              name="telefone"
              label="Telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(61) 9 0000-0000"
              erro={erros.telefone}
              required
            />

            <div className="modal__rodape">
              <Button
                id="contato-btn-enviar"
                type="submit"
                fullWidth
                disabled={estado === "enviando"}
              >
                {estado === "enviando" ? "Enviando…" : "Pedir orçamento"}
              </Button>

              {estado === "erro" ? (
                <p className="modal__microcopy" role="alert">
                  Não conseguimos enviar agora.{" "}
                  <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Fale com a gente no WhatsApp
                  </a>{" "}
                  ou ligue para {CONTACT.phoneDisplay}.
                </p>
              ) : (
                <p className="modal__microcopy">
                  Sem compromisso. Seus dados são usados apenas para este atendimento.
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
}
