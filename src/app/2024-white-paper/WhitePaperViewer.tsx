"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import * as pdfjs from "pdfjs-dist";
import LegalLinks from "@/components/legal/LegalLinks";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type Props = {
  pdfUrl: string;
  downloadName: string;
};

const THUMB_WIDTH = 96;

export default function WhitePaperViewer({ pdfUrl, downloadName }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbListRef = useRef<HTMLDivElement>(null);
  const thumbCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const pdfRef = useRef<pdfjs.PDFDocumentProxy | null>(null);
  const renderGen = useRef(0);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rendering, setRendering] = useState(false);
  const [thumbsReady, setThumbsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      setThumbsReady(false);
      try {
        const task = pdfjs.getDocument(pdfUrl);
        const pdf = await task.promise;
        if (cancelled) {
          pdf.destroy();
          return;
        }
        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        setPage(1);
        thumbCanvasRefs.current = Array(pdf.numPages).fill(null);
      } catch {
        if (!cancelled) {
          setError("Could not load the PDF. Please download it instead.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
      pdfRef.current?.destroy();
      pdfRef.current = null;
    };
  }, [pdfUrl]);

  // Render left-rail thumbnails once the document is loaded
  useEffect(() => {
    if (loading || error || !numPages) return;

    let cancelled = false;

    async function renderThumbs() {
      const pdf = pdfRef.current;
      if (!pdf) return;

      for (let i = 1; i <= pdf.numPages; i++) {
        if (cancelled) return;
        const canvas = thumbCanvasRefs.current[i - 1];
        if (!canvas) continue;

        try {
          const pdfPage = await pdf.getPage(i);
          const base = pdfPage.getViewport({ scale: 1 });
          const thumbScale = THUMB_WIDTH / base.width;
          const viewport = pdfPage.getViewport({ scale: thumbScale });
          const context = canvas.getContext("2d");
          if (!context) continue;

          const dpr = window.devicePixelRatio || 1;
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          await pdfPage.render({
            canvasContext: context,
            viewport,
            transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
          }).promise;
        } catch {
          // Skip failed thumb
        }
      }

      if (!cancelled) setThumbsReady(true);
    }

    // Wait a tick so canvas refs are mounted
    const id = window.setTimeout(() => {
      void renderThumbs();
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [loading, error, numPages]);

  // Keep active thumbnail in view
  useEffect(() => {
    const list = thumbListRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(`[data-page="${page}"]`);
    active?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [page, thumbsReady]);

  const renderPage = useCallback(async () => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas) return;

    const gen = ++renderGen.current;
    setRendering(true);
    try {
      const pdfPage = await pdf.getPage(page);
      if (gen !== renderGen.current) return;

      const viewport = pdfPage.getViewport({ scale });
      const context = canvas.getContext("2d");
      if (!context) return;

      const outputScale = window.devicePixelRatio || 1;
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const transform =
        outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

      await pdfPage.render({
        canvasContext: context,
        viewport,
        transform,
      }).promise;

      if (gen !== renderGen.current) return;
      containerRef.current?.scrollTo({ top: 0 });
    } catch {
      // Ignore abort/race when page changes mid-render
    } finally {
      if (gen === renderGen.current) setRendering(false);
    }
  }, [page, scale]);

  useEffect(() => {
    if (!loading && !error) {
      void renderPage();
    }
  }, [loading, error, renderPage]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        setPage((p) => Math.min(numPages, p + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setPage((p) => Math.max(1, p - 1));
      } else if (e.key === "+" || e.key === "=") {
        setScale((s) => Math.min(2.5, Math.round((s + 0.1) * 10) / 10));
      } else if (e.key === "-") {
        setScale((s) => Math.max(0.6, Math.round((s - 0.1) * 10) / 10));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [numPages]);

  return (
    <div className="wp-shell">
      <header className="wp-toolbar">
        <div className="wp-brand">
          <span className="wp-kicker">BrandMultiplier · 2024</span>
          <h1 className="wp-title">The SMB Brand Playbook</h1>
        </div>

        <div className="wp-controls" aria-label="PDF controls">
          <button
            type="button"
            className="wp-btn"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="wp-page">
            {numPages ? `${page} / ${numPages}` : "—"}
          </span>
          <button
            type="button"
            className="wp-btn"
            onClick={() => setPage((p) => Math.min(numPages, p + 1))}
            disabled={page >= numPages || loading}
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>

          <span className="wp-sep" />

          <button
            type="button"
            className="wp-btn"
            onClick={() => setScale((s) => Math.max(0.6, Math.round((s - 0.1) * 10) / 10))}
            disabled={scale <= 0.6}
            aria-label="Zoom out"
          >
            <Minus size={16} />
          </button>
          <span className="wp-zoom">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            className="wp-btn"
            onClick={() => setScale((s) => Math.min(2.5, Math.round((s + 0.1) * 10) / 10))}
            disabled={scale >= 2.5}
            aria-label="Zoom in"
          >
            <Plus size={16} />
          </button>
        </div>

        <a href={pdfUrl} download={downloadName} className="wp-download">
          <Download size={16} />
          Download PDF
        </a>
        <span
          style={{
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.55)",
            whiteSpace: "nowrap",
          }}
        >
          <LegalLinks />
        </span>
      </header>

      <div className="wp-body">
        {!loading && !error && numPages > 0 && (
          <aside className="wp-thumbs" aria-label="Page thumbnails">
            <div ref={thumbListRef} className="wp-thumbs-scroll">
              {Array.from({ length: numPages }, (_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    type="button"
                    data-page={n}
                    className={`wp-thumb${page === n ? " is-active" : ""}`}
                    onClick={() => setPage(n)}
                    aria-label={`Go to page ${n}`}
                    aria-current={page === n ? "page" : undefined}
                  >
                    <span className="wp-thumb-frame">
                      <canvas
                        ref={(el) => {
                          thumbCanvasRefs.current[i] = el;
                        }}
                      />
                    </span>
                    <span className="wp-thumb-label">{n}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        )}

        <div ref={containerRef} className="wp-stage">
          {loading && <p className="wp-status">Loading white paper…</p>}
          {error && (
            <div className="wp-status">
              <p>{error}</p>
              <a href={pdfUrl} download={downloadName} className="wp-download wp-download-inline">
                <Download size={16} />
                Download PDF
              </a>
            </div>
          )}
          {!loading && !error && (
            <div className={`wp-page-wrap${rendering ? " is-rendering" : ""}`}>
              <canvas ref={canvasRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
