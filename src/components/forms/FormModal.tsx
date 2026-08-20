"use client";

import styled from "@emotion/styled";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { useFormModal } from "@/components/forms/FormModalProvider";
import Button from "@/components/ui/Button";
import ChoiceCardField from "@/components/ui/ChoiceCardField";
import ChoiceField from "@/components/ui/ChoiceField";
import Field from "@/components/ui/Field";
import SelectField from "@/components/ui/SelectField";
import {
  ATENDIMENTO_POR_INTERESSE,
  ETAPAS_DA_OBRA,
  FAIXAS_METRAGEM,
  INTERESSE_MATERIAL,
  LIMITE_DESCRICAO,
  OPCOES_INTERESSE,
  REGIOES_OPTIONS,
  RESPOSTAS_SIM_NAO,
  SISTEMAS_EM_USO,
  TIPOS_DE_OBRA,
} from "@/data/content";
import { CONTACT } from "@/data/site";
import { pushDataLayerEvent } from "@/lib/analytics";
import {
  maskTelefone,
  validarEmail,
  validarNome,
  validarSelecao,
  validarTelefone,
} from "@/lib/formatters";
import { submitLead } from "@/lib/leads";

type Estado = "editando" | "enviando" | "sucesso" | "erro";

type Campo =
  | "interesse"
  | "tipoObra"
  | "regiao"
  | "metragemEstimada"
  | "temProjeto"
  | "temLocal"
  | "etapaObra"
  | "sistemaEmUso"
  | "nome"
  | "telefone"
  | "email"
  | "descricao";

type Erros = Partial<Record<Campo, string>>;
type Valores = Record<Campo, string>;

const CAMPO_IDS: Record<Campo, string> = {
  interesse: "contato-form-interesse",
  tipoObra: "contato-form-tipo-obra",
  regiao: "contato-form-regiao",
  metragemEstimada: "contato-form-metragem",
  temProjeto: "contato-form-tem-projeto",
  temLocal: "contato-form-tem-local",
  etapaObra: "contato-form-etapa-obra",
  sistemaEmUso: "contato-form-sistema-em-uso",
  nome: "contato-form-nome",
  telefone: "contato-form-telefone",
  email: "contato-form-email",
  descricao: "contato-form-descricao",
};

const VALIDADORES: Partial<Record<Campo, (valor: string) => string | undefined>> = {
  interesse: validarSelecao,
  tipoObra: validarSelecao,
  regiao: validarSelecao,
  metragemEstimada: validarSelecao,
  temProjeto: validarSelecao,
  temLocal: validarSelecao,
  etapaObra: validarSelecao,
  sistemaEmUso: validarSelecao,
  nome: validarNome,
  telefone: validarTelefone,
  email: validarEmail,
};

const ETAPA_ESCOPO = {
  titulo: "O que você precisa",
  campos: ["interesse"] as Campo[],
  acao: "Continuar",
};

const FLUXO_MATERIAL = {
  marca: "",
  titulo: "Pedir orçamento",
  descricao: "Retornamos com preço e prazo do seu projeto.",
  sucessoTitulo: "Orçamento solicitado",
  sucessoTexto:
    "Recebemos seu pedido. Nossa equipe em Brasília entra em contato pelo telefone ou e-mail informado.",
  etapas: [
    ETAPA_ESCOPO,
    {
      titulo: "A obra",
      campos: ["regiao", "etapaObra", "sistemaEmUso", "descricao"] as Campo[],
      acao: "Continuar",
    },
    {
      titulo: "Seu contato",
      campos: ["nome", "telefone", "email"] as Campo[],
      acao: "Pedir orçamento",
    },
  ],
};

const FLUXO_EXECUCAO = {
  marca: "Steel Conecta · Execução",
  titulo: "Falar com a Steel Conecta",
  descricao: "Nossa equipe de execução retorna com escopo e prazo da obra.",
  sucessoTitulo: "Pedido enviado para a Steel Conecta",
  sucessoTexto:
    "Recebemos seu pedido. A equipe de execução entra em contato pelo telefone ou e-mail informado.",
  etapas: [
    ETAPA_ESCOPO,
    {
      titulo: "A obra",
      campos: ["tipoObra", "regiao", "metragemEstimada", "temProjeto", "temLocal"] as Campo[],
      acao: "Continuar",
    },
    {
      titulo: "Seu contato",
      campos: ["nome", "telefone", "email", "descricao"] as Campo[],
      acao: "Falar com a Steel Conecta",
    },
  ],
};

const CAMPOS_DE_ESCOLHA: Campo[] = ["interesse", "temProjeto", "temLocal"];

const VALORES_VAZIOS: Valores = {
  interesse: "",
  tipoObra: "",
  regiao: "",
  metragemEstimada: "",
  temProjeto: "",
  temLocal: "",
  etapaObra: "",
  sistemaEmUso: "",
  nome: "",
  telefone: "",
  email: "",
  descricao: "",
};

