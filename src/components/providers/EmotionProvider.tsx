"use client";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";
import { useState, type ReactNode } from "react";

type EmotionProviderProps = {
  children: ReactNode;
};

export default function EmotionProvider({ children }: EmotionProviderProps) {
  const [{ cache, flushInsertedNames }] = useState(() => {
    const emotionCache = createCache({ key: "fast" });
    emotionCache.compat = true;

    const originalInsert = emotionCache.insert;
    let insertedNames: string[] = [];

    emotionCache.insert = (...insertArgs) => {
      const serialized = insertArgs[1];
      if (emotionCache.inserted[serialized.name] === undefined) {
        insertedNames.push(serialized.name);
      }
      return originalInsert(...insertArgs);
    };

    const flushInsertedNames = () => {
      const pendingNames = insertedNames;
      insertedNames = [];
      return pendingNames;
    };

    return { cache: emotionCache, flushInsertedNames };
  });

  useServerInsertedHTML(() => {
    const names = flushInsertedNames();
    if (names.length === 0) return null;

    const styles = names.map((name) => cache.inserted[name]).join("");

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
