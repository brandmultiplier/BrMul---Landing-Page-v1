import type { Metadata } from 'next';
import NosArchitectureClient from './NosArchitectureClient';

export const metadata: Metadata = {
  title: 'NOS Architecture — The Narrative Operating System | BrandMultiplier',
  description:
    'A narrative operating system for founder-led B2B—grounded in cognitive science, in development since 2023. Explore the four-layer NOS architecture.',
  openGraph: {
    title: 'NOS Architecture — The Narrative Operating System',
    description:
      'A narrative operating system for founder-led B2B—grounded in cognitive science, in development since 2023.',
    url: 'https://brandmultiplier.ai/NOS-architecture',
    type: 'website',
  },
};

export default function NosArchitecturePage() {
  return <NosArchitectureClient />;
}
