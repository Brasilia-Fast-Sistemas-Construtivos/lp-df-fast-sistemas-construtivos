"use client";

import { HardHatIcon, PackageIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr";

const ICONES = {
  material: PackageIcon,
  equipe: HardHatIcon,
  contrato: SealCheckIcon,
} as const;

export type EscopoIcone = keyof typeof ICONES;

export default function IconeEscopo({ nome }: { nome: EscopoIcone }) {
  const Icone = ICONES[nome];
  return <Icone weight="regular" aria-hidden="true" />;
}
