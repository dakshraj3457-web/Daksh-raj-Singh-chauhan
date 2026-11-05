import React, { useState, useEffect, useCallback } from 'react';
import { loadSavedConfig, BirthdayConfig } from './config/birthdayConfig';
import { BackgroundEffects } from './components/BackgroundEffects';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { CountdownSection } from './components/CountdownSection';
import { HeroSection } from './components/HeroSection';
import { LoveLetterSection } from './components/LoveLetterSection';
import { MemoryGallery } from './components/MemoryGallery';
import { ReasonsSection } from './components/ReasonsSection';
import { PromisesSection } from './components/PromisesSection';
import { SurpriseModal } from './components/SurpriseModal';
import { FinalScreen } from './components/FinalScreen';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer';
import { CreatorPanel } from './components/CreatorPanel';
import { Navigation, PAGES_CATALOG } from './components/Navigation';

// New upgraded pages
import { CakePage } from './components/pages/CakePage';
import { StorybookPage } from './components/pages/StorybookPage';
import { PhotoStoriesPage } from './components/pages/PhotoStoriesPage';
import { LittleThingsPage } from './components/pages/LittleThingsPage';
import { WishesPage } from './components/pages/WishesPage';
import { FutureDreamsPage } from './components/pages/FutureDreamsPage';
import { QuizPage } from './components/pages/QuizPage';
import { VirtualGiftsPage } from './components/pages/VirtualGiftsPage';
import { MusicPage } from './components/pages/MusicPage';
import { SecretSurprisePage } from './components/pages/SecretSurprisePage';

