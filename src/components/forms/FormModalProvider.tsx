"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { FORMATO_COMPLETO, FORMATO_WHATSAPP } from "@/data/content";
import { pushDataLayerEvent } from "@/lib/analytics";

export type FormatoDoFormulario = typeof FORMATO_COMPLETO | typeof FORMATO_WHATSAPP;

export type PreFill = {
  nome?: string;
  email?: string;
  telefone?: string;
  interesse?: string;
  tipoObra?: string;
  regiao?: string;
  metragemEstimada?: string;
  descricao?: string;
};

type OpenOptions = PreFill & {
  origin: string;
  clickId?: string;
  formato?: FormatoDoFormulario;
};

type FormModalContextValue = {
  isOpen: boolean;
  origin: string;
  clickId: string;
  formato: FormatoDoFormulario;
  preFill: PreFill;
  open: (options: OpenOptions) => void;
  close: () => void;
};

const FormModalContext = createContext<FormModalContextValue | null>(null);

export function useFormModal() {
  const context = useContext(FormModalContext);
  if (!context) {
    throw new Error("useFormModal precisa estar dentro de FormModalProvider");
  }
  return context;
}

export default function FormModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [origin, setOrigin] = useState("");
  const [clickId, setClickId] = useState("");
  const [formato, setFormato] = useState<FormatoDoFormulario>(FORMATO_COMPLETO);
  const [preFill, setPreFill] = useState<PreFill>({});
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(
    ({
      origin: nextOrigin,
      clickId: nextClickId = "",
      formato: nextFormato = FORMATO_COMPLETO,
      ...fill
    }: OpenOptions) => {
      lastTriggerRef.current = document.activeElement as HTMLElement | null;
      setOrigin(nextOrigin);
      setClickId(nextClickId);
      setFormato(nextFormato);
      setPreFill(fill);
      setIsOpen(true);

      if (nextFormato === FORMATO_WHATSAPP) {
        pushDataLayerEvent({
          event: "whatsapp_click",
          click_id: nextClickId,
          form_origin: nextOrigin,
          whatsapp_origin: nextOrigin,
        });
      }
    },
    []
  );

  const close = useCallback(() => {
    setIsOpen(false);
    const trigger = lastTriggerRef.current;
    if (trigger && typeof trigger.focus === "function") {
      window.requestAnimationFrame(() => trigger.focus());
    }
  }, []);

  const value = useMemo(
    () => ({ isOpen, origin, clickId, formato, preFill, open, close }),
    [isOpen, origin, clickId, formato, preFill, open, close]
  );

  return <FormModalContext.Provider value={value}>{children}</FormModalContext.Provider>;
}
