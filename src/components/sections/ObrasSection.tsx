"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/a11y";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import Cota from "@/components/ui/Cota";
import Etiqueta from "@/components/ui/Etiqueta";
import SectionHeader from "@/components/ui/SectionHeader";
import SnapLine from "@/components/ui/SnapLine";
import {
  CONTENT_GATES,
  DEPOIMENTOS,
  LOGOS_CORPORATIVOS,
  OBRAS,
  REGIOES_ATENDIDAS,
  SISTEMAS,
} from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

type Obra = (typeof OBRAS)[number];

const CONSULTA_CARROSSEL = "(max-width: 900px)";
const TAMANHOS_FOTO_OBRA = "(max-width: 900px) 82vw, (max-width: 1200px) 46vw, 620px";
const LOGO_LARGURA = 160;
const LOGO_ALTURA = 48;
const DEPOIMENTOS_EXIBIDOS = 3;

const Root = styled.section`
  background: var(--color-bg);
  padding-block: var(--section-gap);

  & > .obras__wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);

    @media (max-width: 700px) {
      gap: var(--space-7);
    }

    & > .obras__abertura {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    & > .obras__mosaico {
      & > .obras__grade {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        align-items: start;
        gap: var(--space-6) var(--space-5);

        @media (max-width: 700px) {
          gap: var(--space-6);
        }

        & > .obra {
          grid-column: span 5;

          @media (max-width: 1100px) {
            grid-column: span 6;
          }

          @media (max-width: 700px) {
            grid-column: span 12;
          }

          &[data-destaque="true"] {
            grid-column: span 7;

            @media (max-width: 1100px) {
              grid-column: span 6;
            }

            @media (max-width: 700px) {
              grid-column: span 12;
            }

            & > .obra__foto {
              aspect-ratio: 16 / 10;
            }
          }
        }
      }

      & > .obras__carrossel {
        width: 100%;

        & > .swiper-wrapper {
          & > .swiper-slide {
            width: min(82%, 380px);
            height: auto;
            padding-inline-end: var(--space-4);
          }
        }
      }
    }

    & > .obras__prova {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: var(--space-7);
      padding: var(--space-7);
      border: 1px solid var(--color-border);
      border-inline-start: var(--line-w) solid var(--color-galvanized);
      border-radius: var(--radius-md);
      background: var(--color-surface);

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: var(--space-6);
        padding: var(--space-5);
      }

      & > .obras__prova-texto {
        display: flex;
        flex-direction: column;
        gap: var(--space-5);

        & > .obras__prova-nota {
          font-size: var(--text-md);
          line-height: var(--leading-relaxed);
          color: var(--color-fg);
          max-width: 46ch;
        }

        & > .obras__prova-cotas {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-6);
          padding-top: var(--space-5);
          border-top: 1px solid var(--color-border);
        }
      }

      & > .obras__prova-escopo {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);

        & > .obras__prova-titulo {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: var(--weight-medium);
          letter-spacing: -0.01em;
          line-height: var(--leading-snug);
          color: var(--color-dark);
        }

        & > .obras__prova-lista {
          display: flex;
          flex-direction: column;

          & > .obras__prova-item {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: var(--space-4);
            padding-block: var(--space-3);
            border-bottom: 1px solid var(--color-border);

            &:last-of-type {
              border-bottom: none;
              padding-bottom: 0;
            }

            & > .obras__prova-nome {
              font-size: var(--text-md);
              font-weight: var(--weight-medium);
              color: var(--color-dark);
            }

            & > .obras__prova-tag {
              font-family: var(--font-alt);
              font-size: var(--text-xs);
              font-weight: var(--weight-semibold);
              letter-spacing: 0.18em;
              line-height: 1.2;
              text-transform: uppercase;
              text-align: end;
              color: var(--color-muted);
            }
          }
        }
      }
    }

    & > .obras__depoimentos {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);

      & > .obras__depoimentos-titulo {
        font-family: var(--font-display);
        font-size: var(--text-xl);
        font-weight: var(--weight-medium);
        letter-spacing: -0.01em;
        line-height: var(--leading-snug);
        color: var(--color-dark);
      }

      & > .obras__depoimentos-lista {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-5);

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
        }

        & > .depoimento {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          padding: var(--space-5);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);

          & > .depoimento__texto {
            font-size: var(--text-md);
            line-height: var(--leading-relaxed);
            color: var(--color-fg);
          }

          & > .depoimento__autor {
            font-size: var(--text-sm);
            font-weight: var(--weight-medium);
            color: var(--color-dark);
          }
        }
      }
    }

    & > .obras__logos {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
      padding-top: var(--space-6);
      border-top: 1px solid var(--color-border);

      & > .obras__logos-lista {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-7);

        @media (max-width: 700px) {
          gap: var(--space-6);
        }

        & > .obras__logo {
          & > img {
            width: auto;
            max-width: 160px;
            max-height: 40px;
          }
        }
      }
    }

    & > .obras__fecho {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: var(--space-5);
      padding-top: var(--space-6);
      border-top: 1px solid var(--color-border);

      & > .obras__fecho-texto {
        font-size: var(--text-md);
        line-height: var(--leading-normal);
        color: var(--color-muted);
        max-width: 52ch;
      }
    }
  }
`;

