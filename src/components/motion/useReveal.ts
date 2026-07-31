"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

import { gsap, motionEnabled, registerGsap } from "@/components/motion/gsap";

type UseRevealOptions = {
  selector?: string;
  stagger?: number;
  start?: string;
  y?: number;
};

export function useReveal(
  ref: RefObject<HTMLElement | null>,
  { selector = "[data-reveal]", stagger = 0.06, start = "top 85%", y = 16 }: UseRevealOptions = {}
) {
  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      registerGsap();

      const targets = element.querySelectorAll<HTMLElement>(selector);
      if (!targets.length) return;

      if (!motionEnabled()) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
            onEnter: () => {
              targets.forEach((target) => {
                target.style.willChange = "transform, opacity";
              });
            },
            onLeave: () => {
              targets.forEach((target) => {
                target.style.willChange = "auto";
              });
            },
          },
          onComplete: () => {
            targets.forEach((target) => {
              target.style.willChange = "auto";
            });
          },
        }
      );
    },
    { scope: ref, dependencies: [selector, stagger, start, y] }
  );
}
