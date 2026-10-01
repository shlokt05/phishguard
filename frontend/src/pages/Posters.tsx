import React, { useEffect, useState } from 'react';
import { Search, Download, Share2, Shield, Eye, Filter } from 'lucide-react';
import { apiService } from '../services/api';
import { Poster } from '../types';
import { PosterModal } from '../components/PosterModal';

export const Posters: React.FC = () => {
  const [posters, setPosters] = useState<Poster[]>([]);
  const [filteredPosters, setFilteredPosters] = useState<Poster[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPoster, setSelectedPoster] = useState<Poster | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Phishing',
    'Fake Websites',
    'Password Safety',
    'OTP Safety',
    'Online Scams',
    'Cyber Safety'
  ];

  useEffect(() => {
    apiService.getPosters().then(data => {
      setPosters(data);
      setFilteredPosters(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = posters;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        p => p.title.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)
      );
    }

    setFilteredPosters(result);
  }, [searchQuery, selectedCategory, posters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-xs font-bold text-brand-400">
          <Shield className="w-4 h-4" /> Awareness Campaign Assets
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          AWARENESS POSTER GALLERY
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          High-resolution educational cybersecurity awareness posters designed for print, digital signboards, social media campaigns, and college notice boards.
        </p>
      </div>

      {/* FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 custom-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posters..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500 transition"
          />
        </div>

      </div>

      {/* POSTER GRID */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-500"></div>
        </div>
      ) : filteredPosters.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
          No posters match your filter criteria. Try resetting the category filter or search terms.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPosters.map((poster) => (
            <div
              key={poster.id}
              onClick={() => setSelectedPoster(poster)}
              className={`cursor-pointer rounded-2xl p-6 bg-gradient-to-br ${poster.bg_gradient} border border-white/10 shadow-xl flex flex-col justify-between aspect-[3/4] text-white hover:scale-[1.02] transition-transform duration-200 group relative overflow-hidden`}
            >
              {/* Top Tag */}
              <div className="flex items-center justify-between z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
                  {poster.category}
                </span>
                <Shield className="w-4 h-4 text-white/80" />
              </div>

              {/* Main Typography */}
              <div className="my-auto space-y-3 z-10 text-center">
                <h3 className="font-extrabold text-xl uppercase tracking-tight leading-tight">
                  {poster.title}
                </h3>
                <p className="text-xs text-white/90 line-clamp-3 leading-relaxed">
                  "{poster.tagline}"
                </p>
              </div>

              {/* Action Prompt */}
              <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold z-10 text-white/90">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-brand-300" /> Preview
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-3.5 h-3.5 text-brand-300" /> Download
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Preview Modal */}
      <PosterModal poster={selectedPoster} onClose={() => setSelectedPoster(null)} />

    </div>
  );
};
