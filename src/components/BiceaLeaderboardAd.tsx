import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, RefreshCw, ShieldCheck } from 'lucide-react';

interface BiceaLeaderboardAdProps {
  className?: string;
  showBadge?: boolean;
}

export const BiceaLeaderboardAd: React.FC<BiceaLeaderboardAdProps> = ({
  className = '',
  showBadge = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  // Responsive scale down for screens narrower than 728px
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 16;
        if (availableWidth < 728) {
          setScale(Math.max(availableWidth / 728, 0.45));
        } else {
          setScale(1);
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // HTML content executed in iframe to isolate atOptions and bicea.org script
  const iframeContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=728, initial-scale=1">
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 728px;
      height: 90px;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : '3f56ce0bf7cc0dabaab62f805af659a1',
      'format' : 'iframe',
      'height' : 90,
      'width' : 728,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bicea.org/22/3f56ce0bf7cc0dabaab62f805af659a1"></script>
</body>
</html>`;

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col items-center justify-center my-4 overflow-hidden ${className}`}
    >
      {showBadge && (
        <div className="w-full max-w-[728px] flex items-center justify-between text-[11px] text-slate-400 mb-1.5 px-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-slate-300">Publicité Partenaire Leaderboard (728x90)</span>
            <span className="text-slate-500">•</span>
            <span className="text-rose-400 font-mono text-[10px]">bicea.org</span>
          </div>

          <button
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
            title="Rafraîchir l'annonce"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Recharger</span>
          </button>
        </div>
      )}

      {/* Frame container with responsive scaling for mobile screens */}
      <div
        className="flex items-center justify-center transition-all duration-300"
        style={{
          width: scale < 1 ? `${728 * scale}px` : '728px',
          height: scale < 1 ? `${90 * scale}px` : '90px',
        }}
      >
        <div
          style={{
            width: '728px',
            height: '90px',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className="rounded-xl overflow-hidden shadow-lg border border-slate-800 bg-slate-900/60"
        >
          <iframe
            key={refreshKey}
            srcDoc={iframeContent}
            title="Publicité Leaderboard bicea.org"
            width="728"
            height="90"
            scrolling="no"
            frameBorder="0"
            className="block w-[728px] h-[90px] bg-transparent"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    </div>
  );
};
