"use client";

import styled from "@emotion/styled";
import Image from "next/image";

import CtaButton from "@/components/forms/CtaButton";
import { BRAND_ASSETS } from "@/data/site";
import type { PreFill } from "@/components/forms/FormModalProvider";

const Card = styled.article`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  gap: var(--space-2);
  position: relative;
  transition: transform var(--dur-normal) var(--ease-standard);

  &:hover {
    transform: translateY(-4px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }

  @keyframes cardImageShine {
    0% {
      transform: translateX(-140%) skewX(-18deg);
      opacity: 0;
    }
    30% {
      opacity: 0;
    }
    40% {
      opacity: 0.85;
    }
    60% {
      opacity: 0.85;
    }
    70% {
      opacity: 0;
    }
    100% {
      transform: translateX(260%) skewX(-18deg);
      opacity: 0;
    }
  }

  & > .card__image {
    width: 100%;
    height: 260px;
    border-radius: var(--radius-md);
    overflow: hidden;
    position: relative;
    isolation: isolate;

    @media (max-width: 768px) {
      height: 210px;
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(
        110deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 45%,
        rgba(255, 255, 255, 0.18) 50%,
        rgba(255, 255, 255, 0.1) 55%,
        transparent 100%
      );
      width: 40%;
      left: -60%;
      pointer-events: none;
      opacity: 0;
      will-change: transform, opacity;
      animation: cardImageShine 6.5s ease-in-out infinite;

      @media (prefers-reduced-motion: reduce) {
        animation: none;
        opacity: 0;
      }
    }

    & > .card__image-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  & > .card__logo {
    position: absolute;
    top: 260px;
    left: 50%;

    @media (max-width: 768px) {
      top: 210px;
    }
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    border-radius: var(--radius-all);
    background-color: var(--color-bg);
    border: 6px solid var(--color-gray-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-base);
    pointer-events: none;

    & > img {
      width: 32px;
      height: 32px;
      object-fit: contain;
      transition: rotate var(--dur-slow) var(--ease-standard);

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }
  }

  &:hover > .card__logo > img {
    rotate: 360deg;
  }

  & > .card__infos {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    gap: var(--space-4);
    min-height: 260px;
    padding: var(--space-6) var(--space-7);
    border-radius: var(--radius-md);
    background-color: var(--color-bg);

    @media (max-width: 768px) {
      min-height: 0;
      padding: var(--space-7) var(--space-5) var(--space-6);
      gap: var(--space-3);
    }

    & > .card__infos-title {
      font-size: var(--text-xl);
      font-weight: var(--weight-regular);
      color: var(--color-dark);
      font-family: var(--font-display);
      letter-spacing: -0.02em;
    }

    & > .card__infos-description {
      font-size: var(--text-sm);
      font-weight: var(--weight-light);
      color: var(--color-muted);
      line-height: var(--leading-normal);
    }
  }
`;

type CardServiceProps = {
  id: string;
  image: string;
  title: string;
  description: string;
  origin: string;
  preFill?: PreFill;
  priority?: boolean;
};

export default function CardService({
  id,
  image,
  title,
  description,
  origin,
  preFill,
  priority = false,
}: CardServiceProps) {
  const tituloId = `card-title-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Card aria-labelledby={tituloId}>
      <figure className="card__image">
        <Image
          className="card__image-img"
          src={image}
          alt={`${title} executado pela Fast em Brasília`}
          width={400}
          height={260}
          sizes="(max-width: 768px) 90vw, 33vw"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
      </figure>

      <div className="card__logo" aria-hidden="true">
        <Image src={BRAND_ASSETS.icon} alt="" width={32} height={32} />
      </div>

      <div className="card__infos">
        <h3 className="card__infos-title" id={tituloId}>
          {title}
        </h3>
        <p className="card__infos-description">{description}</p>
        <CtaButton id={id} origin={origin} variant="outline" preFill={preFill}>
          Pedir orçamento
        </CtaButton>
      </div>
    </Card>
  );
}
