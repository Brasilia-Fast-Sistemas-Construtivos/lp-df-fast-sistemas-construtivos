"use client";

import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import Etiqueta from "@/components/ui/Etiqueta";
import SectionHeader from "@/components/ui/SectionHeader";
import { SISTEMAS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

type Sistema = (typeof SISTEMAS)[number];

const CONSULTA_CARROSSEL = "(max-width: 768px)";

const TIPO_DE_OBRA_POR_SISTEMA: Record<string, string> = {
  drywall: "reforma",
  "steel-frame": "construcao-nova",
  divisoria: "corporativo",
  "piso-vinilico": "comercial",
};

const MASCARA_MONTANTE_ACO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='64' viewBox='0 0 12 64'%3E%3Cpath d='M5 0h2v14H5z'/%3E%3Cpath d='M5 50h2v14H5z'/%3E%3Cpath fill-rule='evenodd' d='M6 15a3.6 3.6 0 0 1 3.6 3.6v26.8a3.6 3.6 0 0 1-7.2 0V18.6A3.6 3.6 0 0 1 6 15zm0 1.3a2.3 2.3 0 0 0-2.3 2.3v26.8a2.3 2.3 0 0 0 4.6 0V18.6A2.3 2.3 0 0 0 6 16.3z'/%3E%3C/svg%3E\") left top / var(--space-3) var(--space-8) repeat-y";

const MASCARA_MONTANTE_FIO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='64' viewBox='0 0 12 64'%3E%3Cpath d='M6 16.3a2.3 2.3 0 0 0-2.3 2.3v26.8a2.3 2.3 0 0 0 2.3 2.3v-0.9a1.4 1.4 0 0 1-1.4-1.4V18.6a1.4 1.4 0 0 1 1.4-1.4z'/%3E%3C/svg%3E\") left top / var(--space-3) var(--space-8) repeat-y";

const Card = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  overflow: hidden;
  padding: var(--space-6) var(--space-5) var(--space-5) var(--space-7);
  background: var(--color-surface);
  border-radius: var(--radius-md);
  transition: transform var(--dur-normal) var(--ease-standard);

  @media (max-width: 768px) {
    scroll-snap-align: start;
    padding: var(--space-5) var(--space-4) var(--space-5) var(--space-6);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(calc(var(--space-1) * -1));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }

  & > .sistema__montante {
    position: absolute;
    top: 0;
    bottom: 0;
    left: var(--space-4);
    width: var(--space-3);
    pointer-events: none;

    @media (max-width: 768px) {
      left: var(--space-3);
    }

    & > .sistema__montante-aco {
      position: absolute;
      inset: 0;
      display: block;
      background: var(--color-galvanized);
      mask: ${MASCARA_MONTANTE_ACO};
      -webkit-mask: ${MASCARA_MONTANTE_ACO};
    }

    & > .sistema__montante-fio {
      position: absolute;
      inset: 0;
      display: block;
      background: var(--color-fg);
      mask: ${MASCARA_MONTANTE_FIO};
      -webkit-mask: ${MASCARA_MONTANTE_FIO};
    }
  }

  & > .sistema__problema {
    margin-bottom: var(--space-2);
    font-family: var(--font-display);
    font-size: var(--text-xl);
    font-weight: var(--weight-medium);
    letter-spacing: -0.01em;
    line-height: var(--leading-snug);
    color: var(--color-dark);
    text-wrap: balance;
  }

  & > .sistema__nome {
    font-family: var(--font-body);
    font-size: var(--text-md);
    font-weight: var(--weight-medium);
    letter-spacing: 0.01em;
    line-height: 1;
    color: var(--color-dark);
  }

  & > .sistema__descricao {
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: var(--color-muted);
  }

  & > .sistema__rodape {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-4);
    margin-top: auto;
    padding-top: var(--space-5);
  }
