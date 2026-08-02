"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Download, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type Props = {
  pdfUrl: string;
  downloadName: string;
};

export default function WhitePaperViewer({ pdfUrl, downloadName }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<pdfjs.PDFDocumentProxy | null>(null);

  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(1.15);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
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

  const renderPage = useCallback(async () => {
    const pdf = pdfRef.current;
    const canvas = canvasRef.current;
    if (!pdf || !canvas) return;

    setRendering(true);
    try {
      const pdfPage = await pdf.getPage(page);
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

      containerRef.current?.scrollTo({ top: 0 });
    } catch {
      // Ignore abort/race when page changes mid-render
    } finally {
      setRendering(false);
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
      </header>

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
  );
}
