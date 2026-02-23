export const metadata = {
  title: 'The StoryLock Assessment',
}

export default function StoryLockAssessment() {
  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; }
      `}</style>
      <iframe
        src="https://0983cb3e-a3f4-40b0-9618-772474ef3924.scoreapp.com/?sa_target=_top"
        style={{
          border: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh'
        }}
        allowFullScreen
      />
    </>
  )
}
