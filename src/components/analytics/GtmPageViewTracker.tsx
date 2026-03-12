"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type DataLayerEvent = {
  event: "page_view";
  page_path: string;
  page_location: string;
  page_title: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export default function GtmPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrlRef = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = searchParams?.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname || "/";
    const pageLocation = `${window.location.origin}${pagePath}`;

    if (lastTrackedUrlRef.current === pageLocation) return;
    lastTrackedUrlRef.current = pageLocation;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_location: pageLocation,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
