"use client";

import styled from "@emotion/styled";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CtaButton from "@/components/forms/CtaButton";
import CardService from "@/components/ui/CardService";
import SectionHeader from "@/components/ui/SectionHeader";
import { SISTEMAS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

import "swiper/css";

const Section = styled.section`
  position: relative;
  isolation: isolate;
  padding-block: var(--section-gap);

  & > .bg {
    position: absolute;
    inset: 0;
    left: 50%;
    width: 100vw;
    transform: translateX(-50%);
    background-color: var(--color-gray-surface);
    z-index: -1;
  }

  & > .sistemas__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);

    & > .sistemas__topo {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: var(--space-5);

      @media (max-width: 900px) {
        flex-direction: column;
        align-items: flex-start;
      }
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
    & > .controls__prev,
    & > .controls__next {
      position: absolute;
      top: 130px;
      transform: translateY(-50%);
      z-index: var(--z-sticky);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--radius-all);
      background-color: var(--color-bg);
      border: 4px solid var(--color-gray-surface);
      color: var(--color-dark);
      cursor: pointer;
      transition: color var(--dur-fast) var(--ease-standard);

      &:hover {
        color: var(--color-brand);
      }

      &:focus-visible {
        outline: 2px solid var(--color-brand);
        outline-offset: 2px;
      }

      & > svg {
        width: 22px;
        height: 22px;
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }

    & > .controls__prev {
      left: calc(var(--space-4) * -1);

      @media (max-width: 1000px) {
        left: 0;
      }
    }

    & > .controls__next {
      right: calc(var(--space-4) * -1);

      @media (max-width: 1000px) {
        right: 0;
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

      <div className="container sistemas__inner">
        <div className="sistemas__topo">
          <SectionHeader
            titulo="Material e execução, no mesmo contrato."
            palavraMarcada="execução"
            etiqueta={[{ rotulo: "SOLUÇÕES", valor: `${SISTEMAS.length} SISTEMAS` }]}
            descricao="Você contrata o material e a obra com um único responsável. Sem terceirizar, sem empurrar problema."
          />
          <CtaButton id="sistemas-btn-orcamento" origin="sistemas">
            Pedir orçamento
          </CtaButton>
        </div>

        <Carousel role="region" aria-label="Carrossel de sistemas">
          <Swiper
            modules={[Autoplay, A11y]}
            spaceBetween={16}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            autoplay={{ delay: 6000, disableOnInteraction: true }}
            a11y={{
              enabled: true,
              prevSlideMessage: "Sistema anterior",
              nextSlideMessage: "Próximo sistema",
              firstSlideMessage: "Primeiro sistema",
              lastSlideMessage: "Último sistema",
            }}
            breakpoints={{
              0: { slidesPerView: 1.1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {SISTEMAS.map((sistema, index) => (
              <SwiperSlide key={sistema.slug}>
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

          <div className="controls">
            <button
              id="sistemas-btn-anterior"
              className="controls__prev"
              type="button"
              aria-label="Sistema anterior"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <CaretLeftIcon aria-hidden="true" />
            </button>
            <button
              id="sistemas-btn-proximo"
              className="controls__next"
              type="button"
              aria-label="Próximo sistema"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <CaretRightIcon aria-hidden="true" />
            </button>
          </div>
        </Carousel>
      </div>
    </Section>
  );
}
