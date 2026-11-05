import React, { useState } from 'react';
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  BookOpen,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

export interface PageItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
}

export const PAGES_CATALOG: PageItem[] = [
  { id: 1, slug: 'welcome', title: 'Welcome', subtitle: 'A Private Digital Gift', category: 'Opening' },
  { id: 2, slug: 'countdown', title: 'The Countdown', subtitle: 'Counting Down to Midnight', category: 'Celebration' },
  { id: 3, slug: 'celebration', title: 'Birthday Cake', subtitle: 'Blow Out The Candles', category: 'Celebration' },
  { id: 4, slug: 'special-day', title: 'Her Special Day', subtitle: 'Happiest Birthday Vaishnavi', category: 'Her Day' },
  { id: 5, slug: 'our-world', title: 'Our Little World', subtitle: 'A Storybook Chapter', category: 'Stories' },
  { id: 6, slug: 'memories', title: 'Memories Gallery', subtitle: '15 Scrapbook Polaroids', category: 'Memories' },
  { id: 7, slug: 'photo-stories', title: 'Photo Stories', subtitle: 'Moments Behind The Pictures', category: 'Memories' },
  { id: 8, slug: 'love-letter', title: 'Open My Heart', subtitle: 'Personal Letter from Daksh', category: 'Love Letter' },
  { id: 9, slug: 'why-special', title: 'Why You Are Special', subtitle: '15 Precious Qualities', category: 'Gratitude' },
  { id: 10, slug: 'little-things', title: 'Little Things I Love', subtitle: 'Nuances That Warm The Soul', category: 'Gratitude' },
  { id: 11, slug: 'promises', title: 'My Promises', subtitle: '12 Unspoken Commitments', category: 'Promises' },
  { id: 12, slug: 'wishes', title: '20 Birthday Wishes', subtitle: 'A Dedicated Star For You', category: 'Wishes' },
  { id: 13, slug: 'future-dreams', title: 'Our Future Dreams', subtitle: 'Adventures Waiting Ahead', category: 'Dreams' },
  { id: 14, slug: 'quiz', title: 'A Little Love Quiz', subtitle: '8 Heartwarming Questions', category: 'Interactive' },
  { id: 15, slug: 'virtual-gifts', title: 'Virtual Gift Boxes', subtitle: '5 Interactive Unboxings', category: 'Interactive' },
  { id: 16, slug: 'music-corner', title: 'Music Corner', subtitle: 'Turntable & Soundtrack', category: 'Music' },
  { id: 17, slug: 'secret-surprise', title: 'Secret Surprise', subtitle: 'Hidden Scratch Note', category: 'Surprise' },
  { id: 18, slug: 'final-note', title: 'The Final Love Note', subtitle: 'Daksh Loves You The Most', category: 'Finale' },
];

