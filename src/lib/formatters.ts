const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function maskTelefone(valor: string): string {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length === 0) return "";
  if (digitos.length <= 2) return `(${digitos}`;
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 3)} ${digitos.slice(3, 7)}-${digitos.slice(7)}`;
}

export function validarNome(valor: string): string | undefined {
  if (valor.trim().length < 2) return "Informe seu nome.";
  return undefined;
}

export function validarEmail(valor: string): string | undefined {
  if (!EMAIL_VALIDO.test(valor.trim())) return "Informe um e-mail válido.";
  return undefined;
}

export function validarTelefone(valor: string): string | undefined {
  const digitos = valor.replace(/\D/g, "");
  if (digitos.length < 10) return "Informe um telefone com DDD.";
  return undefined;
}

export function validarSelecao(valor: string): string | undefined {
  if (!valor.trim()) return "Escolha uma opção.";
  return undefined;
}
