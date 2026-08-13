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

export type PreFill = {
  nome?: string;
  email?: string;
  telefone?: string;
  tipoObra?: string;
  regiao?: string;
  metragemEstimada?: string;
  descricao?: string;
};

type OpenOptions = PreFill & {
  origin: string;
};

type FormModalContextValue = {
  isOpen: boolean;
  origin: string;
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
  const [preFill, setPreFill] = useState<PreFill>({});
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback(({ origin: nextOrigin, ...fill }: OpenOptions) => {
    lastTriggerRef.current = document.activeElement as HTMLElement | null;
    setOrigin(nextOrigin);
    setPreFill(fill);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    const trigger = lastTriggerRef.current;
    if (trigger && typeof trigger.focus === "function") {
      window.requestAnimationFrame(() => trigger.focus());
    }
  }, []);

  const value = useMemo(
    () => ({ isOpen, origin, preFill, open, close }),
    [isOpen, origin, preFill, open, close]
  );

  return <FormModalContext.Provider value={value}>{children}</FormModalContext.Provider>;
}
