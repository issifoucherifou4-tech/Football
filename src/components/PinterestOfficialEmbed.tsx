import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

interface PinterestOfficialEmbedProps {
  pinUrl: string;
  pinShortUrl?: string;
}

declare global {
  interface Window {
    PinUtils?: {
      build: () => void;
    };
  }
}

export const PinterestOfficialEmbed: React.FC<PinterestOfficialEmbedProps> = ({
  pinUrl,
  pinShortUrl = 'https://pin.it/2KE27E6XL',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const initPinterestWidget = () => {
    setLoadError(false);
    
    // Inject or trigger pinit.js
    if (window.PinUtils) {
      try {
        window.PinUtils.build();
        setLoaded(true);
      } catch (err) {
        console.warn('PinUtils build failed', err);
      }
      return;
    }

    const existingScript = document.querySelector('script[src*="pinit.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.pinterest.com/js/pinit.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setTimeout(() => {
          if (window.PinUtils) {
            window.PinUtils.build();
            setLoaded(true);
          }
        }, 300);
      };
      script.onerror = () => {
        setLoadError(true);
      };
      document.body.appendChild(script);
    } else {
      setTimeout(() => {
        if (window.PinUtils) {
          window.PinUtils.build();
          setLoaded(true);
        }
      }, 500);
    }
  };

  useEffect(() => {
    initPinterestWidget();
    const timer = setTimeout(() => {
      if (window.PinUtils) {
        window.PinUtils.build();
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [pinUrl]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* Status banner */}
      <div className="w-full max-w-md mb-3 flex items-center justify-between text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Widget Officiel Pinterest (SDK pinit.js)
        </span>
        <button
          onClick={() => {
            if (window.PinUtils) window.PinUtils.build();
          }}
          className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          title="Recharger le widget"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Recharger</span>
        </button>
      </div>

      <div
        ref={containerRef}
        className="w-full flex justify-center items-center overflow-x-auto py-2 min-h-[380px]"
      >
        <blockquote
          className="pinterest-pin"
          data-pin-width="medium"
          data-pin-terse="true"
        >
          <a href={pinUrl} target="_blank" rel="noopener noreferrer">
            Voir le pin sur Pinterest
          </a>
        </blockquote>
      </div>

      <div className="mt-3 text-center">
        <a
          href={pinShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
        >
          <span>Ouvrir le lien original ({pinShortUrl})</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
