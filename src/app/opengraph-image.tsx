import { ImageResponse } from "next/og";

import { BRAND_COLORS } from "@/data/brand";
import { SERVICES } from "@/data/seo";
import { SITE } from "@/data/site";
import { OG_IMAGE } from "@/lib/seo/config";

export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BRAND_COLORS.dark,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              width: "96px",
              height: "8px",
              backgroundColor: BRAND_COLORS.brand,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "68px",
              fontWeight: 700,
              color: BRAND_COLORS.bg,
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            Fast Sistemas Construtivos
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              color: BRAND_COLORS.mutedWhite,
              lineHeight: 1.3,
            }}
          >
            Drywall, Steel Frame e construção a seco em {SITE.region}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {SERVICES.slice(0, 5).map((service) => (
            <div
              key={service.slug}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: "999px",
                border: `1px solid ${BRAND_COLORS.muted}`,
                color: BRAND_COLORS.bg,
                fontSize: "24px",
              }}
            >
              {service.shortName}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
