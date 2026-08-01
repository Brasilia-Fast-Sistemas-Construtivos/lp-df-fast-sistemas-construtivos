"use client";

import styled from "@emotion/styled";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import SectionTexts from "@/components/ui/SectionTexts";
import { OBRAS_GALERIA } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

import "swiper/css";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding: var(--space-7) 0;

  @media (max-width: 768px) {
    gap: var(--space-5);
    padding: var(--space-5) 0;
  }

  & > .obras__topo {
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

  & .obra {
    position: relative;
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: var(--radius-md);
    overflow: hidden;
    isolation: isolate;

    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transition: transform var(--dur-slow) var(--ease-standard);
    }

    &:hover > img {
      transform: scale(1.04);
    }

    @media (prefers-reduced-motion: reduce) {
      & > img {
        transition: none;
      }

      &:hover > img {
        transform: none;
      }
    }

    & > .obra__legenda {
      position: absolute;
      inset: auto 0 0 0;
      padding: var(--space-5);
      background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
      z-index: 2;

      & > .obra__titulo {
        font-size: var(--text-lg);
        line-height: 1.1;
        font-weight: var(--weight-medium);
        letter-spacing: -0.01em;
        color: var(--color-bg);
        font-family: var(--font-display);
      }

      & > .obra__tipo {
        font-size: var(--text-sm);
        color: var(--color-muted-white);
        font-family: var(--font-display);
      }
    }
  }

  & > .controls {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
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

export default function ObrasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  useReveal(sectionRef);

  return (
    <Section id={SECTION_IDS.obras} ref={sectionRef} aria-label="Obras executadas">
      <div className="obras__topo" data-reveal>
        <SectionTexts
          titulo="O material da Fast em obra."
          descricao="Projetos executados com os sistemas e produtos que você encontra aqui — do residencial ao corporativo."
        />
        <CtaButton id="obras-btn-orcamento" origin="obras">
          Pedir orçamento
        </CtaButton>
      </div>

      <Carousel role="region" aria-label="Carrossel de obras" data-reveal>
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
            prevSlideMessage: "Obra anterior",
            nextSlideMessage: "Próxima obra",
            firstSlideMessage: "Primeira obra",
            lastSlideMessage: "Última obra",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            700: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {OBRAS_GALERIA.map((obra) => (
            <SwiperSlide key={obra.imagem} aria-label={obra.titulo}>
              <figure className="obra">
                <Image
                  src={obra.imagem}
                  alt={obra.titulo}
                  width={720}
                  height={540}
                  sizes="(max-width: 700px) 92vw, (max-width: 1024px) 46vw, 31vw"
                  loading="lazy"
                />
                <figcaption className="obra__legenda">
                  <span className="obra__titulo">{obra.titulo}</span>
                  <span className="obra__tipo">
                    {obra.tipo} · {obra.sistema}
                  </span>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="controls" aria-label="Controles do carrossel">
          <button
            id="obras-btn-anterior"
            className="controls__prev"
            type="button"
            aria-label="Obra anterior"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ArrowLeftIcon aria-hidden="true" />
          </button>
          <button
            id="obras-btn-proximo"
            className="controls__next"
            type="button"
            aria-label="Próxima obra"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ArrowRightIcon aria-hidden="true" />
          </button>
        </div>
      </Carousel>
    </Section>
  );
}
