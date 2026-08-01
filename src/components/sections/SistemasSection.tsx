"use client";

import styled from "@emotion/styled";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CtaButton from "@/components/forms/CtaButton";
import CardService from "@/components/ui/CardService";
import SectionTexts from "@/components/ui/SectionTexts";
import { SISTEMAS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

import "swiper/css";

const Section = styled.section`
  width: 100%;
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding: var(--space-7) 0;

  @media (max-width: 768px) {
    gap: var(--space-5);
    padding: var(--space-5) 0;
  }

  & > .bg {
    position: absolute;
    inset: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    background-color: var(--color-gray-surface);
    z-index: -1;
  }

  & > .sistemas__topo {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-5);

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const Carousel = styled.div`
  width: 100%;
  position: relative;

  & > .swiper {
    width: 100%;
  }

  & > .controls {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 130px;

    @media (max-width: 768px) {
      top: 105px;
    }
    left: 0;
    right: 0;
    z-index: var(--z-sticky);
    pointer-events: none;

    & > .controls__prev,
    & > .controls__next {
      pointer-events: auto;
      background-color: var(--color-bg);
      border-radius: var(--radius-all);
      border: 4px solid var(--color-gray-surface);
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--color-dark);
      will-change: transform;
      transition: transform var(--dur-normal) var(--ease-standard),
        box-shadow var(--dur-normal) var(--ease-standard);

      &:hover {
        transform: scale(1.08);
        box-shadow: var(--shadow-md);
      }

      &:active {
        transform: scale(0.95);
      }

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      & > svg {
        width: 24px;
        height: 24px;
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;

        &:hover,
        &:active {
          transform: none;
        }
      }
    }

    & > .controls__prev {
      transform: translateX(-50%);

      @media (max-width: 768px) {
        transform: translateX(-25%);
      }
    }

    & > .controls__next {
      transform: translateX(50%);

      @media (max-width: 768px) {
        transform: translateX(25%);
      }
    }
  }
`;

const IMAGENS: Record<string, string> = {
  drywall: "/sistemas/drywall.webp",
  "steel-frame": "/sistemas/steel-frame.webp",
  forro: "/sistemas/forro.webp",
  divisoria: "/sistemas/divisoria.webp",
  "piso-vinilico": "/sistemas/acustica.webp",
  revestimento: "/sistemas/revestimento.webp",
};

const PRE_FILL: Record<string, string> = {
  drywall: "reforma",
  "steel-frame": "construcao-nova",
  divisoria: "corporativo",
  "piso-vinilico": "comercial",
};

export default function SistemasSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Section id={SECTION_IDS.sistemas} aria-label="Sistemas construtivos">
      <div className="bg" aria-hidden="true" />

      <div className="sistemas__topo">
        <SectionTexts
          titulo="Tudo para construção a seco."
          descricao="Compre só o material ou contrate com instalação — do perfil à placa, com um único fornecedor."
        />
        <CtaButton id="sistemas-btn-orcamento" origin="sistemas">
          Pedir orçamento
        </CtaButton>
      </div>

      <Carousel role="region" aria-label="Carrossel de sistemas">
        <Swiper
          modules={[Autoplay, A11y]}
          spaceBetween={8}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          a11y={{
            enabled: true,
            prevSlideMessage: "Sistema anterior",
            nextSlideMessage: "Próximo sistema",
            firstSlideMessage: "Primeiro sistema",
            lastSlideMessage: "Último sistema",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            1024: { slidesPerView: 3 },
          }}
        >
          {SISTEMAS.map((sistema, index) => (
            <SwiperSlide key={sistema.slug} aria-label={`Sistema: ${sistema.nome}`}>
              <CardService
                id={`sistemas-btn-${sistema.slug}`}
                origin={`sistemas-${sistema.slug}`}
                image={IMAGENS[sistema.slug]}
                title={sistema.nome}
                description={sistema.descricao}
                priority={index === 0}
                preFill={
                  PRE_FILL[sistema.slug] ? { tipoObra: PRE_FILL[sistema.slug] } : undefined
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="controls" aria-label="Controles do carrossel">
          <button
            id="sistemas-btn-anterior"
            className="controls__prev"
            type="button"
            aria-label="Sistema anterior"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeftIcon aria-hidden="true" />
          </button>
          <button
            id="sistemas-btn-proximo"
            className="controls__next"
            type="button"
            aria-label="Próximo sistema"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRightIcon aria-hidden="true" />
          </button>
        </div>
      </Carousel>
    </Section>
  );
}
