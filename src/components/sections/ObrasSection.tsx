"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";
import { A11y } from "swiper/modules";
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

  & > .obras__grade {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--space-2);

    @media (max-width: 900px) {
      display: none;
    }

    & > .obra {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      isolation: isolate;

      &:nth-of-type(1) {
        grid-column: span 7;
        aspect-ratio: 16 / 10;
      }

      &:nth-of-type(2) {
        grid-column: span 5;
        aspect-ratio: 16 / 10;
      }

      &:nth-of-type(3),
      &:nth-of-type(4),
      &:nth-of-type(5) {
        grid-column: span 4;
        aspect-ratio: 4 / 3;
      }

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      & > .obra__legenda {
        position: absolute;
        inset: auto 0 0 0;
        padding: var(--space-5);
        background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
        display: flex;
        flex-direction: column;
        gap: var(--space-1);

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
  }

  & > .obras__carrossel {
    display: none;

    @media (max-width: 900px) {
      display: block;
    }

    & .swiper-slide {
      width: 86%;
    }

    & .obra {
      position: relative;
      border-radius: var(--radius-md);
      overflow: hidden;
      aspect-ratio: 4 / 3;

      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      & > .obra__legenda {
        position: absolute;
        inset: auto 0 0 0;
        padding: var(--space-4);
        background: linear-gradient(to top, rgba(0, 0, 0, 0.72), transparent);
        display: flex;
        flex-direction: column;
        gap: var(--space-1);

        & > .obra__titulo {
          font-size: var(--text-md);
          font-weight: var(--weight-medium);
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
  }

  & > .obras__fecho {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--space-5);

    & > .obras__nota {
      font-size: var(--text-md);
      line-height: 1.3;
      color: var(--color-muted);
      font-family: var(--font-display);
      max-width: 52ch;
    }
  }
`;

export default function ObrasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <Section id={SECTION_IDS.obras} ref={sectionRef} aria-label="Obras executadas">
      <SectionTexts
        titulo="O que a Fast entrega, do projeto à pintura."
        descricao="Obras executadas com os sistemas construtivos da Fast — a mesma engenharia que atende o país, com equipe dedicada a Brasília."
      />

      <div className="obras__grade" data-reveal>
        {OBRAS_GALERIA.map((obra) => (
          <figure key={obra.imagem} className="obra">
            <Image
              src={obra.imagem}
              alt={obra.titulo}
              width={900}
              height={640}
              sizes="(max-width: 900px) 86vw, 45vw"
              loading="lazy"
            />
            <figcaption className="obra__legenda">
              <span className="obra__titulo">{obra.titulo}</span>
              <span className="obra__tipo">
                {obra.tipo} · {obra.sistema}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="obras__carrossel" data-reveal>
        <Swiper
          modules={[A11y]}
          slidesPerView="auto"
          spaceBetween={8}
          grabCursor
          a11y={{
            enabled: true,
            prevSlideMessage: "Obra anterior",
            nextSlideMessage: "Próxima obra",
          }}
        >
          {OBRAS_GALERIA.map((obra) => (
            <SwiperSlide key={obra.imagem}>
              <figure className="obra">
                <Image
                  src={obra.imagem}
                  alt={obra.titulo}
                  width={720}
                  height={540}
                  sizes="86vw"
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
      </div>

      <div className="obras__fecho">
        <p className="obras__nota">
          Quer ver como fica no seu projeto? Marcamos a visita técnica e levamos as amostras dos
          sistemas até você.
        </p>
        <CtaButton id="obras-btn-orcamento" origin="obras">
          Pedir orçamento
        </CtaButton>
      </div>
    </Section>
  );
}
