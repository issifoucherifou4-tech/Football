/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Globe, 
  Code2, 
  ExternalLink, 
  Layers, 
  CheckCircle, 
  Flame,
  LayoutGrid,
  Laptop,
  Download
} from 'lucide-react';
import { AdConfig, AdMetrics, DeviceMode } from './types/ad';
import { EmbappeHeroVideo } from './components/EmbappeHeroVideo';
import { ResponsiveAdCard } from './components/ResponsiveAdCard';
import { FloatingMobileAd } from './components/FloatingMobileAd';
import { PinterestOfficialEmbed } from './components/PinterestOfficialEmbed';
import { DemoWebsite } from './components/DemoWebsite';
import { DeviceSimulator } from './components/DeviceSimulator';
import { CodeSnippetExporter } from './components/CodeSnippetExporter';
import { AdStudioCustomizer } from './components/AdStudioCustomizer';
import { UserAccountAdManager } from './components/UserAccountAdManager';
import { BiceaLeaderboardAd } from './components/BiceaLeaderboardAd';
import { UserCheck } from 'lucide-react';

export default function App() {
  // Configuration avec le Meilleur Joueur du Monde (Kylian Mbappé) et vidéo directe
  const [adConfig, setAdConfig] = useState<AdConfig>({
    pinUrl: 'https://www.pinterest.com/pin/981362575088565282/',
    pinShortUrl: 'https://pin.it/2KE27E6XL',
    pinId: '981362575088565282',
    title: 'Kylian Mbappé — Le Meilleur Joueur du Monde',
    description: 'Visionnez en direct les plus beaux buts, accélérations et gestes techniques de Kylian Mbappé, le meilleur joueur du monde. Enregistrez la vidéo sur votre ordinateur et diffusez la publicité responsive.',
    author: 'Kylian Mbappé Zone & Pinterest',
    imageUrl: 'https://i.pinimg.com/736x/a1/7c/ab/a17cab6517e32b678c941081c197dfcb.jpg',
    videoUrl: '/videos/mbappe-highlight.mp4',
    videoDownloadUrl: '/videos/mbappe-highlight.mp4',
    ctaText: 'Regarder sur Pinterest',
    badgeText: 'Le Meilleur Joueur',
    theme: 'barca',
    format: 'infeed',
    enableAnimation: true,
    showMetrics: true,
  });

  const [activeTab, setActiveTab] = useState<'demo' | 'formats' | 'account' | 'code'>('demo');
  // Affichage ordinateur par défaut ("fai la sur l'ordinateur")
  const [activeDevice, setActiveDevice] = useState<DeviceMode>('desktop');
  const [showMobileStickyAd, setShowMobileStickyAd] = useState<boolean>(true);

  const [metrics, setMetrics] = useState<AdMetrics>({
    impressions: 12480,
    clicks: 412,
    saves: 4820,
    ctr: 3.3,
  });

  const handleAdClick = () => {
    setMetrics(prev => ({
      ...prev,
      clicks: prev.clicks + 1,
      impressions: prev.impressions + 1,
      ctr: Number((((prev.clicks + 1) / (prev.impressions + 1)) * 100).toFixed(1)),
    }));
  };

  const handleResetMetrics = () => {
    setMetrics({
      impressions: 1000,
      clicks: 0,
      saves: 4820,
      ctr: 0,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-600 selection:text-white">
      {/* En-tête Supérieur */}
      <header className="bg-slate-900/95 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Titre Meilleur Joueur */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-700 to-blue-700 flex items-center justify-center shadow-lg shadow-rose-950/40">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  Kylian Mbappé — Le Meilleur Joueur
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/30">
                  Vidéo & Publicité
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Titre : <span className="font-bold text-white">Kylian Mbappé (Le Meilleur Joueur du Monde)</span> • Script afders.org relié
              </p>
            </div>
          </div>

          {/* Onglets de Navigation en Français */}
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('demo')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'demo'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Site Démo</span>
            </button>

            <button
              onClick={() => setActiveTab('formats')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'formats'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Formats & Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'account'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Mon Compte & Script</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'code'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code & Export</span>
            </button>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="/videos/mbappe-highlight.mp4"
              download="Embampe-Highlights-Match-Video.mp4"
              className="flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-blue-700 hover:from-rose-500 hover:to-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-md active:scale-95"
              title="Enregistrer la vidéo sur votre ordinateur"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Enregistrer la vidéo</span>
            </a>

            <a
              href={adConfig.pinShortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-2 rounded-xl transition-transform hover:scale-105 active:scale-95 border border-white/10"
              title="Voir le pin sur Pinterest"
            >
              <span>Ouvrir Pin</span>
              <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
        {/* ================================================================= */}
        {/* TAB 1: SITE DEMO EN DIRECT (With Device Simulator)                 */}
        {/* ================================================================= */}
        {activeTab === 'demo' && (
          <div className="space-y-6">
            {/* Banner info */}
            <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-rose-950/80 rounded-2xl border border-rose-500/20 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    Vidéo Embampé en 1ère Position — Optimisée Ordinateur & Mobile
                  </h2>
                </div>
                <p className="text-xs text-slate-300">
                  La vidéo <strong className="text-rose-400">Embampé</strong> est positionnée tout en haut de la page. Les visiteurs peuvent la regarder directement et cliquer sur <strong className="text-white">Enregistrer la vidéo</strong> pour la télécharger sur leur ordinateur.
                </p>
              </div>

              {/* Sticky bottom toggle */}
              <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-800 shrink-0">
                <span className="text-xs text-slate-300 font-semibold">Bannière mobile flottante</span>
                <button
                  onClick={() => setShowMobileStickyAd(!showMobileStickyAd)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    showMobileStickyAd ? 'bg-rose-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      showMobileStickyAd ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Device Simulator rendering the Demo Website (Defaults to desktop computer) */}
            <DeviceSimulator
              activeDevice={activeDevice}
              onDeviceChange={setActiveDevice}
            >
              <DemoWebsite
                adConfig={adConfig}
                onAdClick={handleAdClick}
                showMobileStickyAd={showMobileStickyAd}
              />
            </DeviceSimulator>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: FORMATS PUBLICITAIRES & STUDIO DE PERSONNALISATION          */}
        {/* ================================================================= */}
        {activeTab === 'formats' && (
          <div className="space-y-8">
            {/* POSITION 1 HERO VIDEO IN FORMATS TAB TOO */}
            <EmbappeHeroVideo
              config={adConfig}
              onAdClick={handleAdClick}
              defaultTheaterMode={false}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Formats Showcase */}
              <div className="lg:col-span-7 space-y-8">
                {/* Format 1: In-feed Mobile Card */}
                <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-rose-500" />
                        Format In-Feed Mobile Natif : Embampé
                      </h3>
                    <p className="text-xs text-slate-400">
                      Parfait pour les flux d'actualités, réseaux sociaux et blogs mobiles.
                    </p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-1 rounded-full border border-emerald-500/20">
                    Haut Taux de Clic (CTR 3.8%)
                  </span>
                </div>

                <div className="flex justify-center py-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-2">
                  <ResponsiveAdCard
                    config={{ ...adConfig, format: 'infeed' }}
                    onAdClick={handleAdClick}
                  />
                </div>
              </div>

              {/* Format 2: Medium Rectangle 300x250 */}
              <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <LayoutGrid className="w-4 h-4 text-amber-500" />
                      Format Encart Rectangulaire (300x250 IAB)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Format universel pour les colonnes latérales et coupures de paragraphes.
                    </p>
                  </div>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 font-bold px-2 py-1 rounded-full border border-blue-500/20">
                    Standard Web
                  </span>
                </div>

                <div className="flex justify-center py-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-2">
                  <ResponsiveAdCard
                    config={{ ...adConfig, format: 'medium-rect' }}
                    onAdClick={handleAdClick}
                  />
                </div>
              </div>

              {/* Format 3: Hero Billboard Banner */}
              <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Laptop className="w-4 h-4 text-purple-400" />
                      Bannière Horizontale Billboard
                    </h3>
                    <p className="text-xs text-slate-400">
                      Idéale pour le haut de page, milieu d'article ou pied d'article.
                    </p>
                  </div>
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 font-bold px-2 py-1 rounded-full border border-purple-500/20">
                    Visibilité Maximale
                  </span>
                </div>

                <ResponsiveAdCard
                  config={{ ...adConfig, format: 'hero-billboard' }}
                  onAdClick={handleAdClick}
                />
              </div>

              {/* Format 4: Official Pinterest SDK Embed */}
              <div className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <svg className="w-4 h-4 text-rose-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                      </svg>
                      Widget Officiel Pinterest (SDK pinit.js)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Rendu officiel directement fourni par Pinterest.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4">
                  <PinterestOfficialEmbed
                    pinUrl={adConfig.pinUrl}
                    pinShortUrl={adConfig.pinShortUrl}
                  />
                </div>
              </div>

              {/* Format 5: Bannière Partenaire 728x90 (bicea.org) */}
              <div className="bg-slate-900/60 rounded-3xl border border-emerald-500/30 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Format Leaderboard 728x90 (Code Partenaire bicea.org)
                    </h3>
                    <p className="text-xs text-slate-400">
                      Bannière publicitaire iframe responsive avec ajustement automatique sur mobile.
                    </p>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-1 rounded-full border border-emerald-500/20">
                    Nouveau Code Actif
                  </span>
                </div>

                <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex justify-center">
                  <BiceaLeaderboardAd showBadge={false} />
                </div>
              </div>
            </div>

            {/* Right Column: Customizer & Metrics */}
            <div className="lg:col-span-5 sticky top-24">
              <AdStudioCustomizer
                config={adConfig}
                onChange={setAdConfig}
                metrics={metrics}
                onResetMetrics={handleResetMetrics}
              />
            </div>
          </div>
        </div>
        )}

        {/* ================================================================= */}
        {/* ONGLET MON COMPTE & SCRIPT PUBLICITAIRE                          */}
        {/* ================================================================= */}
        {activeTab === 'account' && (
          <div className="space-y-6">
            <UserAccountAdManager />
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: CODE SNIPPET EXPORTER & GUIDE                               */}
        {/* ================================================================= */}
        {activeTab === 'code' && (
          <div className="space-y-6">
            <CodeSnippetExporter config={adConfig} />
          </div>
        )}
      </div>
    </div>
  );
}