const CardRoot = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  & > .obra__foto {
    position: relative;
    aspect-ratio: 4 / 3;
    overflow: hidden;
    border-radius: var(--radius-md);
    background: var(--color-gray-surface);

    & > img {
      object-fit: cover;
    }
  }

  & > .obra__dados {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    & > .obra__titulo {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      font-weight: var(--weight-medium);
      letter-spacing: -0.015em;
      line-height: var(--leading-tight);
      color: var(--color-dark);
    }

    & > .obra__cotas {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-6);
      padding-top: var(--space-4);
      border-top: 1px solid var(--color-border);
    }
  }
`;

function separarMedida(medida: string, unidadePadrao: string) {
  const partes = medida.trim().match(/^([\d.,]+)\s*(.*)$/);

  if (!partes) return { valor: medida, unidade: unidadePadrao };

  return { valor: partes[1], unidade: partes[2] || unidadePadrao };
}

function useCarrosselNoMobile() {
  const [carrosselAtivo, setCarrosselAtivo] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA_CARROSSEL);
    const sincronizar = () => setCarrosselAtivo(consulta.matches);

    sincronizar();
    consulta.addEventListener("change", sincronizar);

    return () => consulta.removeEventListener("change", sincronizar);
  }, []);

  return carrosselAtivo;
}

function CardObra({ obra, destaque = false }: { obra: Obra; destaque?: boolean }) {
  const area = separarMedida(obra.metragem, "m²");
  const prazo = separarMedida(obra.prazo, "dias");

  return (
    <CardRoot className="obra" data-destaque={destaque}>
      {obra.imagem ? (
        <div className="obra__foto">
          <Image
            src={obra.imagem}
            alt={`${obra.titulo} — ${obra.sistema} em ${obra.regiao}, Distrito Federal`}
            fill
            sizes={TAMANHOS_FOTO_OBRA}
          />
        </div>
      ) : null}
      <div className="obra__dados">
        <h3 className="obra__titulo">{obra.titulo}</h3>
        <Etiqueta
          pares={[
            { rotulo: "TIPO", valor: obra.tipo },
            { rotulo: "SISTEMA", valor: obra.sistema },
            { rotulo: "REGIÃO", valor: obra.regiao },
          ]}
        />
        <div className="obra__cotas">
          <Cota valor={area.valor} unidade={area.unidade} rotulo="ÁREA EXECUTADA" />
          <Cota valor={prazo.valor} unidade={prazo.unidade} rotulo="PRAZO DE ENTREGA" />
        </div>
      </div>
    </CardRoot>
  );
}

export default function ObrasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carrosselAtivo = useCarrosselNoMobile();

  useReveal(sectionRef);

  const temObras = OBRAS.length > 0;
  const depoimentosExibidos = DEPOIMENTOS.slice(0, DEPOIMENTOS_EXIBIDOS);

  const etiquetaObras = CONTENT_GATES.obrasEntreguesDf
    ? [
        { rotulo: "OBRAS ENTREGUES", valor: String(CONTENT_GATES.obrasEntreguesDf) },
        { rotulo: "ATENDIMENTO", valor: "DISTRITO FEDERAL" },
      ]
    : [{ rotulo: "ATENDIMENTO", valor: "DISTRITO FEDERAL E ENTORNO" }];

  return (
    <Root id={SECTION_IDS.obras} ref={sectionRef}>
      <div className="container obras__wrapper">
        <div className="obras__abertura">
          <SnapLine variant="seam" trigger="scroll" />
          <SectionHeader
            titulo={
              temObras
                ? "Obras entregues no Distrito Federal."
                : "O que a Fast executa no Distrito Federal."
            }
            palavraMarcada={temObras ? "entregues" : "executa"}
            etiqueta={etiquetaObras}
            descricao={
              temObras
                ? "Cada obra com tipo, área, prazo, sistema e região. O dado vem junto da foto."
                : "Ainda não publicamos foto de obra no DF. Ela entra aqui com área, prazo, sistema e região conferidos. Até lá, fica o que já dá para verificar: o escopo que executamos e a área que atendemos."
            }
          />
        </div>

        {temObras ? (
          <div className="obras__mosaico" data-reveal>
            {carrosselAtivo ? (
              <Swiper
                className="obras__carrossel"
                modules={[A11y]}
                slidesPerView="auto"
                grabCursor
                a11y={{
                  containerMessage: "Obras entregues no Distrito Federal",
                  prevSlideMessage: "Obra anterior",
                  nextSlideMessage: "Próxima obra",
                  firstSlideMessage: "Primeira obra",
                  lastSlideMessage: "Última obra",
                }}
              >
                {OBRAS.map((obra) => (
                  <SwiperSlide key={obra.titulo}>
                    <CardObra obra={obra} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="obras__grade">
                {OBRAS.map((obra, indice) => (
                  <CardObra
                    key={obra.titulo}
                    obra={obra}
                    destaque={indice % 4 === 0 || indice % 4 === 3}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="obras__prova" data-reveal>
            <div className="obras__prova-texto">
              <p className="obras__prova-nota">
                Esta página não usa foto de banco de imagem nem obra de outra praça. A obra que
                aparecer aqui vai ser obra nossa, no DF, com área, prazo, sistema e região que o
                cliente pode conferir.
              </p>
              <div className="obras__prova-cotas">
                <Cota
                  valor={String(SISTEMAS.length)}
                  unidade="SISTEMAS"
                  rotulo="EXECUTADOS PELA FAST"
                />
                <Cota
                  valor={String(REGIOES_ATENDIDAS.length)}
                  unidade="REGIÕES"
                  rotulo="ATENDIDAS NO DF"
                />
              </div>
            </div>
            <div className="obras__prova-escopo">
              <h3 className="obras__prova-titulo">Sistemas que entram em obra</h3>
              <ul className="obras__prova-lista">
                {SISTEMAS.map((sistema) => (
                  <li key={sistema.slug} className="obras__prova-item">
                    <span className="obras__prova-nome">{sistema.nome}</span>
                    <span className="obras__prova-tag">{sistema.etiqueta[0].valor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {depoimentosExibidos.length > 0 ? (
          <div className="obras__depoimentos">
            <h3 className="obras__depoimentos-titulo">Quem contratou, e o que disse depois</h3>
            <ul className="obras__depoimentos-lista">
              {depoimentosExibidos.map((depoimento) => (
                <li key={depoimento.nome} className="depoimento" data-reveal>
                  <blockquote className="depoimento__texto">{depoimento.texto}</blockquote>
                  <p className="depoimento__autor">{depoimento.nome}</p>
                  <Etiqueta
                    pares={[
                      { rotulo: "OBRA", valor: depoimento.tipoObra },
                      { rotulo: "REGIÃO", valor: depoimento.regiao },
                    ]}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {LOGOS_CORPORATIVOS.length > 0 ? (
          <div className="obras__logos" data-reveal>
            <Etiqueta pares={[{ rotulo: "CLIENTES", valor: "CORPORATIVOS" }]} />
            <ul className="obras__logos-lista">
              {LOGOS_CORPORATIVOS.map((logo) => (
                <li key={logo.nome} className="obras__logo">
                  <Image
                    src={logo.arquivo}
                    alt={logo.nome}
                    width={LOGO_LARGURA}
                    height={LOGO_ALTURA}
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="obras__fecho" data-reveal>
          <p className="obras__fecho-texto">
            Visita técnica no seu endereço, com escopo, sistema e prazo por escrito antes de a obra
            começar.
          </p>
          <CtaButton id="obras-btn-orcamento" origin="obras">
            Pedir orçamento
          </CtaButton>
        </div>
      </div>
    </Root>
  );
}
