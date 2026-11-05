import React from 'react';
import { Camera, Sparkles, Heart } from 'lucide-react';
import { PhotoStory } from '../../config/birthdayConfig';

interface PhotoStoriesPageProps {
  stories: PhotoStory[];
}

export const PhotoStoriesPage: React.FC<PhotoStoriesPageProps> = ({ stories }) => {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 sm:py-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Editorial Storyboard</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          Photo Stories & Reflections
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          Each picture holds a quiet universe of thoughts, laughter, and appreciation
        </p>
      </div>

      {/* Alternating Photo Stories */}
      <div className="space-y-16 sm:space-y-24">
        {stories.map((story, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={story.id}
              className={`flex flex-col ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-12`}
            >
              {/* Photo Frame with soft pink glow and vintage tape */}
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#F4A6B8]/30 to-[#FFE4EC]/50 rounded-3xl blur-md group-hover:blur-lg transition duration-500" />
                <div className="relative bg-white p-3.5 rounded-3xl shadow-romantic-lg border border-[#F4A6B8]/40 overflow-hidden">
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FFF0F5]">
                    <img
                      src={story.url}
                      alt={story.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.innerHTML =
                            '<div class="w-full h-full flex flex-col items-center justify-center p-6 text-[#C65B7C]"><span class="font-dancing text-2xl">A Timeless Memory</span></div>';
                        }
                      }}
                    />
                  </div>
                  {story.dateTag && (
                    <div className="mt-3 flex items-center justify-between text-xs text-[#8a687a] px-2">
                      <span className="font-sans font-medium uppercase tracking-wider text-[10px] text-[#C65B7C]">
                        {story.dateTag}
                      </span>
                      <Heart className="w-3.5 h-3.5 fill-[#F4A6B8] text-[#F4A6B8]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Story Narrative */}
              <div className="w-full md:w-1/2 text-left space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFE4EC] text-[#C65B7C] text-[11px] font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>{story.subtitle}</span>
                </div>

                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#49313D] tracking-tight">
                  {story.title}
                </h3>

                <p className="font-sans text-base text-[#6d4d5e] leading-relaxed">
                  {story.story}
                </p>

                <div className="pt-2">
                  <span className="font-dancing text-xl text-[#C65B7C]">
                    Forever cherished in memory ♡
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
