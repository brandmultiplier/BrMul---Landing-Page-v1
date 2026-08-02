import type { Metadata, Viewport } from "next";

const PDF_FILENAME = "BrandMultiplier-White Paper_main.pdf";
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
    <div className="white-paper-page min-h-screen bg-white text-[#111114]">
      <style>{`
        html body { background: #fff !important; color-scheme: light; }
        .white-paper-page { font-family: Arial, Helvetica, sans-serif; }
      `}</style>

      <header className="border-b border-[#E8E6E1]">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4940C6]">
              BrandMultiplier · 2024
            </p>
            <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              The SMB Brand Playbook
            </h1>
            <p className="mt-1 text-sm text-[#666666] sm:text-base">
              Integrating AI for Competitive Advantage
            </p>
          </div>

          <a
            href={PDF_PATH}
            download={PDF_FILENAME}
            className="inline-flex items-center justify-center rounded-lg bg-[#4940C6] px-5 py-3 text-sm font-bold text-white no-underline shadow-sm transition hover:bg-[#3d35a8]"
          >
            Download PDF
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        <object
          data={PDF_PATH}
          type="application/pdf"
          className="hidden h-[calc(100vh-12rem)] min-h-[70vh] w-full rounded border border-[#E8E6E1] bg-[#fafafa] sm:block"
          aria-label="2024 BrandMultiplier white paper preview"
        >
          <iframe
            src={PDF_PATH}
            title="2024 BrandMultiplier white paper preview"
            className="h-[calc(100vh-12rem)] min-h-[70vh] w-full rounded border border-[#E8E6E1] bg-[#fafafa]"
          />
        </object>

        <iframe
          src={PDF_PATH}
          title="2024 BrandMultiplier white paper preview"
          className="block h-[calc(100vh-12rem)] min-h-[70vh] w-full rounded border border-[#E8E6E1] bg-[#fafafa] sm:hidden"
        />

        <p className="mt-4 text-center text-sm text-[#666666]">
          PDF not displaying?{" "}
          <a href={PDF_PATH} download={PDF_FILENAME} className="font-bold text-[#4940C6] underline">
            Download the file
          </a>{" "}
          or{" "}
          <a href={PDF_PATH} target="_blank" rel="noopener noreferrer" className="font-bold text-[#4940C6] underline">
            open in a new tab
          </a>
          .
        </p>
      </main>
    </div>
  );
}
