import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { VOCAB_ITEMS, OPPOSITE_PAIRS, VocabItem, OppositePair } from '../../types/vocab';
import { VocabSvg } from '../illustrations/VocabSvg';
import { soundEngine } from '../../services/soundEngine';
import { speechEngine } from '../../services/speechEngine';
import { Puzzle, Sparkles, RotateCcw, Star, Volume2, Check } from 'lucide-react';

interface FlipCard {
  uniqueId: string;
  item: VocabItem;
  pairKey: string; // The opposite pair identifier
  isFlipped: boolean;
  isMatched: boolean;
}

export const PuzzleGameView: React.FC = () => {
  const [subMode, setSubMode] = useState<'memory-flip' | 'drag-match'>('memory-flip');

  // Memory flip state
  const [cards, setCards] = useState<FlipCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);

  // Picture-Word matching state
  const [selectedPic, setSelectedPic] = useState<VocabItem | null>(null);
  const [selectedWord, setSelectedWord] = useState<VocabItem | null>(null);
  const [puzzleItems, setPuzzleItems] = useState<VocabItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<VocabItem[]>([]);
  const [clearedIds, setClearedIds] = useState<string[]>([]);

  // Initialize Memory Cards
  const initMemoryGame = () => {
    soundEngine.playFlip();
    // Pick 5 opposite pairs (10 cards total for ideal elementary pace)
    const pickedPairs = [...OPPOSITE_PAIRS].sort(() => 0.5 - Math.random()).slice(0, 5);
    const cardList: FlipCard[] = [];

    pickedPairs.forEach((pair) => {
      cardList.push({
        uniqueId: `${pair.id}-A`,
        item: pair.itemA,
        pairKey: pair.id,
        isFlipped: false,
        isMatched: false,
      });
      cardList.push({
        uniqueId: `${pair.id}-B`,
        item: pair.itemB,
        pairKey: pair.id,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle
    cardList.sort(() => 0.5 - Math.random());
    setCards(cardList);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairsCount(0);
    setIsWon(false);
  };

  // Initialize Picture Match Game
  const initPicWordGame = () => {
    soundEngine.playFlip();
    // Pick 4 diverse words including facial hair/ugly
    const picked = [...VOCAB_ITEMS].sort(() => 0.5 - Math.random()).slice(0, 4);
    setPuzzleItems(picked);
    setShuffledWords([...picked].sort(() => 0.5 - Math.random()));
    setClearedIds([]);
    setSelectedPic(null);
    setSelectedWord(null);
  };

  useEffect(() => {
    initMemoryGame();
    initPicWordGame();
  }, []);

  // Card Flip Handler
  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || flippedIndices.length >= 2) {
      return;
    }

    soundEngine.playFlip();
    speechEngine.speak(cards[index].item.word);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [idx1, idx2] = newFlipped;
      const card1 = newCards[idx1];
      const card2 = newCards[idx2];

      // Check if opposite pair match
      if (card1.pairKey === card2.pairKey && card1.item.id !== card2.item.id) {
        // MATCH!
        setTimeout(() => {
          soundEngine.playStar();
          const matchedCards = [...cards];
          matchedCards[idx1].isMatched = true;
          matchedCards[idx2].isMatched = true;
          setCards(matchedCards);
          setFlippedIndices([]);
          setMatchedPairsCount((c) => {
            const next = c + 1;
            if (next === 5) {
              soundEngine.playVictory();
              confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
              setIsWon(true);
            }
            return next;
          });
        }, 500);
      } else {
        // MISMATCH!
        setTimeout(() => {
          soundEngine.playWrong();
          const resetCards = [...cards];
          resetCards[idx1].isFlipped = false;
          resetCards[idx2].isFlipped = false;
          setCards(resetCards);
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };

  // Picture Word Match Handler
  const handleSelectPic = (item: VocabItem) => {
    if (clearedIds.includes(item.id)) return;
    soundEngine.playClick();
    speechEngine.speak(item.fullLabel);
    setSelectedPic(item);

    if (selectedWord) {
      checkPicWordMatch(item, selectedWord);
    }
  };

  const handleSelectWord = (item: VocabItem) => {
    if (clearedIds.includes(item.id)) return;
    soundEngine.playClick();
    speechEngine.speak(item.word);
    setSelectedWord(item);

    if (selectedPic) {
      checkPicWordMatch(selectedPic, item);
    }
  };

  const checkPicWordMatch = (pic: VocabItem, word: VocabItem) => {
    if (pic.id === word.id) {
      soundEngine.playCorrect();
      const updated = [...clearedIds, pic.id];
      setClearedIds(updated);
      setSelectedPic(null);
      setSelectedWord(null);

      if (updated.length === puzzleItems.length) {
        soundEngine.playVictory();
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      soundEngine.playWrong();
      setTimeout(() => {
        setSelectedPic(null);
        setSelectedWord(null);
      }, 500);
    }
  };

  // Calculate Stars
  const getStars = () => {
    if (moves <= 8) return 3;
    if (moves <= 12) return 2;
    return 1;
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
            <Puzzle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              单词拼图与记忆配对 (Word Puzzle & Match)
            </h2>
            <p className="text-xs text-slate-500">
              通过翻牌寻找反义词与图文快速连线，锻练学生的英语视觉联想与工作记忆！
            </p>
          </div>
        </div>

        {/* Sub-mode switcher */}
        <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
          <button
            onClick={() => {
              soundEngine.playClick();
              setSubMode('memory-flip');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              subMode === 'memory-flip'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            🎴 反义词翻牌 (Opposite Flip)
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setSubMode('drag-match');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              subMode === 'drag-match'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-amber-800 hover:text-amber-950'
            }`}
          >
            🧩 图文快速配对 (Word & Pic Match)
          </button>
        </div>
      </div>

      {/* Mode 1: Opposite Memory Flip */}
      {subMode === 'memory-flip' && (
        <div className="space-y-4">
          {/* Stats Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
              <span>已配对对数: <b className="text-amber-600 font-extrabold text-sm">{matchedPairsCount} / 5</b></span>
              <span>翻牌步数: <b className="text-slate-800 font-mono text-sm">{moves}</b></span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-4 h-4 ${starIdx <= getStars() ? 'fill-amber-400 text-amber-500' : 'text-slate-200'}`}
                  />
                ))}
              </div>
              <button
                onClick={initMemoryGame}
                className="ml-3 px-3 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 重新发牌
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 md:gap-4">
            {cards.map((card, idx) => {
              const isRevealed = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.uniqueId}
                  onClick={() => handleCardClick(idx)}
                  className={`aspect-square rounded-2xl border-2 p-2 cursor-pointer transition-all duration-300 transform select-none flex flex-col items-center justify-center text-center ${
                    card.isMatched
                      ? 'bg-emerald-50 border-emerald-400 opacity-90 scale-95 shadow-inner'
                      : isRevealed
                      ? 'bg-white border-amber-400 shadow-md rotate-0'
                      : 'bg-gradient-to-br from-amber-400 to-amber-500 border-amber-600 shadow-sm hover:scale-105 hover:shadow-md'
                  }`}
                >
                  {isRevealed ? (
                    <div className="w-full h-full flex flex-col items-center justify-between p-1">
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          {card.item.category}
                        </span>
                        {card.isMatched && <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />}
                      </div>
                      <VocabSvg type={card.item.svgType} className="w-16 h-16" />
                      <div>
                        <div className="font-extrabold text-xs text-slate-900 leading-tight">
                          {card.item.word}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {card.item.chinese}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white">
                      <Sparkles className="w-8 h-8 opacity-70 mb-1" />
                      <span className="text-xs font-black tracking-wider opacity-90">VOCAB</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Win Celebration Overlay banner */}
          {isWon && (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-6 text-center space-y-3 animate-in zoom-in-95 shadow-md">
              <div className="flex justify-center text-amber-400 gap-1">
                {[1, 2, 3].map((s) => (
                  <Star key={s} className="w-8 h-8 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <h3 className="text-2xl font-black text-emerald-950">
                太棒了！5对反义词全部配对成功！
              </h3>
              <p className="text-xs text-emerald-800">
                你仅用了 {moves} 步就成功找到了所有反义词朋友！
              </p>
              <button
                onClick={initMemoryGame}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition-transform active:scale-95"
              >
                再玩一盘 (Play Again)
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Picture-Word Drag & Match */}
      {subMode === 'drag-match' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                图文连线消除闯关
              </h3>
              <p className="text-xs text-slate-500">
                先点选一张【图片卡】，再点击对应正确的【英文单词卡】，即可消除配对！
              </p>
            </div>
            <button
              onClick={initPicWordGame}
              className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 换一组词
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Pictures Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wide flex items-center justify-between">
                <span>1. 选择图片 (Pictures)</span>
                <span>剩余: {puzzleItems.length - clearedIds.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {puzzleItems.map((item) => {
                  const isCleared = clearedIds.includes(item.id);
                  const isSelected = selectedPic?.id === item.id;

                  return (
                    <button
                      key={item.id}
                      disabled={isCleared}
                      onClick={() => handleSelectPic(item)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                        isCleared
                          ? 'bg-slate-100 border-slate-200 opacity-20 cursor-not-allowed scale-90'
                          : isSelected
                          ? 'bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-300 scale-102'
                          : 'bg-white border-slate-200 hover:border-sky-300 hover:shadow-sm'
                      }`}
                    >
                      <VocabSvg type={item.svgType} className="w-20 h-20 my-1" />
                      <span className="text-[11px] font-bold text-slate-500">
                        {item.chinese}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Words Column */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-amber-700 uppercase tracking-wide flex items-center justify-between">
                <span>2. 选择英文单词 (Word Cards)</span>
                <span>目标库</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {shuffledWords.map((item) => {
                  const isCleared = clearedIds.includes(item.id);
                  const isSelected = selectedWord?.id === item.id;

                  return (
                    <button
                      key={item.id}
                      disabled={isCleared}
                      onClick={() => handleSelectWord(item)}
                      className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${
                        isCleared
                          ? 'bg-slate-100 border-slate-200 opacity-20 cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-300 scale-102'
                          : 'bg-white border-slate-200 hover:border-amber-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="text-left">
                        <div className="text-base font-extrabold text-slate-900">
                          {item.word}
                        </div>
                        <div className="text-xs text-slate-400">
                          ({item.context}) · {item.phonics}
                        </div>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {clearedIds.length === puzzleItems.length && puzzleItems.length > 0 && (
            <div className="p-5 bg-amber-100 border border-amber-300 rounded-2xl text-center">
              <h4 className="text-lg font-bold text-amber-950">🎉 本轮配对全部消除完毕！</h4>
              <button
                onClick={initPicWordGame}
                className="mt-3 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs shadow"
              >
                挑战下一关 ➔
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
