import React, { useState } from 'react';
import { ExternalLink, Heart, Share2, Sparkles, Flame, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdConfig } from '../types/ad';

interface ResponsiveAdCardProps {
  config: AdConfig;
  onAdClick?: () => void;
  className?: string;
}

export const ResponsiveAdCard: React.FC<ResponsiveAdCardProps> = ({
  config,
  onAdClick,
  className = '',
}) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(4820);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicked on like or share button, don't trigger ad link
    if ((e.target as HTMLElement).closest('button[data-interactive="true"]')) {
      return;
    }
    
    // Confetti burst
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#E60023', '#004D98', '#EDBB00', '#FFFFFF'],
    });

    if (onAdClick) {
      onAdClick();
    }

    // Open Pinterest link
    window.open(config.pinShortUrl || config.pinUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount(prev => (liked ? prev - 1 : prev + 1));
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: config.title,
          text: 'Regarde cette publicité Pinterest Lamine Yamal FC Barcelone !',
          url: config.pinShortUrl || config.pinUrl,
        });
      } catch {
        // fallback
      }
    } else {
      navigator.clipboard.writeText(config.pinShortUrl || config.pinUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Theme styles
  const getThemeClasses = () => {
    switch (config.theme) {
      case 'barca':
        return {
          card: 'bg-gradient-to-br from-slate-950 via-[#0a1128] to-[#1c0b1e] border-rose-600/40 hover:border-rose-500/80 shadow-rose-950/40 text-white',
          badge: 'bg-rose-600/90 text-white border-rose-400/30',
          cta: 'bg-gradient-to-r from-rose-600 via-rose-700 to-blue-700 hover:from-rose-500 hover:to-blue-600 text-white shadow-rose-900/50',
          accent: 'text-amber-400',
          subtext: 'text-slate-300',
        };
      case 'sunset':
        return {
          card: 'bg-gradient-to-br from-purple-950 via-slate-900 to-amber-950 border-amber-500/40 hover:border-amber-400/80 shadow-amber-950/40 text-white',
          badge: 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold border-amber-300/40',
          cta: 'bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-bold shadow-amber-900/50',
          accent: 'text-amber-300',
          subtext: 'text-amber-100/80',
        };
      case 'light':
        return {
          card: 'bg-white border-slate-200 hover:border-slate-300 shadow-slate-200/80 text-slate-900',
          badge: 'bg-rose-50 text-rose-600 border-rose-200',
          cta: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200',
          accent: 'text-rose-600',
          subtext: 'text-slate-600',
        };
      case 'dark':
      default:
        return {
          card: 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-slate-950/60 text-white',
          badge: 'bg-slate-800 text-slate-200 border-slate-700',
          cta: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40',
          accent: 'text-rose-400',
          subtext: 'text-slate-400',
        };
    }
  };

  const themeStyle = getThemeClasses();

  /* ========================================================================= */
  /* FORMAT 1: MEDIUM RECTANGLE (300x250)                                      */
  /* ========================================================================= */
  if (config.format === 'medium-rect') {
    return (
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-3.5 transition-all duration-300 hover:shadow-xl w-[300px] h-[250px] flex flex-col justify-between ${themeStyle.card} ${className}`}
      >
        {/* Top bar with sponsor badge and Pinterest brand */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${themeStyle.badge}`}>
              {config.badgeText || 'Sponsorisé'}
            </span>
            <span className="flex items-center text-[10px] text-emerald-400 font-semibold gap-0.5">
              <ShieldCheck className="w-3 h-3" /> Vérifié
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-rose-500 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-sm">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Pinterest</span>
          </div>
        </div>

        {/* Center content with thumbnail & title */}
        <div className="flex items-center gap-3 my-auto z-10">
          <div className="relative w-20 h-24 shrink-0 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
            <img
              src={config.imageUrl}
              alt={config.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-1">
              <span className="text-[9px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded shadow">
                HD
              </span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-500 mb-0.5">
              <Flame className="w-3.5 h-3.5 fill-rose-500" />
              <span>{config.title.includes('Embampé') ? 'Embampé #9' : 'Lamine Yamal #19'}</span>
            </div>
            <h4 className="text-xs font-bold leading-snug line-clamp-2 mb-1">
              {config.title}
            </h4>
            <p className={`text-[10px] line-clamp-1 ${themeStyle.subtext}`}>
              {config.title.includes('Embampé')
                ? 'Édition spéciale Embampé • Skills, Buts & Vidéo'
                : 'Édition spéciale FC Barcelone • Skills & Aesthetic'}
            </p>
          </div>
        </div>

        {/* Bottom CTA Button */}
        <div className="z-10 pt-2 border-t border-slate-700/40 flex items-center justify-between">
          <span className="text-[10px] text-slate-400">
            pin.it/2KE27E6XL
          </span>
          <div className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md group-hover:translate-x-0.5 ${themeStyle.cta}`}>
            <span>{config.ctaText || 'Voir le Pin'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Ambient subtle glow background */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-rose-600/10 blur-2xl pointer-events-none group-hover:bg-rose-600/20 transition-all"></div>
      </div>
    );
  }

  /* ========================================================================= */
  /* FORMAT 2: HERO BILLBOARD (Horizontal Responsive Banner)                   */
  /* ========================================================================= */
  if (config.format === 'hero-billboard') {
    return (
      <div
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-2xl w-full ${themeStyle.card} ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 z-10 relative">
          {/* Visual image */}
          <div className="relative w-full sm:w-44 h-48 sm:h-36 shrink-0 rounded-xl overflow-hidden shadow-lg">
            <img
              src={config.imageUrl}
              alt={config.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-2 left-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md ${themeStyle.badge}`}>
                {config.badgeText || 'Publicité'}
              </span>
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>Tendance #1</span>
            </div>
          </div>

          {/* Text and Actions */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
              <div className="flex items-center gap-1 text-xs font-bold text-rose-500">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
                <span>Recommandé sur Pinterest</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-amber-400 font-semibold">FC Barcelone 2025/2026</span>
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold leading-tight mb-2 tracking-tight">
              {config.title}
            </h3>

            <p className={`text-xs sm:text-sm line-clamp-2 mb-3 ${themeStyle.subtext}`}>
              {config.description || 'Découvrez le montage viral exclusif de Lamine Yamal au FC Barcelone. Dribbles magiques, buts décisifs et football aesthetic à savourer en haute définition.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <div className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-lg group-hover:scale-105 ${themeStyle.cta}`}>
                <span>{config.ctaText || 'Explorer le Pin sur Pinterest'}</span>
                <ExternalLink className="w-4 h-4" />
              </div>

              <button
                data-interactive="true"
                onClick={handleShare}
                className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-1.5"
                title="Partager"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copié !' : 'Partager'}</span>
              </button>

              <button
                data-interactive="true"
                onClick={handleLike}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${liked ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 hover:bg-white/20'}`}
                title="Aimer"
              >
                <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{likesCount.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-rose-600/10 via-transparent to-transparent pointer-events-none"></div>
      </div>
    );
  }

  /* ========================================================================= */
  /* FORMAT 3: IN-FEED / MOBILE NATIVE AD CARD (Default Responsive Format)     */
  /* ========================================================================= */
  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300 hover:shadow-2xl w-full max-w-md mx-auto ${themeStyle.card} ${className}`}
    >
      {/* Top Header Bar */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-0.5 shadow">
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={config.imageUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold leading-none">
                {config.title.includes('Embampé') ? 'Embampé Official Media' : 'FC Barcelona Daily'}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-500"></span>
              <span className="text-[11px] text-rose-500 font-semibold">Suivre</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded ${themeStyle.badge}`}>
                {config.badgeText || 'Publicité sponsorisée'}
              </span>
              <span className="text-[10px] text-slate-400">
                {config.title.includes('Embampé') ? 'Embampé #9' : 'Lamine Yamal'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">Pinterest Ad</span>
          </div>
        </div>
      </div>

      {/* Main Visual Image / Player Container */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-950">
        <img
          src={config.imageUrl}
          alt={config.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

        {/* Top Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1 border border-white/10">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Édit Viral</span>
          </span>

          <span className="px-2.5 py-1 rounded-full bg-rose-600/90 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1 shadow-lg">
            <Flame className="w-3 h-3" />
            <span>4.8k Sauvegardes</span>
          </span>
        </div>

        {/* Sound toggle simulator button */}
        <button
          data-interactive="true"
          onClick={(e) => {
            e.stopPropagation();
            setSoundActive(!soundActive);
          }}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-colors z-20"
          title={soundActive ? 'Couper le son' : 'Activer le son'}
        >
          {soundActive ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-300" />}
        </button>

        {/* Floating preview pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
          <span className="text-[11px] font-medium text-slate-200 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
            Lien : pin.it/2KE27E6XL
          </span>
        </div>
      </div>

      {/* Content description & Call To Action */}
      <div className="p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold leading-snug tracking-tight mb-1.5 group-hover:text-rose-400 transition-colors">
          {config.title}
        </h3>

        <p className={`text-xs sm:text-sm line-clamp-2 mb-4 ${themeStyle.subtext}`}>
          {config.description}
        </p>

        {/* Action bar */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            <button
              data-interactive="true"
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                liked
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/10'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{likesCount.toLocaleString()}</span>
            </button>

            <button
              data-interactive="true"
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copié !' : 'Partager'}</span>
            </button>
          </div>

          <div
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all group-hover:scale-105 active:scale-95 ${themeStyle.cta}`}
          >
            <span>{config.ctaText || 'Voir sur Pinterest'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