function fluxoDoInteresse(interesse: string) {
  return interesse && interesse !== INTERESSE_MATERIAL ? FLUXO_EXECUCAO : FLUXO_MATERIAL;
}

function focarCampo(campo: Campo): void {
  const alvo = CAMPOS_DE_ESCOLHA.includes(campo)
    ? document.querySelector<HTMLElement>(`#${CAMPO_IDS[campo]} input`)
    : document.getElementById(CAMPO_IDS[campo]);

  alvo?.focus();
}

const Dialog = styled.dialog`
  margin: auto;
  width: min(460px, calc(100vw - var(--space-6)));
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
      gap: var(--space-4);
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

        & > .modal__marca {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          align-self: flex-start;
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-all);
          border: 1px solid var(--color-border);
          font-family: var(--font-alt);
          font-size: var(--text-xs);
          font-weight: var(--weight-semibold);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-dark);

          & > i {
            width: var(--space-2);
            height: var(--space-2);
            border-radius: var(--radius-all);
            background: var(--color-brand);
          }
        }

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

    & > .modal__progresso {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);

      & > .modal__progresso-texto {
        font-family: var(--font-alt);
        font-size: var(--text-xs);
        font-weight: var(--weight-semibold);
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--color-muted);
      }

      & > .modal__progresso-trilha {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: var(--space-2);

        & > .modal__progresso-segmento {
          height: var(--line-w);
          border-radius: var(--radius-all);
          background: var(--color-galvanized);
          opacity: 0.35;
          transition: background-color var(--dur-normal) var(--ease-standard),
            opacity var(--dur-normal) var(--ease-standard);

          &[data-ativo="true"] {
            background: var(--color-brand);
            opacity: 1;
          }

          @media (prefers-reduced-motion: reduce) {
            transition: none;
          }
        }
      }
    }

    & > form {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);

      & > .modal__duplo {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-4);

        @media (max-width: 480px) {
          grid-template-columns: 1fr;
        }
      }

      & > .modal__rodape {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);

        & > .modal__acoes {
          display: flex;
          align-items: center;
          gap: var(--space-3);

          & > .modal__acao-principal {
            display: flex;
            flex: 1;
          }
        }

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
  const etapaRenderizadaRef = useRef(0);
  const [etapa, setEtapa] = useState(0);
  const [estado, setEstado] = useState<Estado>("editando");
  const [erros, setErros] = useState<Erros>({});
  const [valores, setValores] = useState<Valores>(VALORES_VAZIOS);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
      setEstado("editando");
      setErros({});
      setEtapa(0);
      etapaRenderizadaRef.current = 0;
      setValores({
        ...VALORES_VAZIOS,
        nome: preFill.nome ?? "",
        email: preFill.email ?? "",
        telefone: maskTelefone(preFill.telefone ?? ""),
        interesse: preFill.interesse ?? "",
        tipoObra: preFill.tipoObra ?? "",
        regiao: preFill.regiao ?? "",
        metragemEstimada: preFill.metragemEstimada ?? "",
        descricao: preFill.descricao ?? "",
      });
      pushDataLayerEvent({ event: "form_open", form_origin: origin });
    }

    if (!isOpen && dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [isOpen, origin, preFill]);

  const fluxo = fluxoDoInteresse(valores.interesse);

  useEffect(() => {
    if (etapa === etapaRenderizadaRef.current) return;
    etapaRenderizadaRef.current = etapa;
    const primeiroCampo = fluxo.etapas[etapa].campos[0];
    window.requestAnimationFrame(() => focarCampo(primeiroCampo));
  }, [etapa, fluxo]);

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

  const limparErro = (campo: Campo, valor: string) => {
    setErros((atual) => {
      if (!atual[campo]) return atual;
      if (VALIDADORES[campo]?.(valor)) return atual;
      const { [campo]: _removido, ...resto } = atual;
      return resto;
    });
  };

  const atualizarCampo = (campo: Campo, bruto: string) => {
    const valor = campo === "telefone" ? maskTelefone(bruto) : bruto;
    setValores((atual) => ({ ...atual, [campo]: valor }));
    limparErro(campo, valor);
  };

  const validarCampo = (campo: Campo) => {
    const erro = VALIDADORES[campo]?.(valores[campo]);
    setErros((atual) => {
      if (erro) return { ...atual, [campo]: erro };
      if (!atual[campo]) return atual;
      const { [campo]: _removido, ...resto } = atual;
      return resto;
    });
  };

  const validarEtapa = (indice: number): Erros => {
    const encontrados: Erros = {};
    fluxo.etapas[indice].campos.forEach((campo) => {
      const erro = VALIDADORES[campo]?.(valores[campo]);
      if (erro) encontrados[campo] = erro;
    });
    return encontrados;
  };

  const enviar = async () => {
    setEstado("enviando");

    try {
      await submitLead({
        interesse: valores.interesse,
        nome: valores.nome.trim(),
        telefone: valores.telefone,
        email: valores.email.trim(),
        regiao: valores.regiao,
        tipoObra: valores.tipoObra,
        metragemEstimada: valores.metragemEstimada,
        temProjeto: valores.temProjeto,
        temLocal: valores.temLocal,
        etapaObra: valores.etapaObra,
        sistemaEmUso: valores.sistemaEmUso,
        descricao: valores.descricao.trim(),
        origin,
      });
      pushDataLayerEvent({
        event: "generate_lead",
        form_origin: origin,
        interesse: valores.interesse,
        atendimento: ATENDIMENTO_POR_INTERESSE[valores.interesse],
        tipo_obra: valores.tipoObra,
        regiao: valores.regiao,
      });
      setEstado("sucesso");
    } catch {
      setEstado("erro");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const encontrados = validarEtapa(etapa);
    setErros(encontrados);

    if (Object.keys(encontrados).length > 0) {
      const primeiro = fluxo.etapas[etapa].campos.find((campo) => encontrados[campo]);
      if (primeiro) {
        window.requestAnimationFrame(() => focarCampo(primeiro));
      }
      return;
    }

    if (etapa < fluxo.etapas.length - 1) {
      setEtapa(etapa + 1);
      return;
    }

    void enviar();
  };

  const etapaAtual = fluxo.etapas[etapa];
  const fluxoDeMaterial = fluxo === FLUXO_MATERIAL;

  return (
    <Dialog ref={dialogRef} aria-labelledby="contato-modal-titulo">
      <div className="modal__inner">
        <div className="modal__topo">
          <div className="modal__titulos">
            {fluxo.marca ? (
              <span className="modal__marca">
                <i aria-hidden="true" />
                {fluxo.marca}
              </span>
            ) : null}
            <h2 className="modal__titulo" id="contato-modal-titulo">
              {fluxo.titulo}
            </h2>
            <p className="modal__descricao">{fluxo.descricao}</p>
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
              {fluxo.sucessoTitulo}
            </p>
            <p className="modal__feedback-texto">{fluxo.sucessoTexto}</p>
            <Button id="contato-btn-concluir" variant="outline" onClick={close}>
              Fechar
            </Button>
          </div>
        ) : (
          <>
            <div className="modal__progresso">
              <p className="modal__progresso-texto" aria-live="polite">
                Passo {etapa + 1} de {fluxo.etapas.length}: {etapaAtual.titulo}
              </p>
              <div className="modal__progresso-trilha" aria-hidden="true">
                {fluxo.etapas.map((item, indice) => (
                  <span
                    key={item.titulo}
                    className="modal__progresso-segmento"
                    data-ativo={indice <= etapa}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {etapa === 0 ? (
                <ChoiceCardField
                  id={CAMPO_IDS.interesse}
                  name="interesse"
                  label="O que você precisa?"
                  options={OPCOES_INTERESSE}
                  value={valores.interesse}
                  onChange={(valor) => atualizarCampo("interesse", valor)}
                  erro={erros.interesse}
                />
              ) : null}

              {etapa === 1 && fluxoDeMaterial ? (
                <>
                  <SelectField
                    id={CAMPO_IDS.regiao}
                    name="regiao"
                    label="Região da obra"
                    placeholder="Selecione a região"
                    options={REGIOES_OPTIONS}
                    value={valores.regiao}
                    onChange={(evento) => atualizarCampo("regiao", evento.target.value)}
                    erro={erros.regiao}
                    required
                  />

                  <SelectField
                    id={CAMPO_IDS.etapaObra}
                    name="etapaObra"
                    label="Em que etapa a obra está?"
                    placeholder="Selecione a etapa"
                    options={ETAPAS_DA_OBRA}
                    value={valores.etapaObra}
                    onChange={(evento) => atualizarCampo("etapaObra", evento.target.value)}
                    erro={erros.etapaObra}
                    required
                  />

                  <SelectField
                    id={CAMPO_IDS.sistemaEmUso}
                    name="sistemaEmUso"
                    label="Qual sistema a obra está usando?"
                    placeholder="Selecione o sistema"
                    options={SISTEMAS_EM_USO}
                    value={valores.sistemaEmUso}
                    onChange={(evento) => atualizarCampo("sistemaEmUso", evento.target.value)}
                    erro={erros.sistemaEmUso}
                    required
                  />

                  <Field
                    id={CAMPO_IDS.descricao}
                    name="descricao"
                    label="Lista de materiais (opcional)"
                    multiline
                    maxLength={LIMITE_DESCRICAO}
                    ajuda="Se ainda não tiver a lista fechada, a equipe calcula com você."
                    placeholder="Ex.: 40 placas standard, 60 montantes de 70mm, lã de vidro e massa."
                    value={valores.descricao}
                    onChange={(evento) => atualizarCampo("descricao", evento.target.value)}
                  />
                </>
              ) : null}

              {etapa === 1 && !fluxoDeMaterial ? (
                <>
                  <SelectField
                    id={CAMPO_IDS.tipoObra}
                    name="tipoObra"
                    label="Tipo de obra"
                    placeholder="Selecione o tipo"
                    options={TIPOS_DE_OBRA}
                    value={valores.tipoObra}
                    onChange={(evento) => atualizarCampo("tipoObra", evento.target.value)}
                    erro={erros.tipoObra}
                    required
                  />

                  <SelectField
                    id={CAMPO_IDS.regiao}
                    name="regiao"
                    label="Região da obra"
                    placeholder="Selecione a região"
                    options={REGIOES_OPTIONS}
                    value={valores.regiao}
                    onChange={(evento) => atualizarCampo("regiao", evento.target.value)}
                    erro={erros.regiao}
                    required
                  />

                  <SelectField
                    id={CAMPO_IDS.metragemEstimada}
                    name="metragemEstimada"
                    label="Metragem estimada"
                    placeholder="Selecione a faixa"
                    options={FAIXAS_METRAGEM}
                    value={valores.metragemEstimada}
                    onChange={(evento) => atualizarCampo("metragemEstimada", evento.target.value)}
                    erro={erros.metragemEstimada}
                    ajuda="Faixa aproximada já resolve. Não precisa calcular."
                    required
                  />

                  <div className="modal__duplo">
                    <ChoiceField
                      id={CAMPO_IDS.temProjeto}
                      name="temProjeto"
                      label="Tem projeto?"
                      options={RESPOSTAS_SIM_NAO}
                      value={valores.temProjeto}
                      onChange={(valor) => atualizarCampo("temProjeto", valor)}
                      erro={erros.temProjeto}
                    />

                    <ChoiceField
                      id={CAMPO_IDS.temLocal}
                      name="temLocal"
                      label="Tem o local?"
                      options={RESPOSTAS_SIM_NAO}
                      value={valores.temLocal}
                      onChange={(valor) => atualizarCampo("temLocal", valor)}
                      erro={erros.temLocal}
                    />
                  </div>
                </>
              ) : null}

              {etapa === 2 ? (
                <>
                  <Field
                    id={CAMPO_IDS.nome}
                    name="nome"
                    label="Nome"
                    autoComplete="name"
                    placeholder="Seu nome"
                    value={valores.nome}
                    onChange={(evento) => atualizarCampo("nome", evento.target.value)}
                    onBlur={() => validarCampo("nome")}
                    erro={erros.nome}
                    required
                  />

                  <Field
                    id={CAMPO_IDS.telefone}
                    name="telefone"
                    label="Telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(61) 9 0000-0000"
                    value={valores.telefone}
                    onChange={(evento) => atualizarCampo("telefone", evento.target.value)}
                    onBlur={() => validarCampo("telefone")}
                    erro={erros.telefone}
                    required
                  />

                  <Field
                    id={CAMPO_IDS.email}
                    name="email"
                    label="E-mail"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="voce@email.com"
                    value={valores.email}
                    onChange={(evento) => atualizarCampo("email", evento.target.value)}
                    onBlur={() => validarCampo("email")}
                    erro={erros.email}
                    required
                  />

                  {fluxoDeMaterial ? null : (
                    <Field
                      id={CAMPO_IDS.descricao}
                      name="descricao"
                      label="O que você precisa (opcional)"
                      multiline
                      maxLength={LIMITE_DESCRICAO}
                      placeholder="Ex.: preciso de equipe para levantar as paredes internas em steel frame."
                      value={valores.descricao}
                      onChange={(evento) => atualizarCampo("descricao", evento.target.value)}
                    />
                  )}
                </>
              ) : null}

              <div className="modal__rodape">
                <div className="modal__acoes">
                  {etapa > 0 ? (
                    <Button
                      id="contato-btn-voltar"
                      type="button"
                      variant="outline"
                      onClick={() => setEtapa(etapa - 1)}
                      disabled={estado === "enviando"}
                    >
                      Voltar
                    </Button>
                  ) : null}

                  <span className="modal__acao-principal">
                    <Button
                      id="contato-btn-enviar"
                      type="submit"
                      fullWidth
                      disabled={estado === "enviando"}
                    >
                      {estado === "enviando" ? "Enviando…" : etapaAtual.acao}
                    </Button>
                  </span>
                </div>

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
          </>
        )}
      </div>
    </Dialog>
  );
}
