import StoryLockTaxCalculator from "../storylock-tax/StoryLockTaxCalculator";
import LibraryGateOverlay from "@/components/library/LibraryGateOverlay";
import LegalLinks from "@/components/legal/LegalLinks";

// Library-gated twin of /storylock-tax. Identity always comes from the library
// form, never from a second ask inside the calculator. The overlay renders
// itself only while the bm_library cookie is missing.
export default function StoryLockTaxToolPage() {
  return (
    <>
      <StoryLockTaxCalculator gated={false} />
      <p
        style={{
          margin: 0,
          padding: "16px 24px 32px",
          textAlign: "center",
          fontSize: 13,
          color: "#A1A1AA",
          background: "#0A0A0A",
        }}
      >
        <LegalLinks />
      </p>
      <LibraryGateOverlay
        title="The StoryLock Tax"
        redirectTo="/storylock-tax-tool"
        intent="storylock_tax"
        show
      />
    </>
  );
}
