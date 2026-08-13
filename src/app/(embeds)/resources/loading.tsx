export default function ResourcesLoading() {
  return (
    <>
      <style>{`
        .resources-loading-bar{
          position:fixed;top:0;left:0;right:0;z-index:120;
          background:#fff;border-bottom:1px solid #E8E6E1;
          padding:20px 24px;
        }
        .resources-loading-shell{
          max-width:720px;margin:0 auto;padding:104px 24px 40px;
        }
        .resources-loading-line{
          height:14px;border-radius:999px;background:linear-gradient(90deg,#f3f1fa 0%,#ede8f5 50%,#f3f1fa 100%);
          background-size:200% 100%;animation:resources-shimmer 1.1s ease-in-out infinite;
          margin:0 0 14px;
        }
        .resources-loading-line.w40{width:40%}
        .resources-loading-line.w70{width:70%}
        .resources-loading-line.w100{width:100%}
        @keyframes resources-shimmer{
          0%{background-position:200% 0}
          100%{background-position:-200% 0}
        }
      `}</style>
      <div className="resources-loading-bar" aria-hidden="true">
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            height: 40,
            borderRadius: 8,
            background: "#f3f1fa",
          }}
        />
      </div>
      <div className="resources-loading-shell" aria-busy="true" aria-label="Loading resource">
        <div className="resources-loading-line w40" />
        <div className="resources-loading-line w70" />
        <div className="resources-loading-line w100" />
        <div className="resources-loading-line w100" />
        <div className="resources-loading-line w100" />
      </div>
    </>
  );
}
