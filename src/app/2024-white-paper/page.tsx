import type { Metadata, Viewport } from "next";
import WhitePaperViewer from "./WhitePaperViewer";

const PDF_FILENAME = "BrandMultiplier—White Paper_main.pdf";
const PDF_PATH = `/2024-white-paper/${encodeURIComponent(PDF_FILENAME)}`;

export const metadata: Metadata = {
  title: "The SMB Brand Playbook (2024) | BrandMultiplier",
  description:
    "The SMB Brand Playbook: Integrating AI for Competitive Advantage. BrandMultiplier white paper, 2024. 22 pages, 27 citations.",
  openGraph: {
    title: "The SMB Brand Playbook: Integrating AI for Competitive Advantage",
    description:
      "BrandMultiplier white paper, 2024. Preview and download the full PDF.",
    url: "https://brandmultiplier.ai/2024-white-paper",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function WhitePaper2024Page() {
  return (
    <>
      <style>{`
        html, body {
          background: #121212 !important;
          color-scheme: dark;
          overflow: hidden;
          height: 100%;
        }

        .wp-shell {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          font-family: Arial, Helvetica, sans-serif;
          background: #121212;
          color: #f5f5f5;
        }

        .wp-toolbar {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 0.85rem 1.25rem;
          background: #0a0a0a;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          z-index: 10;
        }

        .wp-brand { min-width: 0; }
        .wp-kicker {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8B83E8;
          margin-bottom: 0.2rem;
        }
        .wp-title {
          margin: 0;
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #fff;
        }

        .wp-controls {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 0.25rem 0.45rem;
        }

        .wp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: #fff;
          cursor: pointer;
        }
        .wp-btn:hover:not(:disabled) { background: rgba(255,255,255,0.1); }
        .wp-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        .wp-page, .wp-zoom {
          min-width: 4.5rem;
          text-align: center;
          font-size: 0.8rem;
          font-variant-numeric: tabular-nums;
          color: rgba(255,255,255,0.75);
        }
        .wp-zoom { min-width: 3.25rem; }
        .wp-sep {
          width: 1px;
          height: 1.25rem;
          background: rgba(255,255,255,0.12);
          margin: 0 0.35rem;
        }

        .wp-download {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #4940C6;
          color: #fff;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.65rem 1.1rem;
          border-radius: 0.55rem;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .wp-download:hover { background: #3d35a8; }
        .wp-download-inline { margin-top: 1rem; }

        .wp-body {
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          overflow: hidden;
        }

        .wp-thumbs {
          flex: 0 0 140px;
          width: 140px;
          border-right: 1px solid rgba(255,255,255,0.08);
          background: #0d0d0d;
          min-height: 0;
        }

        .wp-thumbs-scroll {
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0.85rem 0.7rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.25) transparent;
        }
        .wp-thumbs-scroll::-webkit-scrollbar { width: 6px; }
        .wp-thumbs-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.25);
          border-radius: 999px;
        }

        .wp-thumb {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          color: rgba(255,255,255,0.55);
        }
        .wp-thumb-frame {
          display: block;
          width: 96px;
          border-radius: 3px;
          overflow: hidden;
          background: #222;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
          outline: 2px solid transparent;
          outline-offset: 2px;
          line-height: 0;
          transition: outline-color 0.15s ease, box-shadow 0.15s ease;
        }
        .wp-thumb-frame canvas { display: block; width: 100%; height: auto; }
        .wp-thumb:hover .wp-thumb-frame {
          outline-color: rgba(255,255,255,0.35);
        }
        .wp-thumb.is-active .wp-thumb-frame {
          outline-color: #4940C6;
          box-shadow: 0 0 0 1px #4940C6, 0 4px 16px rgba(73,64,198,0.35);
        }
        .wp-thumb.is-active { color: #fff; }
        .wp-thumb-label {
          font-size: 0.7rem;
          font-variant-numeric: tabular-nums;
        }

        .wp-stage {
          flex: 1 1 auto;
          min-width: 0;
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 1.5rem 1rem 2.5rem;
          background:
            radial-gradient(ellipse at top, rgba(73,64,198,0.12), transparent 55%),
            #161616;
        }

        .wp-page-wrap {
          background: #fff;
          box-shadow: 0 20px 60px rgba(0,0,0,0.45);
          line-height: 0;
          transition: opacity 0.15s ease;
        }
        .wp-page-wrap.is-rendering { opacity: 0.7; }
        .wp-page-wrap canvas { display: block; max-width: none; }

        .wp-status {
          margin: auto;
          text-align: center;
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @media (max-width: 820px) {
          .wp-toolbar {
            flex-wrap: wrap;
            row-gap: 0.65rem;
          }
          .wp-brand { width: 100%; }
          .wp-controls { order: 3; flex: 1 1 auto; justify-content: center; }
          .wp-download { margin-left: auto; }
          .wp-thumbs { flex-basis: 108px; width: 108px; }
          .wp-thumb-frame { width: 72px; }
        }
      `}</style>
      <WhitePaperViewer pdfUrl={PDF_PATH} downloadName={PDF_FILENAME} />
    </>
  );
}
