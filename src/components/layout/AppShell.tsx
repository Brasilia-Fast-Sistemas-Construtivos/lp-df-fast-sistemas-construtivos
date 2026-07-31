"use client";

import type { ReactNode } from "react";

import CookieConsent from "@/components/cookies/CookieConsent";
import FormModal from "@/components/forms/FormModal";
import FormModalProvider from "@/components/forms/FormModalProvider";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppFloating from "@/components/layout/WhatsAppFloating";
import GsapRoot from "@/components/motion/GsapRoot";
import UtmPersist from "@/components/utm/UtmPersist";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <FormModalProvider>
      <SmoothScroll />
      <GsapRoot />
      <UtmPersist />

      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <div className="app-shell">
        <Header />
        <main className="app-main" id="conteudo">
          {children}
        </main>
        <Footer />
      </div>

      <WhatsAppFloating />
      <CookieConsent />
      <FormModal />
    </FormModalProvider>
  );
}
