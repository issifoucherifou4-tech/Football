import React, { useState } from 'react';
import { X, ExternalLink, ChevronUp, ChevronDown, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdConfig } from '../types/ad';

interface FloatingMobileAdProps {
  config: AdConfig;
  onAdClick?: () => void;
}

export const FloatingMobileAd: React.FC<FloatingMobileAdProps> = ({
  config,
  onAdClick,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white p-2.5 rounded-full shadow-2xl flex items-center gap-1.5 text-xs font-bold border border-rose-400/40 transition-transform hover:scale-105 active:scale-95"
          title="Rouvrir la publicité Pinterest"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="hidden sm:inline">Ad Pinterest</span>
        </button>
      </div>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    // If clicking control buttons, do nothing
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.9 },
    });

    if (onAdClick) onAdClick();
    window.open(config.pinShortUrl || config.pinUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-4 pointer-events-none flex justify-center">
      <div
        onClick={handleClick}
        className={`pointer-events-auto cursor-pointer w-full max-w-xl transition-all duration-300 rounded-2xl shadow-2xl border backdrop-blur-xl ${
          config.theme === 'barca'
            ? 'bg-gradient-to-r from-slate-950 via-blue-950/95 to-rose-950/95 border-rose-500/40 text-white'
            : config.theme === 'light'
            ? 'bg-white/95 border-slate-300 text-slate-900 shadow-xl'
            : 'bg-slate-900/95 border-slate-700/80 text-white'
        }`}
      >
        {/* Minimized view */}
        {isMinimized ? (
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="text-xs font-bold">Publicité Pinterest : Lamine Yamal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Agrandir"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVisible(false);
                }}
                className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Full Mobile Sticky Bar */
          <div className="p-3 sm:p-3.5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-600 text-white">
                  {config.badgeText || 'Sponsorisé'}
                </span>
                <span className="text-[11px] text-slate-300 flex items-center gap-1 font-medium">
                  <Flame className="w-3 h-3 text-rose-500 fill-rose-500" />
                  Barça Edit Tendance
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="Réduire"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsVisible(false);
                  }}
                  className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="Masquer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Thumbnail */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden shadow-md">
                <img
                  src={config.imageUrl}
                  alt={config.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shadow">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title & info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold truncate">
                  {config.title}
                </h4>
                <p className="text-[11px] text-slate-300 line-clamp-1">
                  {config.title.includes('Embampé') 
                    ? 'Vidéo & Highlights d\'Embampé • Buts & dribbles d\'exception' 
                    : 'Pépite du FC Barcelone • Dribbles & highlights exclusifs'}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> 4.8k sauvegardes
                  </span>
                  <span className="text-[10px] text-slate-400">
                    pin.it/2KE27E6XL
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick(e);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-bold shadow-lg flex items-center gap-1.5 transition-transform active:scale-95"
                >
                  <span>{config.ctaText || 'Ouvrir'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
