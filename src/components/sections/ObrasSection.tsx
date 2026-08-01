"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import Etiqueta from "@/components/ui/Etiqueta";
import SectionHeader from "@/components/ui/SectionHeader";
import SnapLine from "@/components/ui/SnapLine";
import { DEPOIMENTOS, OBRAS_GALERIA } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

import "swiper/css";

const Root = styled.section`
  padding-block: var(--section-gap);

  & > .obras__inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);

    & > .obras__abertura {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    & > .obras__galeria {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: var(--space-4);

      @media (max-width: 900px) {
        display: block;
      }

      & > .obras__item {
        position: relative;
        border-radius: var(--radius-md);
        overflow: hidden;
        isolation: isolate;

        &:nth-of-type(1) {
          grid-column: span 7;
          aspect-ratio: 16 / 11;
        }

        &:nth-of-type(2) {
          grid-column: span 5;
          aspect-ratio: 16 / 11;
        }

        &:nth-of-type(3),
        &:nth-of-type(4),
        &:nth-of-type(5) {
          grid-column: span 4;
          aspect-ratio: 4 / 3;
        }

        & > .obras__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform var(--dur-slow) var(--ease-standard);
        }

        &:hover > .obras__img {
          transform: scale(1.03);
        }

        & > .obras__legenda {
          position: absolute;
          inset: auto 0 0 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-5);
          background: linear-gradient(to top, rgba(5, 5, 5, 0.82), transparent);

          & > .obras__legenda-titulo {
            font-family: var(--font-display);
            font-size: var(--text-lg);
            font-weight: var(--weight-medium);
            color: var(--color-bg);
            letter-spacing: -0.01em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          & > .obras__img {
            transition: none;
          }

          &:hover > .obras__img {
            transform: none;
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
        font-size: var(--text-sm);
        color: var(--color-muted);
        max-width: 52ch;
      }
    }
  }
`;

const Carrossel = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: block;
  }

  & .swiper-slide {
    width: 86%;
  }

  & .obras__slide {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    aspect-ratio: 4 / 3;

    & > .obras__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & > .obras__legenda {
      position: absolute;
      inset: auto 0 0 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding: var(--space-4);
      background: linear-gradient(to top, rgba(5, 5, 5, 0.82), transparent);

      & > .obras__legenda-titulo {
        font-family: var(--font-display);
        font-size: var(--text-md);
        font-weight: var(--weight-medium);
        color: var(--color-bg);
      }
    }
  }
`;

const GradeDesktop = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

export default function ObrasSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <Root id={SECTION_IDS.obras} ref={sectionRef}>
      <div className="container obras__inner">
        <div className="obras__abertura" data-reveal>
          <SnapLine variant="seam" trigger="scroll" />
          <SectionHeader
            titulo="O que a Fast entrega, do projeto à pintura."
            palavraMarcada="entrega"
            etiqueta={[{ rotulo: "ATENDIMENTO", valor: "DISTRITO FEDERAL E ENTORNO" }]}
            descricao="Obras executadas com os sistemas construtivos da Fast. A mesma engenharia que atende o país, com equipe atendendo Brasília."
          />
        </div>

        <GradeDesktop data-reveal>
          <div className="obras__galeria">
            {OBRAS_GALERIA.map((obra) => (
              <figure key={obra.imagem} className="obras__item">
                <Image
                  className="obras__img"
                  src={obra.imagem}
                  alt={obra.titulo}
                  width={900}
                  height={640}
                  sizes="(max-width: 900px) 90vw, 45vw"
                />
                <figcaption className="obras__legenda">
                  <span className="obras__legenda-titulo">{obra.titulo}</span>
                  <Etiqueta
                    pares={[{ rotulo: obra.tipo.toUpperCase(), valor: obra.sistema.toUpperCase() }]}
                    onDark
                  />
                </figcaption>
              </figure>
            ))}
          </div>
        </GradeDesktop>

        <Carrossel data-reveal>
          <Swiper
            modules={[A11y]}
            slidesPerView="auto"
            spaceBetween={12}
            grabCursor
            a11y={{
              enabled: true,
              prevSlideMessage: "Obra anterior",
              nextSlideMessage: "Próxima obra",
            }}
          >
            {OBRAS_GALERIA.map((obra) => (
              <SwiperSlide key={obra.imagem}>
                <figure className="obras__slide">
                  <Image
                    className="obras__img"
                    src={obra.imagem}
                    alt={obra.titulo}
                    width={720}
                    height={540}
                    sizes="86vw"
                  />
                  <figcaption className="obras__legenda">
                    <span className="obras__legenda-titulo">{obra.titulo}</span>
                    <Etiqueta
                      pares={[
                        { rotulo: obra.tipo.toUpperCase(), valor: obra.sistema.toUpperCase() },
                      ]}
                      onDark
                    />
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </Carrossel>

        {DEPOIMENTOS.length > 0 ? (
          <div className="obras__depoimentos" data-reveal>
            {DEPOIMENTOS.slice(0, 3).map((depoimento) => (
              <blockquote key={depoimento.nome}>
                <p>{depoimento.texto}</p>
                <cite>
                  {depoimento.nome} · {depoimento.tipoObra} · {depoimento.regiao}
                </cite>
              </blockquote>
            ))}
          </div>
        ) : null}

        <div className="obras__fecho" data-reveal>
          <p className="obras__nota">
            Quer ver como fica no seu projeto? Marcamos a visita técnica e levamos as amostras dos
            sistemas até você.
          </p>
          <CtaButton id="obras-btn-orcamento" origin="obras">
            Pedir orçamento
          </CtaButton>
        </div>
      </div>
    </Root>
  );
}
