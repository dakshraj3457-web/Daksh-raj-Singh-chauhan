import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Image,
  Music,
  FileText,
  Calendar,
  Download,
  Sparkles,
  Check,
  BookOpen,
  HelpCircle,
  Gift,
} from 'lucide-react';
import { BirthdayConfig, resetConfig, saveConfig } from '../config/birthdayConfig';
import { romanticAudio } from '../utils/audio';
import { PAGES_CATALOG } from './Navigation';

interface CreatorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSaveConfig: (updated: BirthdayConfig) => void;
  forceBirthdayMode: boolean;
  onToggleBirthdayMode: (val: boolean) => void;
  onNavigatePage: (pageId: number) => void;
}

export const CreatorPanel: React.FC<CreatorPanelProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  forceBirthdayMode,
  onToggleBirthdayMode,
  onNavigatePage,
}) => {
  const [activeTab, setActiveTab] = useState<
    'pages' | 'general' | 'photos' | 'letter' | 'promises' | 'wishes' | 'quiz' | 'audio'
  >('pages');
  const [formData, setFormData] = useState<BirthdayConfig>(config);
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    saveConfig(formData);
    onSaveConfig(formData);
    setStatusMsg('Saved changes locally! Preview updated.');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleReset = () => {
    if (confirm('Reset all customizations to default?')) {
      const def = resetConfig();
      setFormData(def);
      onSaveConfig(def);
      setStatusMsg('Reset to defaults.');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleHeroPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, heroPhotoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryPhotoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedPhotos = [...formData.galleryPhotos];
        updatedPhotos[index] = {
          ...updatedPhotos[index],
          url: reader.result as string,
        };
        setFormData({ ...formData, galleryPhotos: updatedPhotos });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      romanticAudio.setCustomAudio(audioUrl);
      setStatusMsg('Custom audio loaded in music engine!');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const copyConfigJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-[#F4A6B8]/40 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FFF0F5] to-[#FFE4EC] border-b border-[#F4A6B8]/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C65B7C] animate-pulse" />
              <h3 className="font-playfair text-xl font-bold text-[#49313D]">
                Creator Studio 2.0 — For Daksh
              </h3>
            </div>
            <p className="text-xs text-[#6d4d5e]">
              Manage all 18 pages, photos, music, promises, and wishes for Vaishnavi
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#49313D] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close creator studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode simulation bar */}
        <div className="px-6 py-3 bg-[#FFF5F7] border-b border-[#F4A6B8]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#C65B7C]">Midnight Mode:</span>
            <button
              onClick={() => onToggleBirthdayMode(false)}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                !forceBirthdayMode
                  ? 'bg-[#C65B7C] text-white shadow-xs'
                  : 'bg-white text-[#49313D] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Live Countdown (Before Midnight)
            </button>
            <button
              onClick={() => onToggleBirthdayMode(true)}
              className={`px-3 py-1 rounded-full font-medium transition-all ${
                forceBirthdayMode
                  ? 'bg-[#C65B7C] text-white shadow-xs'
                  : 'bg-white text-[#49313D] border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Birthday Reveal (Midnight Celebration)
            </button>
          </div>
          {statusMsg && <span className="text-[#C65B7C] font-semibold">{statusMsg}</span>}
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-gray-100 px-6 gap-2 overflow-x-auto no-scrollbar pt-2 bg-gray-50/50">
          {[
            { id: 'pages', label: '18 Pages Jump', icon: BookOpen },
            { id: 'general', label: 'Basic Info', icon: Calendar },
            { id: 'photos', label: 'Photographs', icon: Image },
            { id: 'letter', label: 'Love Letter', icon: FileText },
            { id: 'promises', label: 'Promises', icon: Sparkles },
            { id: 'wishes', label: '20 Wishes', icon: Gift },
            { id: 'quiz', label: 'Love Quiz', icon: HelpCircle },
            { id: 'audio', label: 'Soundtrack', icon: Music },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-semibold rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-[#C65B7C] border-t-2 border-[#C65B7C] shadow-xs'
                    : 'text-gray-500 hover:text-[#49313D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-sm text-[#49313D]">
          {activeTab === 'pages' && (
            <div className="space-y-3">
              <p className="text-xs text-[#6d4d5e]">
                Directly jump to and test any of the 18 pages in the app:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {PAGES_CATALOG.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigatePage(p.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-gray-200 hover:border-[#C65B7C] bg-white hover:bg-[#FFE4EC]/40 text-left transition-all flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#FFE4EC] text-[#C65B7C] text-xs font-bold flex items-center justify-center group-hover:bg-[#C65B7C] group-hover:text-white transition-colors">
                      {p.id}
                    </span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#49313D] block truncate">
                        {p.title}
                      </span>
                      <span className="text-[10px] text-gray-500 truncate block">
                        {p.category}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                    Birthday Girl&apos;s Name
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) =>
                      setFormData({ ...formData, recipientName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                    Creator Name
                  </label>
                  <input
                    type="text"
                    value={formData.creatorName}
                    onChange={(e) =>
                      setFormData({ ...formData, creatorName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                  Target Birthday ISO Date & Time
                </label>
                <input
                  type="text"
                  value={formData.targetDateISO}
                  onChange={(e) =>
                    setFormData({ ...formData, targetDateISO: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.heroHeading}
                  onChange={(e) =>
                    setFormData({ ...formData, heroHeading: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                  Hero Subtitle
                </label>
                <textarea
                  rows={2}
                  value={formData.heroSubtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, heroSubtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                  Hero Portrait Photo (Vaishnavi)
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[#F4A6B8] bg-gray-100 flex-shrink-0">
                    <img
                      src={formData.heroPhotoUrl}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroPhotoUpload}
                      className="text-xs file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-[#FFE4EC] file:text-[#C65B7C] file:font-semibold cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.heroPhotoUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, heroPhotoUrl: e.target.value })
                      }
                      placeholder="Or enter image URL"
                      className="w-full text-xs px-2 py-1.5 rounded-lg border border-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="space-y-4">
              <p className="text-xs text-[#6d4d5e]">
                Customize 15 scrapbook photographs and captions:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-1">
                {formData.galleryPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    className="p-3 rounded-2xl border border-gray-200 bg-[#FFFDFB] flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border">
                        <img
                          src={photo.url}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-[#C65B7C]">
                          Photo #{idx + 1}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleGalleryPhotoUpload(idx, e)}
                          className="text-[10px] w-full file:mr-1 file:py-0.5 file:px-2 file:rounded-md file:border-0 file:bg-[#FFE4EC] file:text-[#C65B7C]"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={photo.caption}
                      onChange={(e) => {
                        const updated = [...formData.galleryPhotos];
                        updated[idx] = { ...updated[idx], caption: e.target.value };
                        setFormData({ ...formData, galleryPhotos: updated });
                      }}
                      className="w-full text-xs px-2 py-1 rounded-lg border border-[#F4A6B8]/40"
                      placeholder="Caption..."
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                  Letter Salutation
                </label>
                <input
                  type="text"
                  value={formData.letterSalutation}
                  onChange={(e) =>
                    setFormData({ ...formData, letterSalutation: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                  Extended Letter Body
                </label>
                <textarea
                  rows={9}
                  value={formData.letterBody}
                  onChange={(e) =>
                    setFormData({ ...formData, letterBody: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                  Highlighted Signature
                </label>
                <input
                  type="text"
                  value={formData.letterHighlight}
                  onChange={(e) =>
                    setFormData({ ...formData, letterHighlight: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-[#F4A6B8]/40 text-xs font-bold text-[#C65B7C]"
                />
              </div>
            </div>
          )}

          {activeTab === 'promises' && (
            <div className="space-y-3">
              <p className="text-xs text-[#6d4d5e]">
                Customize the 12 promises:
              </p>
              {formData.promises.map((p, idx) => (
                <div key={p.id} className="p-3 rounded-2xl border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65B7C]">
                      Promise #{p.id} ({p.category})
                    </span>
                  </div>
                  <input
                    type="text"
                    value={p.text}
                    onChange={(e) => {
                      const updated = [...formData.promises];
                      updated[idx] = { ...updated[idx], text: e.target.value };
                      setFormData({ ...formData, promises: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#F4A6B8]/40 text-xs font-medium"
                  />
                  <input
                    type="text"
                    value={p.detail}
                    onChange={(e) => {
                      const updated = [...formData.promises];
                      updated[idx] = { ...updated[idx], detail: e.target.value };
                      setFormData({ ...formData, promises: updated });
                    }}
                    className="w-full px-3 py-1 rounded-lg border border-gray-200 text-[11px] text-[#6d4d5e]"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishes' && (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              <p className="text-xs text-[#6d4d5e]">
                Customize the 20 birthday wishes:
              </p>
              {formData.wishes.map((w, idx) => (
                <div key={w.id} className="p-3 rounded-2xl border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#C65B7C]">
                      Wish #{w.id}: {w.title}
                    </span>
                    <span className="text-[10px] text-gray-500">{w.tag}</span>
                  </div>
                  <textarea
                    rows={2}
                    value={w.message}
                    onChange={(e) => {
                      const updated = [...formData.wishes];
                      updated[idx] = { ...updated[idx], message: e.target.value };
                      setFormData({ ...formData, wishes: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#F4A6B8]/40 text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              <p className="text-xs text-[#6d4d5e]">
                Customize the 8 love quiz questions and sweet reactions:
              </p>
              {formData.quizQuestions.map((q, idx) => (
                <div key={q.id} className="p-3 rounded-2xl border border-gray-200 space-y-2">
                  <span className="text-xs font-bold text-[#C65B7C]">
                    Question #{q.id}
                  </span>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...formData.quizQuestions];
                      updated[idx] = { ...updated[idx], question: e.target.value };
                      setFormData({ ...formData, quizQuestions: updated });
                    }}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#F4A6B8]/40 text-xs font-medium"
                  />
                  <input
                    type="text"
                    value={q.reaction}
                    onChange={(e) => {
                      const updated = [...formData.quizQuestions];
                      updated[idx] = { ...updated[idx], reaction: e.target.value };
                      setFormData({ ...formData, quizQuestions: updated });
                    }}
                    placeholder="Reaction praise..."
                    className="w-full px-3 py-1 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FFE4EC]/50 border border-[#F4A6B8]/40">
                <h4 className="font-semibold text-xs text-[#C65B7C] mb-1">
                  Built-in Music Box Synthesizer
                </h4>
                <p className="text-xs text-[#6d4d5e]">
                  Active by default: Plays a tranquil romantic melody using the browser&apos;s Web Audio API. Royalty-free, reliable, and guaranteed to play without broken audio links.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6d4d5e] mb-1">
                  Upload Custom Song / Audio File (MP3, WAV, M4A)
                </label>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleCustomAudioUpload}
                  className="w-full text-xs file:mr-2 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#C65B7C] file:text-white file:font-semibold cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={copyConfigJSON}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-[#6d4d5e] hover:bg-gray-200 transition-colors cursor-pointer"
              title="Copy JSON config to paste into birthdayConfig.ts"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON!' : 'Export JSON'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#C65B7C] hover:bg-[#a83c5d] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
