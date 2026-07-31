"use client";

import styled from "@emotion/styled";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { useFormModal } from "@/components/forms/FormModalProvider";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import SelectField from "@/components/ui/SelectField";
import { FAIXAS_METRAGEM, REGIOES_OPTIONS, TIPOS_DE_OBRA } from "@/data/content";
import { CONTACT } from "@/data/site";
import { submitLead } from "@/lib/leads";

const CAMPO_IDS = {
  nome: "contato-form-nome",
  whatsapp: "contato-form-whatsapp",
  tipoObra: "contato-form-tipo-obra",
  regiao: "contato-form-regiao",
} as const;

type Estado = "editando" | "enviando" | "sucesso" | "erro";

type Erros = Partial<Record<"nome" | "whatsapp" | "tipoObra" | "regiao", string>>;

const Dialog = styled.dialog`
  width: min(520px, calc(100vw - var(--space-6)));
  max-height: calc(100svh - var(--space-6));
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-fg);
  overflow: visible;

  &::backdrop {
    background: var(--color-backdrop);
  }

  &[open] {
    display: block;
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
  }

  & .modal__topo {
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
        font-weight: var(--weight-semibold);
        letter-spacing: -0.01em;
        line-height: var(--leading-tight);
        color: var(--color-dark);
      }

      & > .modal__descricao {
        font-size: var(--text-sm);
        color: var(--color-muted);
      }
    }
  }

  & .modal__campos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }

    & > .modal__campo-largo {
      grid-column: 1 / -1;
    }
  }

  & .modal__rodape {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    & > .modal__microcopy {
      font-size: var(--text-xs);
      color: var(--color-muted);
      text-align: center;
    }
  }

  & .modal__feedback {
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
      font-weight: var(--weight-semibold);
      color: var(--color-dark);
    }

    & > .modal__feedback-texto {
      font-size: var(--text-md);
      color: var(--color-fg);
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
  transition: border-color var(--dur-fast) var(--ease-standard);

  &:hover {
    border-color: var(--color-dark);
  }

  &:focus-visible {
    outline: 2px solid var(--color-brand);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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

    const proximosErros: Erros = {};
    const nome = String(data.get("nome") || "").trim();
    const whatsapp = String(data.get("whatsapp") || "").trim();
    const tipoObra = String(data.get("tipoObra") || "");
    const regiao = String(data.get("regiao") || "");

    if (nome.length < 2) proximosErros.nome = "Informe seu nome.";
    if (whatsapp.replace(/\D/g, "").length < 10) {
      proximosErros.whatsapp = "Informe um WhatsApp com DDD.";
    }
    if (!tipoObra) proximosErros.tipoObra = "Selecione o tipo de obra.";
    if (!regiao) proximosErros.regiao = "Selecione a região.";

    setErros(proximosErros);
    if (Object.keys(proximosErros).length > 0) {
      const ordem: Array<keyof Erros> = ["nome", "whatsapp", "tipoObra", "regiao"];
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
        whatsapp,
        tipoObra,
        regiao,
        metragem: String(data.get("metragem") || ""),
        mensagem: String(data.get("mensagem") || ""),
        origin,
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
              Visita técnica no seu endereço, escopo e prazo por escrito.
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
              Recebemos seu pedido. Nossa equipe em Brasília entra em contato pelo WhatsApp
              informado.
            </p>
            <Button id="contato-btn-concluir" variant="outline" onClick={close}>
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="modal__campos">
              <div className="modal__campo-largo">
                <Field
                  id="contato-form-nome"
                  name="nome"
                  label="Nome"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  erro={erros.nome}
                  required
                />
              </div>

              <Field
                id="contato-form-whatsapp"
                name="whatsapp"
                label="WhatsApp"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(61) 9 0000-0000"
                erro={erros.whatsapp}
                required
              />

              <SelectField
                id="contato-form-tipo-obra"
                name="tipoObra"
                label="Tipo de obra"
                options={TIPOS_DE_OBRA}
                defaultValue={preFill.tipoObra ?? ""}
                erro={erros.tipoObra}
                required
              />

              <SelectField
                id="contato-form-metragem"
                name="metragem"
                label="Metragem"
                options={FAIXAS_METRAGEM}
                defaultValue={preFill.metragem ?? ""}
              />

              <SelectField
                id="contato-form-regiao"
                name="regiao"
                label="Região"
                options={REGIOES_OPTIONS}
                defaultValue={preFill.regiao ?? ""}
                erro={erros.regiao}
                required
              />

              <div className="modal__campo-largo">
                <Field
                  id="contato-form-mensagem"
                  name="mensagem"
                  label="Mensagem"
                  multiline
                  placeholder="Conte o que você precisa (opcional)"
                />
              </div>
            </div>

            <div className="modal__rodape">
              <Button
                id="contato-btn-enviar"
                type="submit"
                fullWidth
                disabled={estado === "enviando"}
              >
                {estado === "enviando" ? "Enviando..." : "Pedir orçamento"}
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
