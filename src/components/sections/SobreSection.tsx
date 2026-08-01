"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useReveal } from "@/components/motion/useReveal";
import SectionTexts from "@/components/ui/SectionTexts";
import { ESTATISTICAS, SOBRE } from "@/data/content";

import "swiper/css";

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-7);
  padding: var(--space-7) 0;

  @media (max-width: 768px) {
    gap: var(--space-5);
    padding: var(--space-5) 0;
  }

  & > .sobre__imagem {
    width: 100%;
    height: 380px;
    border-radius: var(--radius-md);
    overflow: hidden;

    @media (max-width: 768px) {
      height: 280px;
    }

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

const Carousel = styled.div`
  width: 100%;

  & .swiper {
    width: 100%;

    & .swiper-slide {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: var(--space-3);

      & > .number {
        font-size: var(--text-3xl);
        line-height: 1;
        font-weight: var(--weight-regular);
        letter-spacing: -0.03em;
        font-family: var(--font-display);
        color: var(--color-dark);

        & > .number__mais {
          color: var(--color-brand);
        }
      }

      & > .description {
        font-size: var(--text-lg);
        line-height: 1.2;
        font-weight: var(--weight-regular);
        letter-spacing: -0.01em;
        color: var(--color-muted);
        font-family: var(--font-display);
      }
    }
  }
`;

export default function SobreSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <Section ref={sectionRef} aria-label="Sobre a Fast Sistemas Construtivos">
      <div data-reveal>
        <SectionTexts titulo={SOBRE.titulo} descricao={SOBRE.descricao} />
      </div>

      <div className="sobre__imagem" data-reveal>
        <Image
          src={SOBRE.imagem}
          alt={SOBRE.imagemAlt}
          width={1200}
          height={380}
          sizes="(max-width: 1420px) 92vw, 1372px"
          loading="lazy"
        />
      </div>

      <Carousel role="region" aria-label="Números da rede Fast" data-reveal>
        <Swiper
          modules={[Autoplay, A11y]}
          spaceBetween={16}
          slidesPerView={2}
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          a11y={{
            enabled: true,
            prevSlideMessage: "Estatística anterior",
            nextSlideMessage: "Próxima estatística",
          }}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 48 },
          }}
        >
          {ESTATISTICAS.map((item) => (
            <SwiperSlide key={item.numero} aria-label={`${item.numero} ${item.descricao}`}>
              <p className="number" aria-hidden="true">
                {item.numero.startsWith("+") ? (
                  <>
                    <span className="number__mais">+</span>
                    {item.numero.slice(1)}
                  </>
                ) : (
                  item.numero
                )}
              </p>
              <p className="description">{item.descricao}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </Carousel>
    </Section>
  );
}
