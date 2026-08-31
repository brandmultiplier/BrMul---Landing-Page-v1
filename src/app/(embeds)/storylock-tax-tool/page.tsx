import StoryLockTaxCalculator from "../storylock-tax/StoryLockTaxCalculator";
import LibraryGateOverlay from "@/components/library/LibraryGateOverlay";

// Library-gated twin of /storylock-tax. Identity always comes from the library
// form, never from a second ask inside the calculator. The overlay renders
// itself only while the bm_library cookie is missing.
export default function StoryLockTaxToolPage() {
  return (
    <>
      <StoryLockTaxCalculator gated={false} />
      <LibraryGateOverlay
        title="The StoryLock Tax"
        redirectTo="/storylock-tax-tool"
        intent="storylock_tax"
        show
      />
    </>
  );
}
