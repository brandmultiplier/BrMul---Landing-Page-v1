"use client";

import StoryLockTaxCalculator from "./StoryLockTaxCalculator";

// Public page. Always asks for name + work email after the calculation,
// for every visitor, cookie or not. The library-gated twin is /storylock-tax-tool.
export default function StoryLockTaxPage() {
  return <StoryLockTaxCalculator gated />;
}
