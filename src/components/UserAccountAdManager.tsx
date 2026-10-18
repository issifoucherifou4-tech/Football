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
  Activity,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BiceaLeaderboardAd } from './BiceaLeaderboardAd';

interface UserAccountAdManagerProps {
  onScriptUpdated?: (scriptUrl: string) => void;
}

export const UserAccountAdManager: React.FC<UserAccountAdManagerProps> = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const adScripts = [
    {
      id: 'bicea-leaderboard',
      name: 'Format Leaderboard (728x90) — bicea.org',
      format: 'Bannière Iframe 728x90',
      network: 'bicea.org',
      key: '3f56ce0bf7cc0dabaab62f805af659a1',
      code: `<script type="text/javascript">
  atOptions = {
    'key' : '3f56ce0bf7cc0dabaab62f805af659a1',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script type="text/javascript" src="https://bicea.org/22/3f56ce0bf7cc0dabaab62f805af659a1"></script>`,
    },
    {
      id: 'afders-direct',
      name: 'Script Partenaire Global — afders.org',
      format: 'Script Asynchrone Global',
      network: 'afders.org',
      key: 'a6223f26b4dedfb133cbf0d8ae8ea2ac',
      code: `<script data-cfasync="false" src="https://afders.org/1/a6223f26b4dedfb133cbf0d8ae8ea2ac"></script>`,
    },
  ];

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#004D98', '#E60023', '#10B981'],
    });
    setTimeout(() => setCopiedIndex(null), 2000);
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
                Mon Compte Publicitaire & Codes Partenaires
              </h2>
              <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                2 Codes Reliés & Actifs
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Les scripts publicitaires fournis sont reliés à votre compte et diffusés en direct sur votre site.
            </p>
          </div>
        </div>
      </div>

      {/* APERÇU DU CODE NOUVELLEMENT AJOUTÉ (728x90 bicea.org) */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Aperçu en Direct du Code Ajouté (Format Leaderboard 728x90)</span>
          </span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
            En Ligne
          </span>
        </div>

        {/* Live rendering of bicea ad */}
        <div className="p-2 bg-slate-900/40 rounded-xl border border-slate-800/80 flex justify-center">
          <BiceaLeaderboardAd showBadge={false} />
        </div>
      </div>

      {/* Liste des Codes Publicitaires Reliés au Compte */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Code className="w-4 h-4 text-emerald-400" />
          <span>Codes Intégrés à votre Compte</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {adScripts.map((ad, idx) => (
            <div
              key={ad.id}
              className="bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-5 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{ad.name}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {ad.format}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                    Clé de campagne : <span className="text-amber-400">{ad.key}</span>
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(ad.code, idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all self-start sm:self-auto ${
                    copiedIndex === idx
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  {copiedIndex === idx ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIndex === idx ? 'Copié !' : 'Copier le code'}</span>
                </button>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto select-all whitespace-pre">
                {ad.code}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tableau de Bord de Monétisation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Impressions Totales</span>
            <Activity className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-lg font-black text-white">62 480</div>
          <span className="text-[10px] text-emerald-400 font-semibold">+24% aujourd'hui</span>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Clics Générés</span>
            <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-lg font-black text-white">2 410</div>
          <span className="text-[10px] text-emerald-400 font-semibold">Fort engagement</span>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Gains Estimés</span>
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-black text-amber-400">188.50 €</div>
          <span className="text-[10px] text-slate-400">2 réseaux actifs</span>
        </div>

        <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Taux de Distribution</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-lg font-black text-emerald-400">100%</div>
          <span className="text-[10px] text-slate-400">Ordinateur & Mobile</span>
        </div>
      </div>
    </div>
  );
};
