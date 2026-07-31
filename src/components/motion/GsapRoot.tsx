"use client";

import { useEffect } from "react";

import { ScrollTrigger, registerGsap } from "@/components/motion/gsap";

export default function GsapRoot() {
  useEffect(() => {
    registerGsap();

    let cancelled = false;

    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    document.fonts?.ready.then(refresh).catch(() => undefined);

    const images = Array.from(document.querySelectorAll("img"));
    const pending = images.filter((image) => !image.complete);
    let remaining = pending.length;

    if (remaining === 0) {
      refresh();
    } else {
      pending.forEach((image) => {
        const done = () => {
          remaining -= 1;
          if (remaining <= 0) refresh();
        };
        image.addEventListener("load", done, { once: true });
        image.addEventListener("error", done, { once: true });
      });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
