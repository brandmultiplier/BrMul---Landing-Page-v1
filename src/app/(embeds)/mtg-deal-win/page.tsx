import Script from 'next/script'

export const metadata = {
  title: 'MTG Deal Win',
}

export default function MtgDealWin() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow: hidden; }
      `}</style>
      <div
        data-perspective-fullpage="oLD2_kxy"
        data-perspective-params="hideBranding=true"
        style={{ width: '100vw', height: '100vh' }}
      />
      <Script 
        src="https://getperspective.ai/v1/perspective.js" 
        strategy="afterInteractive" 
      />
    </>
  )
}
