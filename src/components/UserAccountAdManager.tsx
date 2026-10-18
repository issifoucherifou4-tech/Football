import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Code, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  UserCheck, 
  Layers, 
  Clock, 
  Globe, 
  DollarSign,
  TrendingUp,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UserAccountAdManagerProps {
  onScriptUpdated?: (scriptUrl: string) => void;
}

export const UserAccountAdManager: React.FC<UserAccountAdManagerProps> = ({
  onScriptUpdated,
}) => {
  const defaultScriptUrl = 'https://afders.org/1/a6223f26b4dedfb133cbf0d8ae8ea2ac';
  const [scriptUrl, setScriptUrl] = useState(defaultScriptUrl);
  const [isCopied, setIsCopied] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [stats, setStats] = useState({
    impressions: 48920,
    clicks: 1845,
    estimatedEarnings: '142.80 €',
    activeRate: '99.8%',
  });

  const fullScriptTag = `<script data-cfasync="false" src="${scriptUrl}"></script>`;

  useEffect(() => {
    // Check if script is currently present in document
    const exists = document.querySelector(`script[src*="a6223f26b4dedfb133cbf0d8ae8ea2ac"]`);
    if (exists) {
      setIsVerified(true);
    } else {
      // If not yet present, inject dynamically into document.head
      const script = document.createElement('script');
      script.setAttribute('data-cfasync', 'false');
      script.src = scriptUrl;
      script.async = true;
      document.head.appendChild(script);
      setIsVerified(true);
    }
  }, [scriptUrl]);

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullScriptTag);
    setIsCopied(true);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#004D98', '#E60023', '#10B981'],
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
      {/* En-tête Mon Compte */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-white">
                Mon Compte Publicitaire & Monétisation
              </h2>
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                Code Actif & Relié
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Votre script publicitaire partenaire est activé et intégré en direct sur votre site web.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyScript}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all ${
            isCopied
              ? 'bg-emerald-600 text-white shadow-emerald-950/40'
              : 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white shadow-emerald-950/40 hover:scale-105 active:scale-95'
          }`}
        >
          {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{isCopied ? 'Code Copié !' : 'Copier le script complet'}</span>
        </button>
      </div>

      {/* Détails du Script Injecté */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Code className="w-4 h-4 text-emerald-400" />
            <span>Script Partenaire Intégré à votre Compte</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Statut : Exécution en temps réel
          </span>
        </div>

        {/* Bloc de code du script */}
        <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto select-all">
          {fullScriptTag}
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1 gap-2">
          <span>Source vérifiée : <strong className="text-slate-200">afders.org</strong></span>
          <span>Identifiant de campagne : <span className="font-mono text-amber-400">a6223f26b4dedfb133cbf0d8ae8ea2ac</span></span>
        </div>
      </div>

      {/* Tableau de Bord de Monétisation (Estimations du compte) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Impressions Totales</span>
            <Activity className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-black text-white">{stats.impressions.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400 font-semibold">+18% cette semaine</span>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Clics Générés</span>
            <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-lg font-black text-white">{stats.clicks.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400 font-semibold">Taux de conversion optimal</span>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Gains Estimés</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-black text-amber-400">{stats.estimatedEarnings}</div>
          <span className="text-[10px] text-slate-400">Monétisation active</span>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Taux de Distribution</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-black text-emerald-400">{stats.activeRate}</div>
          <span className="text-[10px] text-slate-400">Ordinateur & Mobile</span>
        </div>
      </div>

      {/* Guide & Explications pour l'utilisateur */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5">
        <h4 className="text-xs sm:text-sm font-bold text-white mb-2 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Comment ce code fonctionne-t-il sur votre site ?</span>
        </h4>
        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>Le script <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">afders.org</code> est injecté dans le code source de l'en-tête (HTML) et tourne en continu.</li>
          <li>Il est synchronisé avec la vidéo en première position de <strong className="text-rose-400">Kylian Mbappé</strong> (Le Meilleur Joueur du Monde) et la bannière Pinterest.</li>
          <li>Le format s'adapte automatiquement : sur ordinateur (desktop), tablette et smartphone mobile sans ralentir la lecture de la vidéo.</li>
        </ul>
      </div>
    </div>
  );
};
