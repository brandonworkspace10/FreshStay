import { ImageResponse } from "next/og";

export const alt =
  "FreshStay BnB — Airbnb & short-term rental turnover cleaning for NYC hosts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const FRESH = "#13a08c";
const FRESH_DARK = "#0c7a6b";
const INK = "#1f2733";
const MUTED = "#5b6472";

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
          padding: "72px 80px",
          background:
            "linear-gradient(135deg, #ffffff 0%, #f1faf7 55%, #dff3ee 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 92,
              height: 92,
              borderRadius: 22,
              background: `linear-gradient(140deg, ${FRESH} 0%, ${FRESH_DARK} 100%)`,
              boxShadow: "0 12px 30px rgba(19,160,140,0.35)",
            }}
          >
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9.5 12 3l9 6.5" />
              <path d="M5 9.5V21h14V9.5" />
              <path d="M9.5 21v-6h5v6" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 800 }}>
            <span style={{ color: INK }}>Fresh</span>
            <span style={{ color: FRESH }}>Stay</span>
            <span style={{ color: MUTED, fontWeight: 700 }}>&nbsp;BnB</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Airbnb turnover cleaning,
          </div>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              color: FRESH,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            handled for NYC hosts.
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: MUTED }}>
            Same-day service · Insured crews · Weekly, bi-weekly & per-stay plans
          </div>
        </div>

        {/* Trust chips */}
        <div style={{ display: "flex", gap: 16 }}>
          {[
            "Background-checked cleaners",
            "$2M insured",
            "Manhattan · Brooklyn · Queens",
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 600,
                color: FRESH_DARK,
                background: "#ffffff",
                border: "2px solid #cdeee6",
                borderRadius: 999,
                padding: "12px 24px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
