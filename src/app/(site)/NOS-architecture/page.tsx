import type { Metadata } from 'next';
import NosArchitectureClient from './NosArchitectureClient';

export const metadata: Metadata = {
  title: 'NOS Architecture — The Narrative Operating System | BrandMultiplier',
  description:
    'The agentic marketing machine for founder-led B2B — built as a system, not a project. Explore the four-layer Narrative Operating System architecture.',
  openGraph: {
    title: 'NOS Architecture — The Narrative Operating System',
    description:
      'The agentic marketing machine for founder-led B2B — built as a system, not a project.',
    url: 'https://brandmultiplier.ai/NOS-architecture',
    type: 'website',
  },
};

export default function NosArchitecturePage() {
  return <NosArchitectureClient />;
}
