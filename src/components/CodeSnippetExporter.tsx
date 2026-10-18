import React, { useState } from 'react';
import { Copy, Check, Code, FileText, Smartphone, Laptop, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { AdConfig } from '../types/ad';

interface CodeSnippetExporterProps {
  config: AdConfig;
}

export const CodeSnippetExporter: React.FC<CodeSnippetExporterProps> = ({ config }) => {
  const [activeTab, setActiveTab] = useState<'video' | 'html' | 'react' | 'floating' | 'pinterest-sdk'>('video');
  const [copied, setCopied] = useState(false);

  // Generate responsive Embampé Video Player with download option
  const getVideoCode = () => {
    return `<!-- =================================================================== -->
<!-- VIDÉO KYLIAN MBAPPÉ (LE MEILLEUR JOUEUR DU MONDE) EN 1ÈRE POSITION     -->
<!-- Avec lecture instantanée, bouton Enregistrer et Script Publicitaire -->
<!-- =================================================================== -->
<!-- Script Publicitaire Partenaire de votre compte -->
<script data-cfasync="false" src="https://afders.org/1/a6223f26b4dedfb133cbf0d8ae8ea2ac"></script>

<div class="mbappe-video-wrapper">
  <!-- En-tête Vidéo -->
  <div class="mbappe-header">
    <div class="mbappe-badge">1ère Position • Kylian Mbappé (Le Meilleur Joueur)</div>
    <a href="/videos/mbappe-highlight.mp4" download="Kylian-Mbappe-Le-Meilleur-Joueur.mp4" class="mbappe-download-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
      Enregistrer la vidéo (.mp4)
    </a>
  </div>

  <!-- Lecteur Vidéo HTML5 Responsive pour Ordinateur et Mobile -->
  <div class="mbappe-player-container">
    <video controls playsinline preload="metadata" poster="${config.imageUrl}">
      <source src="/videos/mbappe-highlight.mp4" type="video/mp4" />
      Votre navigateur ne supporte pas la balise vidéo.
    </video>
  </div>

  <!-- Lien Pinterest officiel -->
  <div class="mbappe-footer">
    <span>${config.title}</span>
    <a href="${config.pinShortUrl}" target="_blank" rel="noopener noreferrer">Voir sur Pinterest &rarr;</a>
  </div>
</div>

<style>
/* CSS Responsive Ordinateur et Smartphone */
.embampe-video-wrapper {
  width: 100%;
  max-width: 960px;
  margin: 20px auto;
  background: #090d16;
  border: 1px solid rgba(225, 29, 72, 0.4);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  font-family: system-ui, -apple-system, sans-serif;
  color: #fff;
}
.embampe-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.embampe-badge {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: #fb7185;
}
.embampe-download-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(90deg, #e11d48, #2563eb);
  color: #ffffff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 10px;
}
.embampe-player-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000000;
}
.embampe-player-container video {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.embampe-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  font-size: 12px;
  color: #94a3b8;
}
.embampe-footer a {
  color: #fb7185;
  font-weight: 700;
  text-decoration: none;
}
@media (max-width: 640px) {
  .embampe-header, .embampe-footer {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style>`;
  };

  // Generate responsive HTML + CSS embed code
  const getHtmlCode = () => {
    return `<!-- =================================================================== -->
<!-- BANNIÈRE PUBLICITAIRE PINTEREST RESPONSIVE (EMBAMPÉ & BARÇA)           -->
<!-- Lien d'origine: ${config.pinShortUrl} -->
<!-- =================================================================== -->
<div class="pin-ad-container">
  <a href="${config.pinShortUrl}" target="_blank" rel="noopener noreferrer" class="pin-ad-card">
    <div class="pin-ad-header">
      <span class="pin-ad-badge">${config.badgeText || 'Publicité sponsorisée'}</span>
      <span class="pin-ad-brand">
        <svg viewBox="0 0 24 24" class="pin-icon"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" fill="currentColor"/></svg>
        Pinterest
      </span>
    </div>

    <div class="pin-ad-media">
      <img src="${config.imageUrl}" alt="${config.title}" loading="lazy" />
      <span class="pin-tag">Embampé #9</span>
    </div>

    <div class="pin-ad-body">
      <h3 class="pin-title">${config.title}</h3>
      <p class="pin-desc">Regardez les moments forts et le meilleur montage football aesthetic d'Embampé.</p>
      <div class="pin-btn">${config.ctaText || 'Voir sur Pinterest'} &rarr;</div>
    </div>
  </a>
</div>

<style>
/* CSS Responsive Automatique (Mobile, Tablette, PC) */
.pin-ad-container {
  width: 100%;
  max-width: 440px;
  margin: 1.5rem auto;
  box-sizing: border-box;
}
.pin-ad-card {
  display: block;
  text-decoration: none;
  background: linear-gradient(135deg, #0a1128 0%, #150a21 100%);
  border: 1px solid rgba(225, 29, 72, 0.4);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  transition: transform 0.25s ease, border-color 0.25s ease;
  font-family: system-ui, -apple-system, sans-serif;
  color: #ffffff;
}
.pin-ad-card:hover {
  transform: translateY(-3px);
  border-color: rgba(225, 29, 72, 0.8);
}
.pin-ad-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.04);
}
.pin-ad-badge {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  background: #e11d48;
  color: #fff;
  padding: 2px 8px;
  border-radius: 999px;
  letter-spacing: 0.5px;
}
.pin-ad-brand {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  color: #fb7185;
}
.pin-icon {
  width: 14px;
  height: 14px;
}
.pin-ad-media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  background: #000;
  overflow: hidden;
}
.pin-ad-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.pin-ad-card:hover .pin-ad-media img {
  transform: scale(1.03);
}
.pin-tag {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  color: #fbbf24;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
}
.pin-ad-body {
  padding: 14px;
}
.pin-title {
  font-size: 14px;
  font-weight: 700;
  margin: 0 0 6px 0;
  line-height: 1.3;
}
.pin-desc {
  font-size: 12px;
  color: #94a3b8;
  margin: 0 0 12px 0;
  line-height: 1.4;
}
.pin-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(90deg, #e11d48, #004d98);
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(225, 29, 72, 0.3);
}
@media (max-width: 480px) {
  .pin-ad-container {
    max-width: 100%;
    padding: 0 8px;
  }
}
</style>`;
  };

  // Generate React Component
  const getReactCode = () => {
    return `import React from 'react';

export const PinterestResponsiveAd = () => {
  return (
    <div className="w-full max-w-md mx-auto my-6 px-2 sm:px-0">
      <a
        href="${config.pinShortUrl}"
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-br from-slate-950 via-[#0a1128] to-[#1c0b1e] text-white shadow-2xl transition-all duration-300 hover:border-rose-500 hover:shadow-rose-950/40"
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-full">
            ${config.badgeText || 'Publicité sponsorisée'}
          </span>
          <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
            Pinterest Ad
          </span>
        </div>

        {/* Média */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
          <img
            src="${config.imageUrl}"
            alt="${config.title}"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-400">
            Lamine Yamal #19 • FC Barcelone
          </div>
        </div>

        {/* Détails & CTA */}
        <div className="p-4">
          <h3 className="text-sm font-bold line-clamp-2 mb-2 group-hover:text-rose-400 transition-colors">
            ${config.title}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 mb-3">
            ${config.description}
          </p>
          <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-blue-700 hover:from-rose-500 hover:to-blue-600 text-white text-xs font-bold text-center shadow-lg transition-all">
            ${config.ctaText || 'Voir le Pin sur Pinterest'} &rarr;
          </div>
        </div>
      </a>
    </div>
  );
};`;
  };

  // Generate Floating Mobile Sticky Ad code
  const getFloatingCode = () => {
    return `<!-- BANNIÈRE STICKY FLOTTANTE MOBILE (Optimisée pour taux de clic smartphone) -->
<div id="mobile-pin-banner" style="position:fixed;bottom:10px;left:10px;right:10px;z-index:99999;max-width:480px;margin:0 auto;">
  <div style="background:#0a0f1d;border:1px solid #e11d48;border-radius:16px;padding:10px;display:flex;align-items:center;gap:12px;box-shadow:0 10px 30px rgba(0,0,0,0.7);color:#fff;font-family:sans-serif;">
    <img src="${config.imageUrl}" style="width:52px;height:52px;border-radius:10px;object-fit:cover;" alt="Ad" />
    <div style="flex:1;min-width:0;">
      <div style="font-size:9px;text-transform:uppercase;color:#e11d48;font-weight:700;">Publicité Pinterest</div>
      <div style="font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${config.title}</div>
      <div style="font-size:11px;color:#94a3b8;">Lamine Yamal FC Barcelone</div>
    </div>
    <a href="${config.pinShortUrl}" target="_blank" rel="noopener noreferrer" style="background:#e11d48;color:#fff;text-decoration:none;font-size:11px;font-weight:700;padding:8px 12px;border-radius:10px;white-space:nowrap;">
      ${config.ctaText || 'Ouvrir'}
    </a>
    <button onclick="document.getElementById('mobile-pin-banner').style.display='none'" style="background:none;border:none;color:#64748b;font-size:16px;cursor:pointer;padding:4px;">&times;</button>
  </div>
</div>`;
  };

  // Generate Pinterest SDK Widget Code
  const getPinterestSdkCode = () => {
    return `<!-- ======================================================= -->
<!-- WIDGET OFFICIEL PINTEREST EMBED PIN (SDK PINIT.JS)       -->
<!-- ======================================================= -->
<div class="pinterest-responsive-wrapper" style="display:flex;justify-content:center;margin:20px 0;">
  <blockquote class="pinterest-pin" data-pin-width="medium" data-pin-terse="true">
    <a href="${config.pinUrl}">Voir le pin sur Pinterest</a>
  </blockquote>
</div>

<!-- Script SDK officiel Pinterest (A charger une seule fois dans votre page ou avant </body>) -->
<script async defer src="//assets.pinterest.com/js/pinit.js"></script>`;
  };

  const getActiveCode = () => {
    switch (activeTab) {
      case 'video':
        return getVideoCode();
      case 'html':
        return getHtmlCode();
      case 'react':
        return getReactCode();
      case 'floating':
        return getFloatingCode();
      case 'pinterest-sdk':
        return getPinterestSdkCode();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="w-full bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-8 backdrop-blur-md shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400">
              <Code className="w-4 h-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Code Publicitaire & Lecteur Vidéo Prêt à l'Emploi
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Copiez ce code pour intégrer la vidéo Embampé et la bannière Pinterest sur votre site web.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-950/40'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/40 hover:scale-105 active:scale-95'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Code Copié !' : 'Copier le code'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('video')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'video'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Vidéo Embampé (1ère Position + Téléchargement)</span>
        </button>

        <button
          onClick={() => setActiveTab('html')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'html'
              ? 'bg-rose-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Bannière HTML + CSS Autonome</span>
        </button>

        <button
          onClick={() => setActiveTab('floating')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'floating'
              ? 'bg-rose-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Bannière Mobile Flottante</span>
        </button>

        <button
          onClick={() => setActiveTab('react')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'react'
              ? 'bg-rose-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Composant React / Next.js</span>
        </button>

        <button
          onClick={() => setActiveTab('pinterest-sdk')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'pinterest-sdk'
              ? 'bg-rose-600 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Widget Officiel Pinterest (pinit.js)</span>
        </button>
      </div>

      {/* Code Display Area */}
      <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-4 overflow-x-auto">
        <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre">
          {getActiveCode()}
        </pre>
      </div>

      {/* Integration Guide Tips */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>WordPress / Elementor</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Ajoutez un widget « HTML personnalisé », collez le code et publiez. L'encart s'adaptera automatiquement à tous les écrans mobiles.
          </p>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs font-bold text-rose-400 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Shopify / Webflow</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Insérez une section « Custom Liquid » ou un bloc « Embed Code » où vous souhaitez afficher l'offre publicitaire.
          </p>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div className="text-xs font-bold text-blue-400 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>React / Vue / Next.js</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Importez simplement le composant dans vos pages de blogs, bannières d'accueil ou sidebars d'articles.
          </p>
        </div>
      </div>
    </div>
  );
};
