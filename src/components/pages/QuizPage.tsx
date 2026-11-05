import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, RotateCcw, Heart, Award } from 'lucide-react';
import { QuizQuestion } from '../../config/birthdayConfig';

interface QuizPageProps {
  questions: QuizQuestion[];
  recipientName: string;
  onTriggerBurst?: () => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  questions,
  recipientName,
  onTriggerBurst,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const q = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === q.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((c) => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      onTriggerBurst?.();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="relative w-full max-w-3xl mx-auto px-4 py-16 sm:py-20 text-center">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 text-[#C65B7C] border border-[#F4A6B8]/40 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Mini-Game</span>
        </div>
        <h2 className="font-playfair text-3xl sm:text-5xl font-bold text-[#49313D] mb-3">
          A Little Love Quiz For You
        </h2>
        <p className="font-dancing text-xl sm:text-2xl text-[#C65B7C]">
          8 cute, lighthearted questions celebrating Vaishnavi!
        </p>
      </div>

      {/* Quiz Card */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-white/90 backdrop-blur-md border-2 border-[#F4A6B8]/40 shadow-romantic-lg max-w-xl mx-auto text-left">
        {!quizFinished ? (
          <div>
            {/* Progress Header */}
            <div className="flex items-center justify-between border-b border-[#F4A6B8]/20 pb-4 mb-6">
              <span className="font-sans text-xs uppercase tracking-wider font-bold text-[#C65B7C]">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="font-dancing text-lg text-[#8a687a]">
                Score: {score}
              </span>
            </div>

            {/* Question Title */}
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#49313D] mb-6 leading-snug">
              {q.question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {q.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === q.correctIndex;

                let btnStyle = 'bg-[#FFF0F5]/80 hover:bg-[#FFE4EC] text-[#49313D] border-[#F4A6B8]/30';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-800';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Reaction Feedback and Next Button */}
            {isAnswered && (
              <div className="pt-4 border-t border-[#F4A6B8]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="font-dancing text-xl text-[#C65B7C]">
                  {q.reaction}
                </p>
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full bg-[#C65B7C] hover:bg-[#a83c5d] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                >
                  {currentIdx + 1 === questions.length ? 'See Results' : 'Next Question →'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished Score Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FFE4EC] to-[#FADADD] text-[#C65B7C] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Award className="w-8 h-8 stroke-[1.8]" />
            </div>

            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#49313D] mb-2">
              Quiz Completed, {recipientName}!
            </h3>

            <p className="font-dancing text-2xl text-[#C65B7C] mb-4">
              You scored {score} / {questions.length} — Absolute Perfection!
            </p>

            <div className="p-4 rounded-2xl bg-[#FFE4EC]/50 border border-[#F4A6B8]/40 mb-6 max-w-md mx-auto text-sm text-[#49313D] leading-relaxed">
              <Sparkles className="w-4 h-4 text-[#E8C7A0] inline mr-1" />
              Awarded the <strong>Princess of the Day</strong> badge! You are deeply cherished and appreciated in every way possible.
            </div>

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C65B7C] text-white text-xs font-bold uppercase tracking-wider shadow-romantic hover:bg-[#a83c5d] transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Quiz Again</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
