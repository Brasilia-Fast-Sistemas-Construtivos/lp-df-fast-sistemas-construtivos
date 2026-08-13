import Script from "next/script";

import { GTM_CONTAINER_ID } from "@/data/integrations";
import { CONSENT_STORAGE_KEY } from "@/lib/attribution";

const CONSENT_DEFAULT_SCRIPT = `(function(){window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments)}window.gtag=gtag;var aceito=false;try{aceito=window.localStorage.getItem("${CONSENT_STORAGE_KEY}")==="accepted"}catch(e){}var estado=aceito?"granted":"denied";gtag("consent","default",{ad_storage:estado,ad_user_data:estado,ad_personalization:estado,analytics_storage:estado,functionality_storage:"granted",security_storage:"granted",wait_for_update:500});window.dataLayer.push({event:"consent_state",consent_state:estado})})();`;

const GTM_LOADER_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_CONTAINER_ID}');`;

export function GoogleTagManagerScripts() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} />
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: GTM_LOADER_SCRIPT }}
      />
    </>
  );
}

export function GoogleTagManagerNoScript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_CONTAINER_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