interface NavigationProps {
  currentPage: number;
  onPageChange: (pageId: number) => void;
  viewMode: 'single' | 'continuous';
  onToggleViewMode: () => void;
  recipientName: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  viewMode,
  onToggleViewMode,
  recipientName,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activePage = PAGES_CATALOG.find((p) => p.id === currentPage) || PAGES_CATALOG[0];

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < PAGES_CATALOG.length) {
      onPageChange(currentPage + 1);
    }
  };

  const handleSelectPage = (id: number) => {
    onPageChange(id);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Top Desktop Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-[#F4A6B8]/30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo Branding */}
          <div
            onClick={() => onPageChange(1)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C65B7C] to-[#F4A6B8] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="font-dancing text-xl font-bold text-[#49313D] tracking-wide block leading-none">
                For {recipientName}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#C65B7C] font-semibold">
                With Love • 18 Pages
              </span>
            </div>
          </div>

          {/* Quick Category Buttons (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs">
            {[
              { label: 'Her Day', pageId: 4 },
              { label: 'Memories', pageId: 6 },
              { label: 'Letter', pageId: 8 },
              { label: 'Special (15)', pageId: 9 },
              { label: 'Promises', pageId: 11 },
              { label: '20 Wishes', pageId: 12 },
              { label: 'Quiz', pageId: 14 },
              { label: 'Gifts', pageId: 15 },
              { label: 'Finale', pageId: 18 },
            ].map((nav) => (
              <button
                key={nav.pageId}
                onClick={() => onPageChange(nav.pageId)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                  currentPage === nav.pageId
                    ? 'bg-[#FFE4EC] text-[#C65B7C] font-bold shadow-2xs'
                    : 'text-[#6d4d5e] hover:text-[#49313D] hover:bg-[#FFF0F5]'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Single Page Storybook vs Continuous Scroll */}
            <button
              onClick={onToggleViewMode}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#C65B7C] text-xs font-semibold border border-[#F4A6B8]/30 transition-colors cursor-pointer"
              title={
                viewMode === 'single'
                  ? 'Switch to continuous scroll mode'
                  : 'Switch to page-by-page storybook mode'
              }
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {viewMode === 'single' ? 'Storybook Mode' : 'Continuous Mode'}
              </span>
            </button>

            {/* Menu Drawer Toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C65B7C] text-white hover:bg-[#a83c5d] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              aria-label="Open directory of all 18 pages"
            >
              <Menu className="w-3.5 h-3.5" />
              <span>18 Pages</span>
            </button>
          </div>
        </div>
      </header>

      {/* Floating Bottom Navigator for Mobile & Desktop Navigation */}
      <nav aria-label="Page navigation" className="fixed bottom-4 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#F4A6B8]/50 shadow-romantic-lg max-w-sm w-full justify-between">
          {/* Previous Page Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className="w-8 h-8 rounded-full bg-[#FFE4EC] hover:bg-[#FADADD] text-[#C65B7C] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page Counter & Title Button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex-1 px-2 text-center truncate cursor-pointer group"
          >
            <span className="text-[10px] uppercase tracking-wider text-[#C65B7C] font-bold block">
              Page {activePage.id} of {PAGES_CATALOG.length}
            </span>
            <span className="font-playfair text-xs font-bold text-[#49313D] truncate block group-hover:text-[#C65B7C]">
              {activePage.title}
            </span>
          </button>

          {/* Next Page Button */}
          <button
            onClick={handleNext}
            disabled={currentPage >= PAGES_CATALOG.length}
            className="w-8 h-8 rounded-full bg-[#C65B7C] hover:bg-[#a83c5d] text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Slide-out Table of Contents / 18 Pages Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white max-w-md w-full h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#F4A6B8]/30 bg-gradient-to-r from-[#FFF0F5] to-[#FFE4EC] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C65B7C] font-bold block">
                  Index of Chapters
                </span>
                <h3 className="font-playfair text-xl font-bold text-[#49313D]">
                  All 18 Experiences
                </h3>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#49313D] flex items-center justify-center cursor-pointer shadow-2xs"
                aria-label="Close page menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of 18 Pages */}
            <div className="p-4 overflow-y-auto flex-1 space-y-2">
              {PAGES_CATALOG.map((page) => {
                const isActive = page.id === currentPage;

                return (
                  <div
                    key={page.id}
                    onClick={() => handleSelectPage(page.id)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#FFE4EC] border-[#C65B7C] shadow-xs'
                        : 'bg-[#FFFDFB] hover:bg-[#FFF0F5] border-gray-100 hover:border-[#F4A6B8]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                          isActive
                            ? 'bg-[#C65B7C] text-white'
                            : 'bg-white text-[#8a687a] border border-[#F4A6B8]/40'
                        }`}
                      >
                        {page.id}
                      </span>
                      <div>
                        <h4
                          className={`font-playfair text-sm font-bold ${
                            isActive ? 'text-[#C65B7C]' : 'text-[#49313D]'
                          }`}
                        >
                          {page.title}
                        </h4>
                        <p className="text-[11px] text-[#8a687a]">{page.subtitle}</p>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-[#C65B7C] font-semibold bg-white/70 px-2 py-0.5 rounded-full border border-[#F4A6B8]/30">
                      {page.category}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
              <span className="font-dancing text-base text-[#C65B7C]">
                DAKSH LOVES YOU THE MOST ♡
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
