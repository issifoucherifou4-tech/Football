import React, { useState } from 'react';
import { AdConfig } from '../types/ad';
import { ResponsiveAdCard } from './ResponsiveAdCard';
import { FloatingMobileAd } from './FloatingMobileAd';
import { PinterestOfficialEmbed } from './PinterestOfficialEmbed';
import { EmbappeHeroVideo } from './EmbappeHeroVideo';
import { 
  Trophy, 
  Share2, 
  Clock, 
  User, 
  MessageSquare, 
  Bookmark, 
  Eye, 
  TrendingUp, 
  Flame,
  ChevronRight,
  Menu,
  X,
  Search,
  Bell,
  Download
} from 'lucide-react';

interface DemoWebsiteProps {
  adConfig: AdConfig;
  onAdClick: () => void;
  showMobileStickyAd: boolean;
}

export const DemoWebsite: React.FC<DemoWebsiteProps> = ({
  adConfig,
  onAdClick,
  showMobileStickyAd,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Tous');

  const categories = ['Tous', 'Embampé', 'FC Barcelone', 'Real Madrid', 'Lamine Yamal', 'Ligue des Champions'];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-600 selection:text-white">
      {/* Top Ticker / Header Ad Banner Notice */}
      <div className="bg-gradient-to-r from-blue-900 via-rose-900 to-slate-950 text-white text-[11px] sm:text-xs py-2 px-3 flex items-center justify-between border-b border-rose-500/30">
        <div className="flex items-center gap-2 max-w-6xl mx-auto w-full">
          <span className="bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded text-[10px] uppercase shadow">
            EN DIRECT
          </span>
          <span className="truncate font-semibold">
            ⚡ Kylian Mbappé (Le Meilleur Joueur du Monde) : Regardez la vidéo en 1ère position et enregistrez-la sur votre ordinateur !
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Site Brand Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-950/40">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-rose-400 bg-clip-text text-transparent">
                  MBAPPÉ ZONE
                </span>
                <span className="hidden sm:inline-block ml-1 text-[10px] text-amber-400 uppercase font-extrabold tracking-widest bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                  LE MEILLEUR JOUEUR
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors hover:text-white ${
                  activeCategory === cat ? 'text-rose-400 font-bold' : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/videos/mbappe-highlight.mp4"
              download="Embampe-Highlights-Match-Video.mp4"
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-rose-600 to-blue-700 hover:from-rose-500 hover:to-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-transform active:scale-95 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Enregistrer la vidéo</span>
            </a>
            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-800 bg-slate-900 px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === cat
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        {/* ================================================================= */}
        {/* PREMIÈRE POSITION : LECTEUR VIDÉO EMBAMPÉ (Hero Computer & Mobile) */}
        {/* ================================================================= */}
        <EmbappeHeroVideo
          config={adConfig}
          onAdClick={onAdClick}
          defaultTheaterMode={true}
        />

        {/* 2-Column Grid: Main Editorial Article & Responsive Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Article column (8 cols) */}
          <article className="lg:col-span-8 bg-slate-900/60 rounded-3xl border border-slate-800/80 p-5 sm:p-8 backdrop-blur-sm">
            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
              <span className="bg-rose-600/20 text-rose-400 font-bold px-2.5 py-1 rounded-full border border-rose-500/20">
                Kylian Mbappé • Le Meilleur Joueur du Monde
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Il y a 10 minutes
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> 34.8k vues
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white mb-4">
              Kylian Mbappé illumine le football mondial : Le film complet de ses buts légendaires et de son duel au sommet
            </h1>

            {/* Author bar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-200">Kylian Mbappé — Le Meilleur Joueur</h4>
                  <p className="text-[11px] text-slate-400">Édition spéciale vidéo & analyse du match</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors" title="Partager">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors" title="Sauvegarder">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Article Paragraphs */}
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4 text-sm sm:text-base leading-relaxed">
              <p>
                Retrouvez en première position ci-dessus la vidéo intégrale d'<strong>Embampé</strong>. Vitesse fulgurante, appels tranchants dans le dos de la défense et finition chirurgicale : le numéro 9 a livré une prestation XXL. Les visiteurs peuvent regarder le match en direct et enregistrer la vidéo sur leur ordinateur en un clic.
              </p>

              <p>
                Grâce au bouton d'enregistrement dédié, vous pouvez sauvegarder ce chef-d'œuvre vidéo directement dans votre disque dur ou l'ajouter à vos favoris pour le visionner hors-ligne.
              </p>

              {/* IN-ARTICLE NATIVE AD CARD PLACEMENT */}
              <div className="my-8 py-4 border-y border-slate-800/80 bg-slate-950/40 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 fill-rose-500" />
                    Publicité Recommandée dans l'article
                  </span>
                  <span className="text-[10px] text-slate-400">Mobile & Responsive Native Unit</span>
                </div>

                <ResponsiveAdCard
                  config={{ ...adConfig, format: 'infeed' }}
                  onAdClick={onAdClick}
                />
              </div>

              <p>
                "Ce qui rend Lamine unique, ce n'est pas seulement son efficacité statistique, c'est l'émotion brute qu'il procure dès qu'il touche le cuir", confie un analyste de l'académie catalane. Face aux défenses regroupées, son audace et sa créativité rappellent les heures les plus fastes du Camp Nou.
              </p>

              <blockquote className="border-l-4 border-rose-500 pl-4 py-1 italic text-slate-200 font-medium">
                « Quand Lamine Yamal accélère sur son flanc droit, le public retient son souffle. C'est l'essence même du football spectacle que les fans adorent enregistrer et partager. »
              </blockquote>

              <p>
                Les chiffres enregistrés sur les publications et les pins confirment cet engouement sans précédent, confirmant que le phénomène Yamal dépasse largement le simple cadre sportif pour s'imposer dans l'univers de la mode, du design et du lifestyle footballistique.
              </p>
            </div>

            {/* Official Embed Section inside article */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <svg className="w-4 h-4 text-rose-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Intégration directe du Pin officiel
                </h4>
                <span className="text-[11px] text-slate-400">Widget standard Pinterest</span>
              </div>
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-2">
                <PinterestOfficialEmbed
                  pinUrl={adConfig.pinUrl}
                  pinShortUrl={adConfig.pinShortUrl}
                />
              </div>
            </div>
          </article>

          {/* Sidebar column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* SIDEBAR AD FORMAT: Medium Rectangle (300x250) */}
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-4 flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
                <span className="uppercase tracking-widest font-bold text-[10px] text-slate-400">
                  Encart Publicitaire (300x250)
                </span>
                <span className="text-amber-400 font-semibold text-[10px]">Populaire</span>
              </div>

              <ResponsiveAdCard
                config={{ ...adConfig, format: 'medium-rect' }}
                onAdClick={onAdClick}
              />
            </div>

            {/* Trending Articles Sidebar */}
            <div className="bg-slate-900/60 rounded-3xl border border-slate-800/80 p-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-rose-500" />
                Articles les plus consultés
              </h3>

              <div className="space-y-3.5">
                {[
                  {
                    rank: '01',
                    title: 'Pedri et Lamine : La complicité qui dynamite les blocs défensifs',
                    time: '1h',
                    reads: '8.4k',
                  },
                  {
                    rank: '02',
                    title: 'Flick dévoile son plan tactique pour le prochain Clasico',
                    time: '3h',
                    reads: '19.2k',
                  },
                  {
                    rank: '03',
                    title: 'Mercato : Le Barça blinde sa nouvelle pépite avec une clause record',
                    time: '5h',
                    reads: '11.7k',
                  },
                  {
                    rank: '04',
                    title: 'Analyse vidéo : Pourquoi le pied gauche de Yamal est indéchiffrable',
                    time: '8h',
                    reads: '7.1k',
                  },
                ].map((item) => (
                  <div
                    key={item.rank}
                    className="flex items-start gap-3 group cursor-pointer p-2 rounded-xl hover:bg-slate-800/50 transition-colors"
                  >
                    <span className="text-base font-black text-rose-500 font-mono">
                      {item.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-slate-200 group-hover:text-rose-400 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span>{item.time}</span>
                        <span>•</span>
                        <span>{item.reads} lectures</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Script Publicitaire Partenaire du Compte */}
            <div className="bg-slate-900/60 rounded-3xl border border-emerald-500/30 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Script Publicitaire Actif
                </span>
                <span className="text-[10px] text-slate-400 font-mono">afders.org</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug mb-2.5">
                Le code publicitaire fourni est relié à votre compte et s'exécute en arrière-plan.
              </p>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-[10px] font-mono text-emerald-300 truncate">
                https://afders.org/1/a6223f26b4dedfb133cbf0d8ae8ea2ac
              </div>
            </div>

            {/* Newsletter widget */}
            <div className="bg-gradient-to-br from-rose-950/60 to-slate-900/80 rounded-3xl border border-rose-900/30 p-5 text-center">
              <div className="w-10 h-10 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white mb-1">
                Abonnez-vous aux vidéos de Mbappé
              </h4>
              <p className="text-xs text-slate-300 mb-3">
                Recevez directement les compilations et actions d'anthologie du meilleur joueur du monde.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
                <button className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-colors">
                  OK
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Barça Pulse Media. Démonstration publicitaire Pinterest responsive.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://pin.it/2KE27E6XL" target="_blank" rel="noreferrer" className="hover:text-rose-400 transition-colors">
              Pin Source: pin.it/2KE27E6XL
            </a>
            <span>•</span>
            <span className="text-emerald-400">100% Mobile & Responsive</span>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Floating Ad Bar */}
      {showMobileStickyAd && (
        <FloatingMobileAd
          config={adConfig}
          onAdClick={onAdClick}
        />
      )}
    </div>
  );
};