`;

const Root = styled.section`
  background: var(--color-gray-surface);
  padding-block: var(--section-gap);

  & > .container {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);

    @media (max-width: 768px) {
      gap: var(--space-6);
    }

    & > .sistemas__grade {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: var(--space-5);

      @media (max-width: 1024px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      @media (max-width: 768px) {
        grid-template-columns: none;
        grid-auto-flow: column;
        grid-auto-columns: 86%;
        gap: var(--space-4);
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        scroll-padding-inline: var(--container-pad);
        margin-inline: calc(var(--container-pad) * -1);
        padding-inline: var(--container-pad);
      }
    }

    & > .sistemas__carrossel {
      --swiper-pagination-color: var(--color-dark);
      --swiper-pagination-bullet-inactive-color: var(--color-muted);
      --swiper-pagination-bullet-inactive-opacity: 1;
      --swiper-pagination-bullet-size: var(--space-2);
      --swiper-pagination-bullet-horizontal-gap: var(--space-1);
      --swiper-pagination-bottom: 0;
      width: 100%;
      padding-bottom: var(--space-6);
      margin-inline: calc(var(--container-pad) * -1);
      padding-inline: var(--container-pad);

      & .swiper-slide {
        display: flex;
        height: auto;
        padding-right: var(--space-4);

        & > .sistema {
          width: 100%;
        }
      }

      & .swiper-pagination-bullet {
        transition: width var(--dur-normal) var(--ease-standard);

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }

      & .swiper-pagination-bullet-active {
        width: var(--space-5);
        border-radius: var(--radius-all);
      }

      & .swiper-pagination-bullet:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 3px;
      }
    }

    & > .sistemas__fecho {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-5);

      @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
      }

      & > .sistemas__fecho-texto {
        max-width: 46ch;
        font-size: var(--text-lg);
        line-height: var(--leading-normal);
        color: var(--color-fg);
      }

      & > button {
        @media (max-width: 768px) {
          width: 100%;
        }
      }
    }
  }
`;

function CardSistema({ sistema, comReveal }: { sistema: Sistema; comReveal: boolean }) {
  const tipoObra = TIPO_DE_OBRA_POR_SISTEMA[sistema.slug];

  return (
    <Card className="sistema" data-reveal={comReveal ? "" : undefined}>
      <span className="sistema__montante" aria-hidden="true">
        <i className="sistema__montante-aco" />
        <i className="sistema__montante-fio" />
      </span>
      <p className="sistema__problema">{sistema.problema}</p>
      <h3 className="sistema__nome">{sistema.nome}</h3>
      <p className="sistema__descricao">{sistema.descricao}</p>
      <div className="sistema__rodape">
        <Etiqueta pares={sistema.etiqueta} />
        <CtaButton
          id={`sistemas-btn-${sistema.slug}`}
          origin={`sistemas-${sistema.slug}`}
          variant="outline"
          preFill={tipoObra ? { tipoObra } : undefined}
        >
          Pedir orçamento
          <span className="sr-only"> de {sistema.nome}</span>
        </CtaButton>
      </div>
    </Card>
  );
}

export default function SistemasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isCarrossel, setIsCarrossel] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA_CARROSSEL);
    const sincronizar = () => setIsCarrossel(consulta.matches);

    sincronizar();
    consulta.addEventListener("change", sincronizar);

    return () => consulta.removeEventListener("change", sincronizar);
  }, []);

  useReveal(sectionRef, {
    selector: isCarrossel ? "[data-reveal-inativo]" : "[data-reveal]",
    stagger: 0.04,
  });

  const escopoDeSistemas = SISTEMAS.map((sistema) => sistema.nome).join(", ");

  return (
    <Root id={SECTION_IDS.sistemas} ref={sectionRef}>
      <div className="container">
        <SectionHeader
          titulo="Escolha pelo problema, não pelo catálogo."
          palavraMarcada="problema"
          etiqueta={[
            { rotulo: "ESCOPO", valor: `${SISTEMAS.length} SISTEMAS` },
            { rotulo: "ATENDIMENTO", valor: "DISTRITO FEDERAL" },
          ]}
          descricao={`${escopoDeSistemas}. Material e execução no mesmo contrato.`}
        />

        {isCarrossel ? (
          <Swiper
            className="sistemas__carrossel"
            modules={[Pagination, A11y]}
            slidesPerView={1.15}
            spaceBetween={0}
            pagination={{ clickable: true }}
            a11y={{
              containerMessage: "Sistemas construtivos da Fast",
              prevSlideMessage: "Sistema anterior",
              nextSlideMessage: "Próximo sistema",
              paginationBulletMessage: "Ir para o sistema {{index}}",
            }}
          >
            {SISTEMAS.map((sistema) => (
              <SwiperSlide key={sistema.slug}>
                <CardSistema sistema={sistema} comReveal={false} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="sistemas__grade">
            {SISTEMAS.map((sistema) => (
              <CardSistema key={sistema.slug} sistema={sistema} comReveal />
            ))}
          </div>
        )}

        <div className="sistemas__fecho">
          <p className="sistemas__fecho-texto">
            Não sabe qual sistema resolve o seu caso? A visita técnica mede o local e define.
          </p>
          <CtaButton id="sistemas-btn-orcamento" origin="sistemas">
            Pedir orçamento
          </CtaButton>
        </div>
      </div>
    </Root>
  );
}
