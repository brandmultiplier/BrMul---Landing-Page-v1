"use client";

import { useEffect } from "react";

export default function WelcomeBanner() {
  useEffect(() => {
    document.cookie = "bm_welcome=; path=/; max-age=0; samesite=lax";
  }, []);

  return (
    <div className="welcome-banner" role="status">
      You&apos;re in. The library is unlocked on this browser.
    </div>
  );
}
