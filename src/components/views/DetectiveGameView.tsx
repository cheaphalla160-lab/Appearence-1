import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { AvatarGenerator, CharacterTraits } from '../character/AvatarGenerator';
import { soundEngine } from '../../services/soundEngine';
import { speechEngine } from '../../services/speechEngine';
import { Search, UserCheck, Volume2, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

interface SuspectCase {
  target: CharacterTraits;
  suspects: CharacterTraits[];
  correctIndex: number;
  clueSentence: string;
  clueSentenceCn: string;
}

export const DetectiveGameView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clue-case' | 'creator'>('clue-case');
  const [currentCase, setCurrentCase] = useState<SuspectCase | null>(null);
  const [selectedSuspectIndex, setSelectedSuspectIndex] = useState<number | null>(null);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [isCaseSolved, setIsCaseSolved] = useState<boolean>(false);

  // Free creator state
  const [creatorTraits, setCreatorTraits] = useState<CharacterTraits>({
    hairColor: 'blonde',
    hairStyle: 'curly',
    facialHair: 'moustache',
    body: 'fat',
    heldItem: 'thick-book',
  });

  // Generate a case
  const generateNewCase = () => {
    soundEngine.playClick();
    setSelectedSuspectIndex(null);
    setIsCaseSolved(false);

    const hairColors: ('blonde' | 'dark')[] = ['blonde', 'dark'];
    const hairStyles: ('straight' | 'curly')[] = ['straight', 'curly'];
    const facialHairs: ('none' | 'moustache' | 'beard' | 'both')[] = ['moustache', 'beard', 'both', 'none'];
    const bodies: ('fat' | 'thin')[] = ['fat', 'thin'];
    const items: ('short-pencil' | 'long-pencil' | 'thick-book' | 'thin-book')[] = [
      'short-pencil',
      'long-pencil',
      'thick-book',
      'thin-book',
    ];

    const target: CharacterTraits = {
      hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
      hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
      facialHair: facialHairs[Math.floor(Math.random() * facialHairs.length)],
      body: bodies[Math.floor(Math.random() * bodies.length)],
      heldItem: items[Math.floor(Math.random() * items.length)],
    };

    // Distractors
    const distractor1: CharacterTraits = {
      ...target,
      hairColor: target.hairColor === 'blonde' ? 'dark' : 'blonde',
    };
    const distractor2: CharacterTraits = {
      ...target,
      hairStyle: target.hairStyle === 'straight' ? 'curly' : 'straight',
      facialHair: target.facialHair === 'moustache' ? 'beard' : 'moustache',
    };
    const distractor3: CharacterTraits = {
      ...target,
      body: target.body === 'fat' ? 'thin' : 'fat',
      heldItem: target.heldItem === 'thick-book' ? 'thin-book' : 'short-pencil',
    };

    const lineup = [target, distractor1, distractor2, distractor3].sort(() => 0.5 - Math.random());
    const correctIdx = lineup.findIndex((s) => s === target);

    // Build English Clue
    const hairDesc = `${target.hairStyle} ${target.hairColor} hair`;
    let faceDesc = '';
    if (target.facialHair === 'moustache') faceDesc = 'a moustache';
    else if (target.facialHair === 'beard') faceDesc = 'a beard';
    else if (target.facialHair === 'both') faceDesc = 'both a moustache and a beard';

    let itemDesc = '';
    if (target.heldItem === 'short-pencil') itemDesc = 'a short pencil';
    else if (target.heldItem === 'long-pencil') itemDesc = 'a long pencil';
    else if (target.heldItem === 'thick-book') itemDesc = 'a thick book';
    else if (target.heldItem === 'thin-book') itemDesc = 'a thin book';

    const fullSentence = `The person is ${target.body}, has ${hairDesc}${
      faceDesc ? ', ' + faceDesc : ''
    }, and is holding ${itemDesc}.`;

    const hairCn = `${target.hairColor === 'blonde' ? '金色' : '深色'}${
      target.hairStyle === 'straight' ? '直发' : '卷发'
    }`;
    const bodyCn = target.body === 'fat' ? '胖胖的' : '瘦瘦的';
    const faceCn =
      target.facialHair === 'moustache'
        ? '唇上胡'
        : target.facialHair === 'beard'
        ? '下巴胡须'
        : target.facialHair === 'both'
        ? '既有唇上胡又有大胡须'
        : '没有胡子';
    const itemCn =
      target.heldItem === 'short-pencil'
        ? '短铅笔'
        : target.heldItem === 'long-pencil'
        ? '长铅笔'
        : target.heldItem === 'thick-book'
        ? '厚书'
        : '薄书';

    const cnSentence = `该人物体型${bodyCn}，留着${hairCn}，长着${faceCn}，手里拿着${itemCn}。`;

    const newCase: SuspectCase = {
      target,
      suspects: lineup,
      correctIndex: correctIdx,
      clueSentence: fullSentence,
      clueSentenceCn: cnSentence,
    };

    setCurrentCase(newCase);
    speechEngine.speak(fullSentence);
  };

  useEffect(() => {
    generateNewCase();
  }, []);

  const handleSelectSuspect = (idx: number) => {
    if (isCaseSolved || !currentCase) return;
    setSelectedSuspectIndex(idx);

    if (idx === currentCase.correctIndex) {
      soundEngine.playCorrect();
      setIsCaseSolved(true);
      setSolvedCount((c) => c + 1);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } else {
      soundEngine.playWrong();
    }
  };

  const speakClue = () => {
    if (currentCase) {
      soundEngine.playClick();
      speechEngine.speak(currentCase.clueSentence);
    }
  };

  // Helper for Free Creator generated sentence
  const getCreatorSentence = () => {
    const hair = `${creatorTraits.hairStyle} ${creatorTraits.hairColor} hair`;
    let face = '';
    if (creatorTraits.facialHair === 'moustache') face = 'a moustache';
    else if (creatorTraits.facialHair === 'beard') face = 'a beard';
    else if (creatorTraits.facialHair === 'both') face = 'a moustache and a beard';

    let item = '';
    if (creatorTraits.heldItem === 'short-pencil') item = 'a short pencil';
    else if (creatorTraits.heldItem === 'long-pencil') item = 'a long pencil';
    else if (creatorTraits.heldItem === 'thick-book') item = 'a thick book';
    else if (creatorTraits.heldItem === 'thin-book') item = 'a thin book';

    return `He is ${creatorTraits.body}, has ${hair}${face ? ', ' + face : ''}, and holds ${item}.`;
  };

  const handleSpeakCreator = () => {
    soundEngine.playClick();
    speechEngine.speak(getCreatorSentence());
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              百变小侦探与特征捏脸 (Character Detective & Creator)
            </h2>
            <p className="text-xs text-slate-500">
              听线索抓嫌疑人，或自由组合人物发型、发色、胡子与身形，让多重形容词描述活学活用！
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('clue-case');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'clue-case'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            🕵️ 案件侦破 (Clue Detective)
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('creator');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'creator'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            🎨 自由捏脸机 (Avatar Builder)
          </button>
        </div>
      </div>

      {/* Mode 1: Case Clue Detective */}
      {activeTab === 'clue-case' && currentCase && (
        <div className="space-y-6">
          {/* Case File Board */}
          <div className="bg-gradient-to-r from-amber-50 via-amber-100/60 to-orange-50 rounded-3xl border-2 border-amber-300 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <span className="bg-amber-600 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  CASE #{solvedCount + 1}
                </span>
                <span className="text-xs font-bold text-amber-900">
                  线索录音机 (Inspector Audio Clue)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-amber-800 font-bold">
                  已破案: <b className="text-amber-950 font-black text-sm">{solvedCount}</b>
                </span>
                <button
                  onClick={generateNewCase}
                  className="px-3 py-1.5 text-xs font-bold bg-white text-amber-800 border border-amber-300 rounded-lg hover:bg-amber-50 shadow-sm flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> 换一宗案件
                </button>
              </div>
            </div>

            {/* Clue Prompt */}
            <div className="pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-lg md:text-xl font-black text-slate-800 leading-snug">
                  "{currentCase.clueSentence}"
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  中文线索：{currentCase.clueSentenceCn}
                </div>
              </div>

              <button
                onClick={speakClue}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow transition-transform active:scale-95 flex items-center gap-2 shrink-0 text-xs"
              >
                <Volume2 className="w-4 h-4" /> 听探长朗读线索
              </button>
            </div>
          </div>

          {/* Suspect Lineup Grid (4 Suspects) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentCase.suspects.map((suspect, idx) => {
              const isSelected = selectedSuspectIndex === idx;
              const isCorrect = idx === currentCase.correctIndex;
              const showResult = isCaseSolved;

              let cardBorder = 'border-slate-200 hover:border-amber-400 bg-white';
              if (showResult && isCorrect) {
                cardBorder = 'border-emerald-500 bg-emerald-50/70 ring-4 ring-emerald-300 shadow-md';
              } else if (isSelected && !isCorrect) {
                cardBorder = 'border-rose-400 bg-rose-50/70';
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectSuspect(idx)}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center ${cardBorder} shadow-sm hover:scale-102 active:scale-98`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-[11px] font-black text-slate-400">
                      嫌疑人 #{idx + 1}
                    </span>
                    {showResult && isCorrect && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> 破案目标!
                      </span>
                    )}
                  </div>

                  <div className="py-2">
                    <AvatarGenerator traits={suspect} size={150} />
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 w-full text-center">
                    <div className="text-[11px] font-bold text-slate-700">
                      {suspect.hairColor === 'blonde' ? '金发' : '深色发'} ·{' '}
                      {suspect.hairStyle === 'straight' ? '直发' : '卷发'}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {suspect.facialHair !== 'none'
                        ? suspect.facialHair === 'both'
                          ? '有唇上胡+大胡须'
                          : suspect.facialHair === 'moustache'
                          ? '有唇上胡'
                          : '有大胡须'
                        : '无胡须'}{' '}
                      · {suspect.body === 'fat' ? '胖' : '瘦'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Solved celebration banner */}
          {isCaseSolved && (
            <div className="p-5 bg-emerald-100 border-2 border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-700" />
                <div>
                  <h4 className="font-black text-emerald-950 text-base">
                    恭喜小侦探！特征完全符合，嫌疑人成功锁定！
                  </h4>
                  <p className="text-xs text-emerald-800">
                    学生成功将卷发/直发、金发/黑发、胡子与身形特征融会贯通！
                  </p>
                </div>
              </div>

              <button
                onClick={generateNewCase}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow"
              >
                接取下一宗案件 ➔
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Free Avatar Creator Sandbox */}
      {activeTab === 'creator' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Avatar Display + Real-time Sentence */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 bg-amber-50/50 rounded-3xl border-2 border-amber-200">
              <AvatarGenerator traits={creatorTraits} size={220} className="mb-4" />

              <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm w-full space-y-2 text-left">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wide">
                  实时生成外貌描述句 (Live Sentence Drill):
                </span>
                <p className="text-sm font-black text-slate-800 leading-relaxed">
                  "{getCreatorSentence()}"
                </p>
                <button
                  onClick={handleSpeakCreator}
                  className="w-full mt-2 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                >
                  <Volume2 className="w-4 h-4" /> 朗读该角色描述
                </button>
              </div>
            </div>

            {/* Right: Traits Control Deck */}
            <div className="lg:col-span-7 space-y-4">
              {/* Hair Color */}
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">
                  1. 头发颜色 (Hair Color):
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, hairColor: 'blonde' })}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.hairColor === 'blonde'
                        ? 'bg-yellow-100 text-yellow-900 border-yellow-400 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    🌟 blonde (金色头发)
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, hairColor: 'dark' })}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.hairColor === 'dark'
                        ? 'bg-slate-800 text-white border-slate-900 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    🖤 dark (深色头发)
                  </button>
                </div>
              </div>

              {/* Hair Style */}
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">
                  2. 发型发质 (Hair Texture / Style):
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, hairStyle: 'straight' })}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.hairStyle === 'straight'
                        ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    📏 straight (直发)
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, hairStyle: 'curly' })}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.hairStyle === 'curly'
                        ? 'bg-purple-600 text-white border-purple-700 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    🌀 curly (卷发)
                  </button>
                </div>
              </div>

              {/* Facial Hair */}
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">
                  3. 面部胡须特征 (Facial Hair):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, facialHair: 'none' })}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.facialHair === 'none'
                        ? 'bg-slate-700 text-white border-slate-800'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    无胡须
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, facialHair: 'moustache' })}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.facialHair === 'moustache'
                        ? 'bg-amber-600 text-white border-amber-700'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    moustache (八字胡)
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, facialHair: 'beard' })}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.facialHair === 'beard'
                        ? 'bg-stone-700 text-white border-stone-800'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    beard (大胡子)
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, facialHair: 'both' })}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.facialHair === 'both'
                        ? 'bg-indigo-600 text-white border-indigo-700'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    两者兼有 (Both)
                  </button>
                </div>
              </div>

              {/* Body */}
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">
                  4. 身形体态 (Body Build):
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, body: 'fat' })}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.body === 'fat'
                        ? 'bg-orange-500 text-white border-orange-600 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    🟠 fat (圆滚丰满)
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, body: 'thin' })}
                    className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.body === 'thin'
                        ? 'bg-cyan-600 text-white border-cyan-700 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    🔵 thin (苗条精瘦)
                  </button>
                </div>
              </div>

              {/* Held Item */}
              <div>
                <label className="text-xs font-bold text-slate-600 mb-1.5 block">
                  5. 手持道具 (Held Item - 融合长短/厚薄学习):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, heldItem: 'short-pencil' })}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.heldItem === 'short-pencil'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    short pencil
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, heldItem: 'long-pencil' })}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.heldItem === 'long-pencil'
                        ? 'bg-amber-600 text-white border-amber-700'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    long pencil
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, heldItem: 'thick-book' })}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.heldItem === 'thick-book'
                        ? 'bg-blue-600 text-white border-blue-700'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    thick book
                  </button>
                  <button
                    onClick={() => setCreatorTraits({ ...creatorTraits, heldItem: 'thin-book' })}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border-2 transition-all ${
                      creatorTraits.heldItem === 'thin-book'
                        ? 'bg-pink-600 text-white border-pink-700'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    thin book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
