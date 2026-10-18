import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  RotateCcw, 
  Sparkles, 
  Flame, 
  ExternalLink, 
  Eye, 
  Share2, 
  Tv, 
  Check, 
  SlidersHorizontal,
  Monitor
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Hls from 'hls.js';
import { AdConfig } from '../types/ad';

interface EmbappeHeroVideoProps {
  config: AdConfig;
  onAdClick?: () => void;
  defaultTheaterMode?: boolean;
}

export const EmbappeHeroVideo: React.FC<EmbappeHeroVideoProps> = ({
  config,
  onAdClick,
  defaultTheaterMode = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(defaultTheaterMode);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Video source: prioritize local high-speed mp4, fallback to config
  const videoSource = config.videoUrl || '/videos/mbappe-highlight.mp4';
  const downloadSource = config.videoDownloadUrl || '/videos/mbappe-highlight.mp4';

  // Check saved status from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('embappe_video_saved');
      if (saved === 'true') {
        setIsSaved(true);
      }
    } catch {
      // localStorage error fallback
    }
  }, []);

  // HLS stream support if video is .m3u8
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (videoSource.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(videoSource);
        hls.attachMedia(video);
        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSource;
      }
    } else {
      video.src = videoSource;
    }
  }, [videoSource]);

  // Keyboard shortcuts for computer / desktop navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.code === 'ArrowRight') {
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration);
        }
      } else if (e.code === 'ArrowLeft') {
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration, isPlaying, isMuted]);

  // Video event handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStartedPlaying(true);
      }).catch(err => console.log('Autoplay blocked:', err));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
    videoRef.current.volume = volume;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * duration;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const changeSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const handleSaveVideo = () => {
    const nextState = !isSaved;
    setIsSaved(nextState);
    try {
      localStorage.setItem('embappe_video_saved', String(nextState));
    } catch {}

    if (nextState) {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#004D98', '#EDBB00', '#E60023', '#FFFFFF'],
      });
    }
  };

  const handleDownload = () => {
    setDownloadProgress('Téléchargement en cours...');
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#E60023', '#FFFFFF', '#004D98'],
    });

    setTimeout(() => {
      setDownloadProgress('Vidéo enregistrée !');
      setTimeout(() => setDownloadProgress(null), 3000);
    }, 1500);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 2800);
  };

  return (
    <section className="w-full mb-10">
      {/* POSITION 1 HEADER BADGE & TITLE */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-rose-600 via-amber-500 to-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-rose-950/40">
              <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>1ÈRE POSITION : LE MEILLEUR JOUEUR DU MONDE</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kylian Mbappé • Vidéo Exclusive</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Kylian Mbappé — Le Meilleur Joueur du Monde
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Visionnez en direct les plus beaux buts, accélérations et gestes techniques du meilleur joueur de la planète, et enregistrez la vidéo sur votre ordinateur.
          </p>
        </div>

        {/* Action bar (Enregistrer la vidéo sur l'ordinateur / Pinterest) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* BOUTON ENREGISTRER LA VIDÉO (Téléchargement direct MP4) */}
          <a
            href={downloadSource}
            download="Embampe-Highlights-Match-Video.mp4"
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-700 to-blue-700 hover:from-rose-500 hover:to-blue-600 text-white font-black text-xs sm:text-sm shadow-xl shadow-rose-950/50 transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/10"
            title="Enregistrer la vidéo sur votre ordinateur (MP4 1080p)"
          >
            <Download className="w-4 h-4 animate-bounce" />
            <span>{downloadProgress || 'Enregistrer la vidéo (.mp4)'}</span>
          </a>

          {/* Sauvegarder dans mes favoris */}
          <button
            onClick={handleSaveVideo}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
              isSaved
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
            title="Enregistrer dans vos favoris"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Vidéo Enregistrée' : 'Sauvegarder'}</span>
          </button>

          {/* Lien Pinterest */}
          <a
            href={config.pinShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onAdClick}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-white/5 hover:bg-white/10 text-rose-400 border border-rose-500/30 transition-colors"
            title="Voir le pin original sur Pinterest"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Pin Pinterest</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* COMPUTER CINEMA VIDEO PLAYER CONTAINER */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
        className={`relative overflow-hidden rounded-3xl border border-slate-700/80 bg-black shadow-2xl transition-all duration-300 group ${
          isTheaterMode ? 'w-full max-h-[85vh] aspect-[16/9]' : 'w-full aspect-[16/9] max-h-[600px]'
        }`}
      >
        {/* HTML5 Video Element */}
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          className="w-full h-full object-contain bg-black cursor-pointer"
          playsInline
          poster={config.imageUrl}
          preload="metadata"
        />

        {/* Big Center Play Overlay (when paused) */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-opacity z-20"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-blue-600 p-1 shadow-2xl shadow-rose-950/80 hover:scale-110 active:scale-95 transition-transform flex items-center justify-center group-hover:ring-4 ring-rose-500/30">
              <div className="w-full h-full rounded-full bg-slate-950/80 backdrop-blur-md flex items-center justify-center pl-1.5">
                <Play className="w-9 h-9 sm:w-11 sm:h-11 text-white fill-white" />
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-white font-black text-sm sm:text-base tracking-wide uppercase px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                Lancer la vidéo : Kylian Mbappé (Le Meilleur Joueur)
              </span>
              <p className="text-[11px] text-slate-300 mt-1">
                Appuyez sur <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200">Espace</kbd> ou cliquez pour lire
              </p>
            </div>
          </div>
        )}

        {/* Top Watermark & Info Overlay inside Video */}
        <div className={`absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none transition-opacity duration-300 z-20 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs font-black text-white">Kylian Mbappé • Le Meilleur Joueur du Monde</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-blue-600/80 text-white font-bold px-2 py-0.5 rounded backdrop-blur-md">
              1080p 60FPS
            </span>
            <span className="text-[10px] bg-rose-600/80 text-white font-bold px-2 py-0.5 rounded backdrop-blur-md">
              Pinterest Link
            </span>
          </div>
        </div>

        {/* BOTTOM VIDEO CONTROLS BAR (Computer Desktop & Mobile Responsive) */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 sm:p-5 transition-opacity duration-300 z-30 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Progress timeline scrubber */}
          <div
            onClick={handleSeek}
            className="group/seek relative w-full h-2 hover:h-3.5 bg-white/20 rounded-full cursor-pointer mb-3 transition-all"
          >
            {/* Progress filled bar */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-rose-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg ring-2 ring-rose-500 scale-0 group-hover/seek:scale-100 transition-transform"></div>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between gap-3 text-white">
            {/* Left controls: Play, Rewind, Volume, Time */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={togglePlay}
                className="p-2 hover:bg-white/15 rounded-xl transition-colors text-white"
                title={isPlaying ? 'Pause (Espace)' : 'Lecture (Espace)'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
                  }
                }}
                className="hidden sm:block p-1.5 hover:bg-white/15 rounded-lg text-slate-300 hover:text-white transition-colors"
                title="Reculer de 10 secondes"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Volume & Slider */}
              <div className="flex items-center gap-2 group/volume">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:bg-white/15 rounded-lg text-slate-300 hover:text-white transition-colors"
                  title="Couper le son (M)"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="hidden sm:block w-16 md:w-20 accent-rose-500 cursor-pointer h-1.5 bg-white/20 rounded-lg"
                  title="Volume"
                />
              </div>

              {/* Time display */}
              <span className="text-xs font-mono text-slate-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right controls: Speed, Theater, Download, Fullscreen */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Vitesse de lecture */}
              <button
                onClick={changeSpeed}
                className="px-2 py-1 hover:bg-white/15 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors"
                title="Vitesse de lecture"
              >
                {playbackSpeed}x
              </button>

              {/* Mode Cinéma pour Ordinateur */}
              <button
                onClick={() => setIsTheaterMode(!isTheaterMode)}
                className={`hidden md:block p-2 rounded-xl transition-colors ${
                  isTheaterMode ? 'bg-rose-600/30 text-rose-400' : 'hover:bg-white/15 text-slate-300 hover:text-white'
                }`}
                title="Mode Cinéma Ordinateur"
              >
                <Tv className="w-4 h-4" />
              </button>

              {/* Enregistrer / Télécharger */}
              <a
                href={downloadSource}
                download="Embampe-Highlights-Match-Video.mp4"
                onClick={handleDownload}
                className="p-2 hover:bg-white/15 rounded-xl text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
                title="Télécharger la vidéo"
              >
                <Download className="w-4 h-4" />
                <span className="hidden lg:inline font-bold">Enregistrer</span>
              </a>

              {/* Plein écran */}
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-white/15 rounded-xl text-slate-300 hover:text-white transition-colors"
                title="Plein écran (F)"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP COMPUTER KEYBOARD SHORTCUTS HINT */}
      <div className="hidden md:flex items-center justify-between text-xs text-slate-500 mt-3 px-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">Espace</kbd>
            <span>Play / Pause</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">M</kbd>
            <span>Muet</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">F</kbd>
            <span>Plein Écran</span>
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">← / →</kbd>
            <span>Reculer / Avancer</span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <Monitor className="w-3.5 h-3.5 text-rose-500" />
          <span>Affichage ordinateur actif</span>
        </div>
      </div>
    </section>
  );
};