import { romanticAudio } from './utils/audio';

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(() => loadSavedConfig());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('continuous');
  const [burstCount, setBurstCount] = useState(0);
  const [forceBirthdayMode, setForceBirthdayMode] = useState(false);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  // Sync state with URL params and hash on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get('autostart') === '1') {
        setCurrentPage(2);
      }
      const pageParam = searchParams.get('page');
      if (pageParam) {
        const pNum = parseInt(pageParam, 10);
        if (pNum >= 1 && pNum <= PAGES_CATALOG.length) {
          setCurrentPage(pNum);
        }
      }
      if (searchParams.get('creator') === '1' || window.location.hash === '#creator') {
        setIsCreatorOpen(true);
      }

      // Hash listener for #page-X
      const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash === '#creator') {
          setIsCreatorOpen(true);
        } else if (hash.startsWith('#page-')) {
          const pageNum = parseInt(hash.replace('#page-', ''), 10);
          if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= PAGES_CATALOG.length) {
            setCurrentPage(pageNum);
          }
        }
      };

      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  const triggerCelebrationBurst = useCallback(() => {
    setBurstCount((prev) => prev + 1);
  }, []);

  const handlePageChange = (pageId: number) => {
    setCurrentPage(pageId);
    if (typeof window !== 'undefined') {
      window.location.hash = `page-${pageId}`;
    }
    if (viewMode === 'continuous') {
      const el = document.getElementById(`section-page-${pageId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEnvelopeOpen = () => {
    setCurrentPage(2);
    triggerCelebrationBurst();
    romanticAudio.play();
  };

  const handleReplayStory = () => {
    setCurrentPage(1);
    window.location.hash = 'page-1';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'single' ? 'continuous' : 'single'));
  };

  return (
    <div className="relative min-h-screen bg-[#FFF0F5] text-[#49313D] selection:bg-[#F4A6B8]/30 selection:text-[#C65B7C] overflow-x-hidden font-sans pb-24">
      {/* Background Floating Canvas Hearts & Confetti System */}
      <BackgroundEffects burstTrigger={burstCount} />

      {/* Floating Audio Player Capsule */}
      <FloatingMusicPlayer />

      {/* Navigation Bar (Desktop Header + Mobile Bottom Bar + 18 Pages Drawer) */}
      <Navigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
        recipientName={config.recipientName}
      />

      {/* Page 1 Opening Envelope (Always overlays if on Page 1) */}
      {currentPage === 1 && (
        <OpeningEnvelope
          recipientName={config.recipientName}
          onOpen={handleEnvelopeOpen}
        />
      )}

      {/* Main Experience Router */}
      {viewMode === 'single' ? (
        /* Single-Page Storybook Mode (Focus on one page at a time) */
        <main className="max-w-6xl mx-auto px-4 pt-6 transition-all duration-500 animate-in fade-in">
          {currentPage === 1 && (
            <OpeningEnvelope
              recipientName={config.recipientName}
              onOpen={handleEnvelopeOpen}
            />
          )}

          {currentPage === 2 && (
            <div id="section-page-2">
              <CountdownSection
                targetDateISO={config.targetDateISO}
                recipientName={config.recipientName}
                timezoneLabel={config.timezoneLabel}
                onCelebrationTrigger={triggerCelebrationBurst}
                forceBirthdayMode={forceBirthdayMode}
              />
            </div>
          )}

          {currentPage === 3 && (
            <div id="section-page-3">
              <CakePage
                recipientName={config.recipientName}
                celebrationPhotoUrl={config.celebrationPhotoUrl}
                onTriggerBurst={triggerCelebrationBurst}
              />
            </div>
          )}

          {currentPage === 4 && (
            <div id="section-page-4">
              <HeroSection
                recipientName={config.recipientName}
                heroHeading={config.heroHeading}
                heroSubtitle={config.heroSubtitle}
                heroTagline={config.heroTagline}
                heroPhotoUrl={config.heroPhotoUrl}
                onScrollClick={() => handlePageChange(5)}
              />
            </div>
          )}

          {currentPage === 5 && (
            <div id="section-page-5">
              <StorybookPage
                recipientName={config.recipientName}
                intro={config.storybookIntro}
                scrapbookPhotos={config.scrapbookPhotos}
              />
            </div>
          )}

          {currentPage === 6 && (
            <div id="section-page-6">
              <MemoryGallery photos={config.galleryPhotos} />
            </div>
          )}

          {currentPage === 7 && (
            <div id="section-page-7">
              <PhotoStoriesPage stories={config.photoStories} />
            </div>
          )}

          {currentPage === 8 && (
            <div id="section-page-8">
              <LoveLetterSection
                title={config.letterTitle}
                salutation={config.letterSalutation}
                bodyText={config.letterBody}
                signature={config.letterSignature}
                highlightText={config.letterHighlight}
              />
            </div>
          )}

          {currentPage === 9 && (
            <div id="section-page-9">
              <ReasonsSection reasons={config.reasons} />
            </div>
          )}

          {currentPage === 10 && (
            <div id="section-page-10">
              <LittleThingsPage
                items={config.littleThings}
                recipientName={config.recipientName}
              />
            </div>
          )}

          {currentPage === 11 && (
            <div id="section-page-11">
              <PromisesSection promises={config.promises} />
            </div>
          )}

          {currentPage === 12 && (
            <div id="section-page-12">
              <WishesPage
                wishes={config.wishes}
                recipientName={config.recipientName}
              />
            </div>
          )}

          {currentPage === 13 && (
            <div id="section-page-13">
              <FutureDreamsPage dreams={config.futureDreams} />
            </div>
          )}

          {currentPage === 14 && (
            <div id="section-page-14">
              <QuizPage
                questions={config.quizQuestions}
                recipientName={config.recipientName}
                onTriggerBurst={triggerCelebrationBurst}
              />
            </div>
          )}

          {currentPage === 15 && (
            <div id="section-page-15">
              <VirtualGiftsPage
                gifts={config.virtualGifts}
                recipientName={config.recipientName}
                onTriggerBurst={triggerCelebrationBurst}
              />
            </div>
          )}

          {currentPage === 16 && (
            <div id="section-page-16">
              <MusicPage recipientName={config.recipientName} />
            </div>
          )}

          {currentPage === 17 && (
            <div id="section-page-17">
              <SecretSurprisePage
                secretData={config.scratchSecret}
                onTriggerBurst={triggerCelebrationBurst}
              />
            </div>
          )}

          {currentPage === 18 && (
            <div id="section-page-18">
              <FinalScreen
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                photoUrl={config.finalPhotoUrl || '/images/photo15.jpg'}
                finalGreeting={config.finalGreeting}
                finalMessage={config.finalMessage}
                finalBigStatement={config.finalBigStatement}
                finalFootnote={config.finalFootnote}
                onReplay={handleReplayStory}
                onOpenCreatorPanel={() => setIsCreatorOpen(true)}
              />
            </div>
          )}
        </main>
      ) : (
        /* Continuous Mode (All 18 distinct pages with section anchors) */
        <main className="max-w-6xl mx-auto px-4 pt-4 space-y-12">
          {/* Page 2: The Countdown */}
          <div id="section-page-2">
            <CountdownSection
              targetDateISO={config.targetDateISO}
              recipientName={config.recipientName}
              timezoneLabel={config.timezoneLabel}
              onCelebrationTrigger={triggerCelebrationBurst}
              forceBirthdayMode={forceBirthdayMode}
            />
          </div>

          {/* Page 3: Birthday Celebration & Cake */}
          <div id="section-page-3">
            <CakePage
              recipientName={config.recipientName}
              celebrationPhotoUrl={config.celebrationPhotoUrl}
              onTriggerBurst={triggerCelebrationBurst}
            />
          </div>

          {/* Page 4: Her Special Day */}
          <div id="section-page-4">
            <HeroSection
              recipientName={config.recipientName}
              heroHeading={config.heroHeading}
              heroSubtitle={config.heroSubtitle}
              heroTagline={config.heroTagline}
              heroPhotoUrl={config.heroPhotoUrl}
              onScrollClick={() => handlePageChange(8)}
            />
          </div>

          {/* Page 5: Our Little World */}
          <div id="section-page-5">
            <StorybookPage
              recipientName={config.recipientName}
              intro={config.storybookIntro}
              scrapbookPhotos={config.scrapbookPhotos}
            />
          </div>

          {/* Page 6: Memories Gallery */}
          <div id="section-page-6">
            <MemoryGallery photos={config.galleryPhotos} />
          </div>

          {/* Page 7: Photo Stories */}
          <div id="section-page-7">
            <PhotoStoriesPage stories={config.photoStories} />
          </div>

          {/* Page 8: Open My Heart */}
          <div id="section-page-8">
            <LoveLetterSection
              title={config.letterTitle}
              salutation={config.letterSalutation}
              bodyText={config.letterBody}
              signature={config.letterSignature}
              highlightText={config.letterHighlight}
            />
          </div>

          {/* Page 9: Why You Are Special */}
          <div id="section-page-9">
            <ReasonsSection reasons={config.reasons} />
          </div>

          {/* Page 10: Little Things I Love */}
          <div id="section-page-10">
            <LittleThingsPage
              items={config.littleThings}
              recipientName={config.recipientName}
            />
          </div>

          {/* Page 11: My Promises */}
          <div id="section-page-11">
            <PromisesSection promises={config.promises} />
          </div>

          {/* Page 12: A Collection of Wishes */}
          <div id="section-page-12">
            <WishesPage
              wishes={config.wishes}
              recipientName={config.recipientName}
            />
          </div>

          {/* Page 13: Our Future Dreams */}
          <div id="section-page-13">
            <FutureDreamsPage dreams={config.futureDreams} />
          </div>

          {/* Page 14: A Little Love Quiz */}
          <div id="section-page-14">
            <QuizPage
              questions={config.quizQuestions}
              recipientName={config.recipientName}
              onTriggerBurst={triggerCelebrationBurst}
            />
          </div>

          {/* Page 15: Virtual Gift Boxes */}
          <div id="section-page-15">
            <VirtualGiftsPage
              gifts={config.virtualGifts}
              recipientName={config.recipientName}
              onTriggerBurst={triggerCelebrationBurst}
            />
          </div>

          {/* Page 16: Music Corner */}
          <div id="section-page-16">
            <MusicPage recipientName={config.recipientName} />
          </div>

          {/* Page 17: Secret Surprise */}
          <div id="section-page-17">
            <SecretSurprisePage
              secretData={config.scratchSecret}
              onTriggerBurst={triggerCelebrationBurst}
            />
          </div>

          {/* Additional Interactive Surprise Button */}
          <div id="section-interactive-surprise">
            <SurpriseModal
              recipientName={config.recipientName}
              heading={config.surpriseHeading}
              subtitle={config.surpriseSubtitle}
              revealHeading={config.surpriseRevealHeading}
              revealBody={config.surpriseRevealBody}
              finalMessage={config.surpriseFinalMessage}
              onTriggerBurst={triggerCelebrationBurst}
            />
          </div>

          {/* Page 18: The Final Love Note */}
          <div id="section-page-18">
            <FinalScreen
              recipientName={config.recipientName}
              creatorName={config.creatorName}
              photoUrl={config.finalPhotoUrl || '/images/photo15.jpg'}
              finalGreeting={config.finalGreeting}
              finalMessage={config.finalMessage}
              finalBigStatement={config.finalBigStatement}
              finalFootnote={config.finalFootnote}
              onReplay={handleReplayStory}
              onOpenCreatorPanel={() => setIsCreatorOpen(true)}
            />
          </div>
        </main>
      )}

      {/* Hidden Creator Personalization Studio */}
      <CreatorPanel
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        config={config}
        onSaveConfig={(updated) => setConfig(updated)}
        forceBirthdayMode={forceBirthdayMode}
        onToggleBirthdayMode={(mode) => setForceBirthdayMode(mode)}
        onNavigatePage={handlePageChange}
      />
    </div>
  );
}
