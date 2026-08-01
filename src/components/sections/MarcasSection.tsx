"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";
import { A11y, Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useReveal } from "@/components/motion/useReveal";
import SectionTexts from "@/components/ui/SectionTexts";
import { CLIENTES, MARCAS } from "@/data/content";

import "swiper/css";
import "swiper/css/free-mode";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-7);
  padding: var(--space-7) 0;

  @media (max-width: 768px) {
    gap: var(--space-5);
    padding: var(--space-5) 0;
  }
`;

const Carousel = styled.div`
  width: 100%;

  & .swiper {
    width: 100%;

    & .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);
      height: 180px;
      background-color: var(--color-bg);

      @media (max-width: 768px) {
        height: 120px;
      }

      & > .logo {
        width: 120px;
        height: 120px;
        object-fit: contain;
        object-position: center;
        filter: grayscale(1);
        opacity: 0.75;
        transition: filter var(--dur-normal) var(--ease-standard),
          opacity var(--dur-normal) var(--ease-standard);

        @media (max-width: 768px) {
          width: 72px;
          height: 72px;
        }

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }

      &:hover > .logo {
        filter: grayscale(0);
        opacity: 1;
      }
    }
  }
`;

const LOGOS = [
  ...MARCAS.map((marca) => ({ ...marca, pasta: "marcas" })),
  ...CLIENTES.map((cliente) => ({ ...cliente, pasta: "clientes" })),
];

export default function MarcasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  if (LOGOS.length === 0) return null;

  return (
    <Section ref={sectionRef} aria-label="Marcas e clientes">
      <div data-reveal>
        <SectionTexts
          titulo="As marcas que você leva da loja."
          descricao="Vendemos os líderes do sistema construtivo a seco e já atendemos obras de grande porte com eles."
          centrado
        />
      </div>

      <Carousel role="region" aria-label="Carrossel de marcas e clientes" data-reveal>
        <Swiper
          modules={[Autoplay, FreeMode, A11y]}
          spaceBetween={8}
          slidesPerView={2}
          freeMode
          loop
          autoplay={{ delay: 2200, disableOnInteraction: false }}
          a11y={{
            enabled: true,
            prevSlideMessage: "Marca anterior",
            nextSlideMessage: "Próxima marca",
          }}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {LOGOS.map((logo) => (
            <SwiperSlide key={logo.arquivo} aria-label={logo.nome}>
              <Image
                className="logo"
                src={`/${logo.pasta}/${logo.arquivo}`}
                alt={logo.nome}
                width={120}
                height={120}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Carousel>
    </Section>
  );
}
