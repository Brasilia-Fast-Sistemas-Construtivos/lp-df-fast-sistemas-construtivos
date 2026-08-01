"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { useRef } from "react";
import { A11y, Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CtaButton from "@/components/forms/CtaButton";
import { useReveal } from "@/components/motion/useReveal";
import SectionTexts from "@/components/ui/SectionTexts";
import { PRODUTOS } from "@/data/content";
import { SECTION_IDS } from "@/data/navigation";

import "swiper/css";
import "swiper/css/free-mode";

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

  & > .produtos__topo {
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

const Strip = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
    pointer-events: none;

    @media (max-width: 768px) {
      width: 60px;
    }
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, var(--color-bg) 0%, transparent 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, var(--color-bg) 0%, transparent 100%);
  }

  & .swiper-wrapper {
    transition-timing-function: linear;
  }

  & .produto {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    padding: var(--space-5);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background-color: var(--color-bg);
    height: 220px;

    @media (max-width: 768px) {
      height: 180px;
      padding: var(--space-4);
      gap: var(--space-3);
    }
    transition: transform var(--dur-normal) var(--ease-standard),
      border-color var(--dur-normal) var(--ease-standard);

    &:hover {
      transform: translateY(-4px);
      border-color: var(--color-muted-white);
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;

      &:hover {
        transform: none;
      }
    }

    & > .produto__imagem {
      width: 120px;
      height: 120px;
      object-fit: contain;
      object-position: center;

      @media (max-width: 768px) {
        width: 88px;
        height: 88px;
      }
    }

    & > .produto__nome {
      font-size: var(--text-sm);
      font-weight: var(--weight-regular);
      letter-spacing: -0.01em;
      color: var(--color-fg);
      font-family: var(--font-display);
      text-align: center;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: var(--text-xs);
      }
    }
  }
`;

export default function ProdutosSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <Section id={SECTION_IDS.produtos} ref={sectionRef} aria-label="Produtos">
      <div className="produtos__topo" data-reveal>
        <SectionTexts
          titulo="O material sai daqui, direto para a sua obra."
          descricao="Placas, perfis, forros, lãs, massas e acessórios das marcas líderes, na quantidade do seu projeto. Sem pedido mínimo de obra."
        />
        <CtaButton id="produtos-btn-orcamento" origin="produtos">
          Pedir orçamento
        </CtaButton>
      </div>

      <Strip data-reveal role="region" aria-label="Vitrine de produtos">
        <Swiper
          modules={[Autoplay, FreeMode, A11y]}
          spaceBetween={8}
          slidesPerView={2}
          loop
          freeMode
          speed={4000}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
          a11y={{
            enabled: true,
            prevSlideMessage: "Produto anterior",
            nextSlideMessage: "Próximo produto",
          }}
          breakpoints={{
            0: { slidesPerView: 2.3 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {PRODUTOS.map((produto) => (
            <SwiperSlide key={produto.arquivo} aria-label={produto.nome}>
              <div className="produto">
                <Image
                  className="produto__imagem"
                  src={`/produtos/${produto.arquivo}`}
                  alt={produto.nome}
                  width={120}
                  height={120}
                  loading="lazy"
                />
                <p className="produto__nome">{produto.nome}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Strip>
    </Section>
  );
}
