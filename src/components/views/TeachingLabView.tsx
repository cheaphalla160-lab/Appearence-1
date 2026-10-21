import React, { useState } from 'react';
import { VOCAB_ITEMS, OPPOSITE_PAIRS, VocabItem, OppositePair } from '../../types/vocab';
import { VocabSvg } from '../illustrations/VocabSvg';
import { speechEngine } from '../../services/speechEngine';
import { soundEngine } from '../../services/soundEngine';
import { Volume2, Sparkles, BookOpen, Layers, ArrowLeftRight, HelpCircle } from 'lucide-react';

export const TeachingLabView: React.FC = () => {
  const [selectedPair, setSelectedPair] = useState<OppositePair>(OPPOSITE_PAIRS[0]);
  const [activeTab, setActiveTab] = useState<'pairs' | 'all'>('pairs');
  const [interactiveSliderVal, setInteractiveSliderVal] = useState<number>(50); // 0 = A, 100 = B
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const handleSpeak = (text: string, id: string) => {
    soundEngine.playClick();
    setSpeakingId(id);
    speechEngine.speak(text, () => {
      setSpeakingId(null);
    });
  };

  const currentItemA = selectedPair.itemA;
  const currentItemB = selectedPair.itemB;

  return (
    <div className="space-y-6">
      {/* Top Banner Introduction */}
      <div className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 tracking-wide uppercase mb-1">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>Interactive Teacher Deck · 互动对镜教学台</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            单词特征与反义对比 (Visual Compare & Learn)
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            专为大屏投影与互动白板设计。点击卡片发音、滑动对比拉杆让长短、厚薄、直卷瞬间直观呈现，帮助小学生轻松建立语义图像。
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-amber-100/60 p-1 rounded-xl shrink-0">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('pairs');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'pairs'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            反义对镜教学 (Opposite Pairs)
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('all');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-white text-amber-900 shadow-sm'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            全部15个目标词总览
          </button>
        </div>
      </div>

      {activeTab === 'pairs' ? (
        <div className="space-y-6">
          {/* Pair Category Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {OPPOSITE_PAIRS.map((pair) => {
              const isSelected = selectedPair.id === pair.id;
              return (
                <button
                  key={pair.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedPair(pair);
                    setInteractiveSliderVal(50);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <div className={`text-[11px] font-bold ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                    {pair.category}
                  </div>
                  <div className="font-bold text-sm truncate mt-0.5">
                    {pair.itemA.word} vs {pair.itemB.word}
                  </div>
                  <div className={`text-[11px] truncate ${isSelected ? 'text-amber-50' : 'text-slate-500'}`}>
                    {pair.itemA.context}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Side-by-Side Comparison Stage */}
          <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 md:p-8 shadow-sm">
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold mb-2">
                <ArrowLeftRight className="w-3.5 h-3.5" />
                {selectedPair.title}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                <span className="text-sky-600 underline decoration-sky-300 decoration-wavy underline-offset-4">
                  {currentItemA.word}
                </span>{' '}
                <span className="text-slate-400 font-light mx-2">vs</span>{' '}
                <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy underline-offset-4">
                  {currentItemB.word}
                </span>
              </h3>
            </div>

            {/* Dual Cards Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Item A Card */}
              <div className="bg-sky-50/60 rounded-2xl border-2 border-sky-200 p-6 flex flex-col justify-between hover:border-sky-400 transition-all shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                      {currentItemA.categoryLabel}
                    </span>
                    <h4 className="text-2xl font-black text-sky-950 mt-1">
                      {currentItemA.word}
                    </h4>
                    <p className="text-sm font-semibold text-slate-600">
                      {currentItemA.chinese}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeak(currentItemA.fullLabel, currentItemA.id)}
                    className={`p-3 rounded-full transition-all ${
                      speakingId === currentItemA.id
                        ? 'bg-sky-500 text-white animate-bounce'
                        : 'bg-white text-sky-600 border border-sky-300 hover:bg-sky-100 shadow-sm'
                    }`}
                    title="点击听标准发音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* SVG Visual */}
                <div className="py-6 flex items-center justify-center">
                  <VocabSvg type={currentItemA.svgType} className="w-48 h-48 drop-shadow-md" animated />
                </div>

                {/* Phonics & Sentence Details */}
                <div className="bg-white rounded-xl p-4 border border-sky-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">音标 & 音节:</span>
                    <span className="font-mono text-sky-800 font-bold text-sm bg-sky-50 px-2 py-0.5 rounded">
                      {currentItemA.phonics} · {currentItemA.syllables}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <p className="text-xs font-bold text-slate-800 leading-relaxed flex-1">
                        "{currentItemA.exampleSentence}"
                      </p>
                      <button
                        onClick={() => handleSpeak(currentItemA.exampleSentence, `sent-${currentItemA.id}`)}
                        className="p-1 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded"
                        title="朗读例句"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {currentItemA.exampleSentenceCn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Item B Card */}
              <div className="bg-emerald-50/60 rounded-2xl border-2 border-emerald-200 p-6 flex flex-col justify-between hover:border-emerald-400 transition-all shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                      {currentItemB.categoryLabel}
                    </span>
                    <h4 className="text-2xl font-black text-emerald-950 mt-1">
                      {currentItemB.word}
                    </h4>
                    <p className="text-sm font-semibold text-slate-600">
                      {currentItemB.chinese}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSpeak(currentItemB.fullLabel, currentItemB.id)}
                    className={`p-3 rounded-full transition-all ${
                      speakingId === currentItemB.id
                        ? 'bg-emerald-500 text-white animate-bounce'
                        : 'bg-white text-emerald-600 border border-emerald-300 hover:bg-emerald-100 shadow-sm'
                    }`}
                    title="点击听标准发音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* SVG Visual */}
                <div className="py-6 flex items-center justify-center">
                  <VocabSvg type={currentItemB.svgType} className="w-48 h-48 drop-shadow-md" animated />
                </div>

                {/* Phonics & Sentence Details */}
                <div className="bg-white rounded-xl p-4 border border-emerald-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">音标 & 音节:</span>
                    <span className="font-mono text-emerald-800 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded">
                      {currentItemB.phonics} · {currentItemB.syllables}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2">
                      <p className="text-xs font-bold text-slate-800 leading-relaxed flex-1">
                        "{currentItemB.exampleSentence}"
                      </p>
                      <button
                        onClick={() => handleSpeak(currentItemB.exampleSentence, `sent-${currentItemB.id}`)}
                        className="p-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded"
                        title="朗读例句"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {currentItemB.exampleSentenceCn}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Morphing Slider for classroom engagement */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="text-sky-700 flex items-center gap-1">
                  👈 侧重左侧: {currentItemA.word}
                </span>
                <span className="text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                  拖拽拉杆对比变化 ({interactiveSliderVal}%)
                </span>
                <span className="text-emerald-700 flex items-center gap-1">
                  侧重右侧: {currentItemB.word} 👉
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={interactiveSliderVal}
                onChange={(e) => setInteractiveSliderVal(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-sky-400 via-amber-300 to-emerald-400 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />

              {/* Teacher Pedagogy Note */}
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950">
                  <span className="font-bold">备课与板书指导提示：</span>
                  <span className="ml-1 text-slate-700">
                    {currentItemA.pairNote}。课堂互动时可让两个孩子分别手持短铅笔与长铅笔、或者翻开字典与绘本，口念："
                    <span className="font-bold text-amber-900">
                      This pencil is {currentItemA.word}, but that pencil is {currentItemB.word}!
                    </span>
                    " 强化情境记忆。
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* All 15 Vocabulary Cards Grid (including facial hair & ugly) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {VOCAB_ITEMS.map((item) => {
            const isPlaying = speakingId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border-2 border-slate-200 p-4 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleSpeak(item.fullLabel, item.id)}
                      className={`p-1.5 rounded-full transition-all ${
                        isPlaying ? 'bg-amber-500 text-white' : 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                      }`}
                      title="点击发音"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex justify-center py-2">
                    <VocabSvg type={item.svgType} className="w-24 h-24" animated />
                  </div>
                  <h4 className="text-lg font-black text-slate-800 text-center mt-2">
                    {item.word}
                  </h4>
                  <div className="text-xs font-semibold text-amber-700 text-center">
                    ({item.context})
                  </div>
                  <div className="text-xs text-slate-500 text-center mt-0.5">
                    {item.chinese}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-center">
                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.phonics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
