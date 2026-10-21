import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { VOCAB_ITEMS, OPPOSITE_PAIRS, VocabItem } from '../../types/vocab';
import { VocabSvg } from '../illustrations/VocabSvg';
import { soundEngine } from '../../services/soundEngine';
import { speechEngine } from '../../services/speechEngine';
import { Swords, Trophy, Volume2, RotateCcw, Flame, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  type: 'word' | 'opposite' | 'audio';
  promptTitle: string;
  promptWord: string;
  targetVocab: VocabItem;
  options: VocabItem[];
  correctOptionId: string;
}

export const PkArenaView: React.FC = () => {
  const [scoreRed, setScoreRed] = useState<number>(0);
  const [scoreBlue, setScoreBlue] = useState<number>(0);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [totalRounds, setTotalRounds] = useState<number>(5);
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'round-result' | 'finished'>('lobby');
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [streakRed, setStreakRed] = useState<number>(0);
  const [streakBlue, setStreakBlue] = useState<number>(0);
  const [lastRoundWinner, setLastRoundWinner] = useState<'red' | 'blue' | 'draw' | null>(null);
  const [redSelectedOption, setRedSelectedOption] = useState<string | null>(null);
  const [blueSelectedOption, setBlueSelectedOption] = useState<string | null>(null);

  // Helper to generate a round question
  const generateQuestion = (): Question => {
    const questionTypes: ('word' | 'opposite' | 'audio')[] = ['word', 'opposite', 'audio'];
    const chosenType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    if (chosenType === 'opposite') {
      const pair = OPPOSITE_PAIRS[Math.floor(Math.random() * OPPOSITE_PAIRS.length)];
      const askItemA = Math.random() > 0.5;
      const questionItem = askItemA ? pair.itemA : pair.itemB;
      const targetOpposite = askItemA ? pair.itemB : pair.itemA;

      // Distractors
      const distractors = VOCAB_ITEMS.filter((v) => v.id !== targetOpposite.id && v.id !== questionItem.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allOptions = [targetOpposite, ...distractors].sort(() => 0.5 - Math.random());

      return {
        id: Math.random().toString(),
        type: 'opposite',
        promptTitle: '寻找反义词 (Find the Opposite)',
        promptWord: `Opposite of "${questionItem.word} (${questionItem.context})"`,
        targetVocab: questionItem,
        options: allOptions,
        correctOptionId: targetOpposite.id,
      };
    } else {
      const target = VOCAB_ITEMS[Math.floor(Math.random() * VOCAB_ITEMS.length)];
      const distractors = VOCAB_ITEMS.filter((v) => v.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const allOptions = [target, ...distractors].sort(() => 0.5 - Math.random());

      return {
        id: Math.random().toString(),
        type: chosenType,
        promptTitle: chosenType === 'audio' ? '听音辩词 (Listen & Tap)' : '看词辨图 (Read & Match)',
        promptWord: chosenType === 'audio' ? '🔊 点击喇叭再听一次' : `${target.word} (${target.context})`,
        targetVocab: target,
        options: allOptions,
        correctOptionId: target.id,
      };
    }
  };

  const startNewGame = (rounds: number = 5) => {
    soundEngine.playCorrect();
    setScoreRed(0);
    setScoreBlue(0);
    setStreakRed(0);
    setStreakBlue(0);
    setCurrentRound(1);
    setTotalRounds(rounds);
    setRedSelectedOption(null);
    setBlueSelectedOption(null);
    setLastRoundWinner(null);

    const firstQ = generateQuestion();
    setCurrentQuestion(firstQ);
    setGameState('playing');

    if (firstQ.type === 'audio') {
      speechEngine.speak(firstQ.targetVocab.fullLabel);
    }
  };

  const handleOptionSelect = (team: 'red' | 'blue', optionId: string) => {
    if (gameState !== 'playing' || !currentQuestion) return;

    if (team === 'red' && redSelectedOption === null) {
      soundEngine.playBuzzer(true);
      setRedSelectedOption(optionId);
      evaluateTeamChoice('red', optionId);
    } else if (team === 'blue' && blueSelectedOption === null) {
      soundEngine.playBuzzer(false);
      setBlueSelectedOption(optionId);
      evaluateTeamChoice('blue', optionId);
    }
  };

  const evaluateTeamChoice = (team: 'red' | 'blue', optionId: string) => {
    if (!currentQuestion) return;

    const isCorrect = optionId === currentQuestion.correctOptionId;

    if (isCorrect) {
      soundEngine.playCorrect();
      const streakBonus = team === 'red' ? streakRed : streakBlue;
      const pointsWon = 10 + streakBonus * 2;

      if (team === 'red') {
        setScoreRed((prev) => prev + pointsWon);
        setStreakRed((s) => s + 1);
        setLastRoundWinner('red');
      } else {
        setScoreBlue((prev) => prev + pointsWon);
        setStreakBlue((s) => s + 1);
        setLastRoundWinner('blue');
      }

      // Small confetti for correct answer
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: team === 'red' ? 0.3 : 0.7, y: 0.6 },
      });

      setGameState('round-result');
    } else {
      soundEngine.playWrong();
      if (team === 'red') {
        setStreakRed(0);
      } else {
        setStreakBlue(0);
      }
    }
  };

  const handleNextRound = () => {
    soundEngine.playClick();
    if (currentRound >= totalRounds) {
      soundEngine.playVictory();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      setGameState('finished');
    } else {
      setCurrentRound((r) => r + 1);
      setRedSelectedOption(null);
      setBlueSelectedOption(null);
      setLastRoundWinner(null);
      const nextQ = generateQuestion();
      setCurrentQuestion(nextQ);
      setGameState('playing');

      if (nextQ.type === 'audio') {
        speechEngine.speak(nextQ.targetVocab.fullLabel);
      }
    }
  };

  const speakPrompt = () => {
    if (!currentQuestion) return;
    soundEngine.playClick();
    if (currentQuestion.type === 'opposite') {
      speechEngine.speak(`What is the opposite of ${currentQuestion.targetVocab.fullLabel}?`);
    } else {
      speechEngine.speak(currentQuestion.targetVocab.fullLabel);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top PK Scoreboard Bar */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <Swords className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-800">
                双人 / 班级红蓝 PK 大战 (Classroom Arena)
              </h2>
              <p className="text-xs text-slate-500">
                支持两个学生在大屏左右触控抢答，或全班分红蓝两大阵营竞答！
              </p>
            </div>
          </div>

          {gameState !== 'lobby' && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                Round {currentRound} / {totalRounds}
              </span>
              <button
                onClick={() => setGameState('lobby')}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 退出
              </button>
            </div>
          )}
        </div>

        {/* Dual Score Header */}
        <div className="grid grid-cols-2 gap-4">
          {/* Red Team Card */}
          <div className="bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-100">
                <span>🔴 RED TEAM (红队)</span>
                {streakRed > 1 && (
                  <span className="bg-yellow-400 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-black flex items-center gap-0.5">
                    <Flame className="w-3 h-3 fill-current" /> {streakRed} 连胜!
                  </span>
                )}
              </div>
              <div className="text-3xl md:text-4xl font-black mt-1 tabular-nums">
                {scoreRed} <span className="text-sm font-normal text-rose-200">pts</span>
              </div>
            </div>
            <div className="text-3xl font-black opacity-30 select-none">#1</div>
          </div>

          {/* Blue Team Card */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-100">
                <span>🔵 BLUE TEAM (蓝队)</span>
                {streakBlue > 1 && (
                  <span className="bg-yellow-400 text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-black flex items-center gap-0.5">
                    <Flame className="w-3 h-3 fill-current" /> {streakBlue} 连胜!
                  </span>
                )}
              </div>
              <div className="text-3xl md:text-4xl font-black mt-1 tabular-nums">
                {scoreBlue} <span className="text-sm font-normal text-blue-200">pts</span>
              </div>
            </div>
            <div className="text-3xl font-black opacity-30 select-none">#2</div>
          </div>
        </div>
      </div>

      {/* Arena Stage */}
      {gameState === 'lobby' && (
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-8 md:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-6">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <Swords className="w-10 h-10" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-800">
              准备开始红蓝单词决斗！
            </h3>
            <p className="text-slate-600 text-sm mt-2 max-w-md mx-auto">
              红队与蓝队在屏幕两侧进行快速抢答。题目包含看图辩词、听音识词以及找反义词，连击答对有双倍加分！
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => startNewGame(5)}
              className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
            >
              🔥 极速决斗 (5 局赛)
            </button>
            <button
              onClick={() => startNewGame(10)}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
            >
              👑 班级大满贯 (10 局赛)
            </button>
          </div>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'round-result') && currentQuestion && (
        <div className="space-y-6">
          {/* Question Banner */}
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 shadow-sm text-center relative overflow-hidden">
            <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-2">
              {currentQuestion.promptTitle}
            </span>
            <div className="flex items-center justify-center gap-3">
              <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                {currentQuestion.promptWord}
              </h3>
              <button
                onClick={speakPrompt}
                className="p-2.5 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full transition-all"
                title="重新播放语音"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            {currentQuestion.type === 'opposite' && (
              <div className="mt-2 text-xs text-slate-500">
                请在下方4个选项中找到对应的反义词并点击！
              </div>
            )}
          </div>

          {/* PK Touch Play Area (Split into Left = Red Team, Right = Blue Team) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Red Team Tapping Board */}
            <div className="bg-rose-50/50 rounded-3xl border-2 border-rose-200 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-rose-200">
                <span className="font-bold text-rose-700 text-sm flex items-center gap-1.5">
                  🔴 红队答题区 (Red Tapping Pad)
                </span>
                <span className="text-xs text-rose-500">点选你的答案</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentQuestion.options.map((opt) => {
                  const isChosen = redSelectedOption === opt.id;
                  const isCorrect = opt.id === currentQuestion.correctOptionId;
                  const showResult = gameState === 'round-result';

                  let btnStyle = 'bg-white border-slate-200 hover:border-rose-400 hover:bg-rose-50/40 text-slate-800';
                  if (showResult && isCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300';
                  } else if (isChosen && !isCorrect) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={gameState === 'round-result'}
                      onClick={() => handleOptionSelect('red', opt.id)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all ${btnStyle} active:scale-95 disabled:cursor-default`}
                    >
                      <VocabSvg type={opt.svgType} className="w-16 h-16 my-1" />
                      <div className="font-bold text-xs mt-1 truncate w-full">{opt.word}</div>
                      <div className={`text-[10px] ${showResult && isCorrect ? 'text-emerald-100' : 'text-slate-400'}`}>
                        ({opt.context})
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blue Team Tapping Board */}
            <div className="bg-blue-50/50 rounded-3xl border-2 border-blue-200 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <span className="font-bold text-blue-700 text-sm flex items-center gap-1.5">
                  🔵 蓝队答题区 (Blue Tapping Pad)
                </span>
                <span className="text-xs text-blue-500">点选你的答案</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentQuestion.options.map((opt) => {
                  const isChosen = blueSelectedOption === opt.id;
                  const isCorrect = opt.id === currentQuestion.correctOptionId;
                  const showResult = gameState === 'round-result';

                  let btnStyle = 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-800';
                  if (showResult && isCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300';
                  } else if (isChosen && !isCorrect) {
                    btnStyle = 'bg-rose-500 text-white border-rose-600';
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={gameState === 'round-result'}
                      onClick={() => handleOptionSelect('blue', opt.id)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all ${btnStyle} active:scale-95 disabled:cursor-default`}
                    >
                      <VocabSvg type={opt.svgType} className="w-16 h-16 my-1" />
                      <div className="font-bold text-xs mt-1 truncate w-full">{opt.word}</div>
                      <div className={`text-[10px] ${showResult && isCorrect ? 'text-emerald-100' : 'text-slate-400'}`}>
                        ({opt.context})
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Round Result Next Button */}
          {gameState === 'round-result' && (
            <div className="bg-amber-100 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {lastRoundWinner === 'red' && '🔴 红队抢先答对，赢得积分！'}
                    {lastRoundWinner === 'blue' && '🔵 蓝队抢先答对，赢得积分！'}
                  </div>
                  <div className="text-xs text-slate-600">
                    正确答案是：{currentQuestion.options.find((o) => o.id === currentQuestion.correctOptionId)?.fullLabel}
                  </div>
                </div>
              </div>

              <button
                onClick={handleNextRound}
                className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow transition-transform active:scale-95"
              >
                {currentRound >= totalRounds ? '查看最终胜利奖杯 🏆' : '下一局 (Next Round) ➔'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Finished State */}
      {gameState === 'finished' && (
        <div className="bg-white rounded-3xl border-2 border-amber-300 p-8 md:p-12 text-center max-w-xl mx-auto shadow-md space-y-6">
          <div className="w-24 h-24 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <Trophy className="w-12 h-12" />
          </div>

          <div>
            <h3 className="text-3xl font-black text-slate-800">
              {scoreRed > scoreBlue && '🎉 恭喜 🔴 红队获胜！'}
              {scoreBlue > scoreRed && '🎉 恭喜 🔵 蓝队获胜！'}
              {scoreRed === scoreBlue && '🤝 势均力敌！红蓝两队打成平手！'}
            </h3>
            <div className="text-lg font-bold text-slate-600 mt-2">
              红队: {scoreRed} 分 vs 蓝队: {scoreBlue} 分
            </div>
            <p className="text-xs text-slate-500 mt-1">
              全班表现精彩，掌握了所有目标单词与反义对比！
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => startNewGame(totalRounds)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow transition-transform active:scale-95"
            >
              再来一局 (Play Again)
            </button>
            <button
              onClick={() => setGameState('lobby')}
              className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition-colors"
            >
              返回大厅
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
