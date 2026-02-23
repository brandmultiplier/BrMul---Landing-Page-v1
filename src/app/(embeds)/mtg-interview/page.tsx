import Script from 'next/script'

export const metadata = {
  title: 'MTG Interview',
}

export default function MtgInterview() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow: hidden; }
      `}</style>
      <div
        data-perspective-fullpage="mtg-interview"
        style={{ width: '100vw', height: '100vh' }}
      />
      <Script 
        src="https://getperspective.ai/v1/embed.js" 
        strategy="afterInteractive" 
      />
    </>
  )
}
