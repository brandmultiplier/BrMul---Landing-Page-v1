import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.brandmultiplier.ai/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.brandmultiplier.ai/privacy',
      lastModified: new Date('2026-08-17'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: 'https://www.brandmultiplier.ai/terms',
      lastModified: new Date('2026-08-17'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
