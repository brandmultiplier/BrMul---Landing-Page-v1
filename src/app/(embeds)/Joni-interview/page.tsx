import Script from 'next/script'

export const metadata = {
  title: 'Joni Interview',
}

export default function JoniInterview() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow: hidden; }
      `}</style>
      <div
        data-perspective-fullpage="zk9pqxpx"
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
