import React from 'react';
import { 
  Palette, 
  Layout, 
  Sparkles, 
  Link2, 
  CheckCircle2, 
  MousePointerClick, 
  BarChart3, 
  RotateCcw,
  Sliders,
  Flame,
  ShieldCheck
} from 'lucide-react';
import { AdConfig, AdFormat, AdTheme, AdMetrics } from '../types/ad';

interface AdStudioCustomizerProps {
  config: AdConfig;
  onChange: (newConfig: AdConfig) => void;
  metrics: AdMetrics;
  onResetMetrics: () => void;
}

export const AdStudioCustomizer: React.FC<AdStudioCustomizerProps> = ({
  config,
  onChange,
  metrics,
  onResetMetrics,
}) => {
  const ctaPresets = [
    'Voir sur Pinterest',
    'Découvrir la vidéo',
    'Regarder le match',
    'Acheter le maillot #19',
    'En savoir plus',
  ];

  const badgePresets = [
    'Publicité sponsorisée',
    'Sponsorisé',
    'Tendance #1',
    'Édit Exclusif',
    'Partenariat',
  ];

  const updateField = <K extends keyof AdConfig>(key: K, value: AdConfig[K]) => {
    onChange({
      ...config,
      [key]: value,
    });
  };

  return (
    <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-6 backdrop-blur-md space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Personnalisation de la Publicité</h3>
            <p className="text-xs text-slate-400">Adaptez le design et les textes à votre site</p>
          </div>
        </div>
      </div>

      {/* Target URL input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Link2 className="w-3.5 h-3.5 text-rose-500" />
          <span>Lien Publicitaire Pinterest</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={config.pinShortUrl}
            onChange={(e) => updateField('pinShortUrl', e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
            placeholder="https://pin.it/..."
          />
          <span className="absolute right-3 top-2.5 text-[10px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Validé
          </span>
        </div>
        <p className="text-[10px] text-slate-400">
          Redirige directement vers le pin Lamine Yamal ({config.pinShortUrl}).
        </p>
      </div>

      {/* Format Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Layout className="w-3.5 h-3.5 text-rose-500" />
          <span>Format d'Affichage Responsive</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'infeed', label: 'Carte In-Feed (Mobile)' },
            { id: 'floating-mobile', label: 'Bannière Flottante' },
            { id: 'medium-rect', label: 'Encart 300x250' },
            { id: 'hero-billboard', label: 'Bannière Billboard' },
            { id: 'official-embed', label: 'Widget Pinterest' },
          ].map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => updateField('format', fmt.id as AdFormat)}
              className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                config.format === fmt.id
                  ? 'bg-rose-600/20 border-rose-500 text-white shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-rose-500" />
          <span>Thème Graphique</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'barca', label: 'FC Barcelone', color: 'from-blue-700 to-rose-700' },
            { id: 'dark', label: 'Dark Titane', color: 'from-slate-800 to-slate-950' },
            { id: 'sunset', label: 'Sunset Or', color: 'from-amber-600 to-rose-600' },
            { id: 'light', label: 'Minimal Clair', color: 'from-slate-100 to-white text-slate-900' },
          ].map((th) => (
            <button
              key={th.id}
              onClick={() => updateField('theme', th.id as AdTheme)}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                config.theme === th.id
                  ? 'border-rose-500 ring-2 ring-rose-500/20 text-white'
                  : 'border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${th.color} border border-white/20 shrink-0`} />
              <span className="truncate">{th.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Titre de la vidéo & publicité */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300">
          Titre de la Vidéo & Publicité
        </label>
        <input
          type="text"
          value={config.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-bold"
          placeholder="Ex: Embampé"
        />
        <div className="flex flex-wrap gap-1.5">
          {[
            'Embampé',
            'Embampé — Match Highlights & Buts',
            'Embampé Édition Spéciale 2026',
            'Kylian Embampé • Skills & Buts',
          ].map((titleOption) => (
            <button
              key={titleOption}
              onClick={() => updateField('title', titleOption)}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-rose-300 px-2 py-1 rounded-md transition-colors font-medium"
            >
              {titleOption}
            </button>
          ))}
        </div>
      </div>

      {/* Call to Action Text */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300">
          Texte du Bouton d'Action (Call To Action)
        </label>
        <input
          type="text"
          value={config.ctaText}
          onChange={(e) => updateField('ctaText', e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
          placeholder="Ex: Voir sur Pinterest"
        />
        <div className="flex flex-wrap gap-1.5">
          {ctaPresets.map((text) => (
            <button
              key={text}
              onClick={() => updateField('ctaText', text)}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md transition-colors"
            >
              {text}
            </button>
          ))}
        </div>
      </div>

      {/* Badge Text */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-300">
          Libellé de la mention publicitaire
        </label>
        <input
          type="text"
          value={config.badgeText}
          onChange={(e) => updateField('badgeText', e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
          placeholder="Ex: Publicité sponsorisée"
        />
        <div className="flex flex-wrap gap-1.5">
          {badgePresets.map((badge) => (
            <button
              key={badge}
              onClick={() => updateField('badgeText', badge)}
              className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded-md transition-colors"
            >
              {badge}
            </button>
          ))}
        </div>
      </div>

      {/* Live Metrics & Analytics Simulator */}
      <div className="pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Simulateur de Performance & Clics</span>
          </span>
          <button
            onClick={onResetMetrics}
            className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Remettre à zéro</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400">Impressions</div>
            <div className="text-sm font-black text-white">{metrics.impressions.toLocaleString()}</div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400">Clics réels</div>
            <div className="text-sm font-black text-rose-400 flex items-center justify-center gap-1">
              <MousePointerClick className="w-3 h-3" />
              <span>{metrics.clicks}</span>
            </div>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400">Taux CTR</div>
            <div className="text-sm font-black text-emerald-400">
              {metrics.impressions > 0
                ? ((metrics.clicks / metrics.impressions) * 100).toFixed(1)
                : '0.0'}%
            </div>
          </div>
        </div>
        <p className="text-[10px] text-slate-500 mt-2 text-center">
          Cliquez sur n'importe quelle publicité pour tester l'ouverture du lien et l'incrémentation en direct.
        </p>
      </div>
    </div>
  );
};
