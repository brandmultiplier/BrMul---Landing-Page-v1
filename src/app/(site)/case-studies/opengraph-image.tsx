import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Stand-in Client Results card. Chris's supplied 1200x627 asset replaces this
// the moment it lands: delete this file and point metadata at the static image.
export const alt = "Client Results — BrandMultiplier";
export const size = { width: 1200, height: 627 };
export const contentType = "image/png";

const logo = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public", "brandmultiplier-logo.png")
).toString("base64")}`;

// Figures and labels are the Appendix A values, unchanged.
const HEADLINES = [
  { figure: "25%", client: "BetterCloud", label: "market share regained" },
  { figure: "+41%", client: "Apto Solutions", label: "revenue YoY" },
  { figure: "+20%", client: "Ledger", label: "YoY monthly sales" },
  { figure: "+63%", client: "Tria Beauty", label: "YoY website revenue" },
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080F",
          padding: "54px 64px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -560,
            right: -380,
            width: 1000,
            height: 1000,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(73,64,198,0.62) 0%, rgba(73,64,198,0.20) 40%, rgba(73,64,198,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "#B9B3F2",
            }}
          >
            Client Results
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={44} height={44} alt="" style={{ borderRadius: 9 }} />
            <div
              style={{
                fontSize: 19,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              BrandMultiplier
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {HEADLINES.map((item) => (
            <div
              key={item.client}
              style={{ display: "flex", flexDirection: "column", width: 248 }}
            >
              <div
                style={{
                  fontSize: 76,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "#F36901",
                }}
              >
                {item.figure}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontSize: 27,
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                  color: "#FFFFFF",
                }}
              >
                {item.client}
              </div>
              <div style={{ marginTop: 8, fontSize: 19, color: "#8F8BA8" }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.10)",
            paddingTop: 26,
          }}
        >
          <div
            style={{
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#C9C6DA",
            }}
          >
            Every one started with a Rumble.
          </div>
          <div style={{ fontSize: 19, color: "#8F8BA8" }}>brandmultiplier.ai</div>
        </div>
      </div>
    ),
    size
  );
}
