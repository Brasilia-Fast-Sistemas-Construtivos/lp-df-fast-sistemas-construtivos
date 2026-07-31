"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

import { gsap, motionEnabled, registerGsap } from "@/components/motion/gsap";

type UseSnapOptions = {
  trigger?: "load" | "scroll";
  delay?: number;
};

export function useSnap(
  ref: RefObject<HTMLElement | null>,
  { trigger = "scroll", delay = 0 }: UseSnapOptions = {}
) {
  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      registerGsap();

      const stroke = element.querySelector<HTMLElement>(".snap__stroke");
      const dust = element.querySelector<HTMLElement>(".snap__dust");
      if (!stroke) return;

      if (!motionEnabled()) {
        gsap.set(stroke, { scaleX: 1 });
        return;
      }

      const timeline = gsap.timeline({
        paused: true,
        onStart: () => {
          element.style.willChange = "transform";
        },
        onComplete: () => {
          element.style.willChange = "auto";
        },
      });

      timeline
        .fromTo(
          stroke,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.18, ease: "cubic-bezier(0.16, 1, 0.3, 1)" }
        )
        .to(stroke, { scaleY: 1.5, duration: 0.06, yoyo: true, repeat: 1, ease: "none" }, 0.16);

      if (dust) {
        timeline.fromTo(
          dust,
          { opacity: 0, scaleX: 0.6 },
          { opacity: 0.55, scaleX: 1.05, duration: 0.3, ease: "power1.out" },
          0.16
        );
        timeline.to(dust, { opacity: 0, duration: 0.2, ease: "power1.out" }, 0.36);
      }

      if (trigger === "load") {
        timeline.delay(delay).play();
        return;
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 88%",
          once: true,
          onEnter: () => timeline.delay(delay).play(),
        },
      });
    },
    { scope: ref, dependencies: [trigger, delay] }
  );
}
