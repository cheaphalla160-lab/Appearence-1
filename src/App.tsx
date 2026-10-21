import React, { useState, useEffect } from 'react';
import { TeachingLabView } from './components/views/TeachingLabView';
import { PkArenaView } from './components/views/PkArenaView';
import { PuzzleGameView } from './components/views/PuzzleGameView';
import { DetectiveGameView } from './components/views/DetectiveGameView';
import { LessonPrepKitView } from './components/views/LessonPrepKitView';
import { soundEngine } from './services/soundEngine';
import { speechEngine } from './services/speechEngine';
import {
  Sparkles,
  Music,
  VolumeX,
  Volume2,
  Swords,
  BookOpen,
  Puzzle,
  Search,
  GraduationCap,
  Maximize2,
  Minimize2,
  Gauge,
  Globe,
} from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<
    'teaching' | 'pk' | 'puzzle' | 'detective' | 'prep'
  >('teaching');

  const [bgmActive, setBgmActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.85);
  const [speechAccent, setSpeechAccent] = useState<'en-US' | 'en-GB'>('en-US');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Toggle Background Music
  const handleToggleBgm = () => {
    soundEngine.playClick();
    const playing = soundEngine.toggleBGM();
    setBgmActive(playing);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    soundEngine.playClick();
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  // Change Speech Speed
  const handleToggleSpeed = () => {
    soundEngine.playClick();
    const nextSpeed = speechSpeed === 0.85 ? 1.0 : speechSpeed === 1.0 ? 0.7 : 0.85;
    setSpeechSpeed(nextSpeed);
    speechEngine.setRate(nextSpeed);
    speechEngine.speak(`Speech speed ${nextSpeed === 0.7 ? 'Slow' : nextSpeed === 0.85 ? 'Medium' : 'Normal'}`);
  };

  // Change Speech Accent
  const handleToggleAccent = () => {
    soundEngine.playClick();
    const nextAccent = speechAccent === 'en-US' ? 'en-GB' : 'en-US';
    setSpeechAccent(nextAccent);
    speechEngine.setAccent(nextAccent);
    speechEngine.speak(`Accent switched to ${nextAccent === 'en-US' ? 'American English' : 'British English'}`);
  };

  // Fullscreen toggle for classroom whiteboard
  const handleToggleFullscreen = () => {
    soundEngine.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/60 via-amber-50/20 to-orange-50/40 text-slate-900 flex flex-col">
      {/* Top Navigation Bar - adheres strictly to 3-zone contract */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/80 px-4 sm:px-8 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setCurrentView('teaching');
            }}
            className="flex items-center gap-2.5 text-left shrink-0 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 fill-amber-100" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 whitespace-nowrap block">
                Magic Vocab Kingdom
              </span>
              <span className="text-[10px] font-bold text-amber-700 block -mt-0.5">
                小学英语互动对镜与趣味游戏
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-amber-100/50 rounded-2xl border border-amber-200/60">
            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentView('teaching');
              }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'teaching'
                  ? 'bg-white text-amber-950 shadow-sm'
                  : 'text-amber-800 hover:text-amber-950 hover:bg-white/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" /> 教学对镜 (Learn)
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentView('pk');
              }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'pk'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-rose-700 hover:text-rose-950 hover:bg-white/50'
              }`}
            >
              <Swords className="w-3.5 h-3.5" /> 红蓝PK战 (PK Arena)
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentView('puzzle');
              }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'puzzle'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-800 hover:text-amber-950 hover:bg-white/50'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" /> 拼图消消乐 (Puzzle)
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentView('detective');
              }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'detective'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-indigo-800 hover:text-indigo-950 hover:bg-white/50'
              }`}
            >
              <Search className="w-3.5 h-3.5" /> 百变小侦探 (Detective)
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setCurrentView('prep');
              }}
              className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'prep'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-800 hover:text-emerald-950 hover:bg-white/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" /> 备课百宝箱 (Lesson Kit)
            </button>
          </nav>

          {/* Zone 3: Audio & Classroom Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Cheerful BGM Toggle */}
            <button
              onClick={handleToggleBgm}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                bgmActive
                  ? 'bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="切换背景音乐 (Cheerful BGM)"
            >
              <Music className={`w-3.5 h-3.5 ${bgmActive ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {bgmActive ? '音乐开启中' : '伴奏BGM'}
              </span>
            </button>

            {/* Mute SFX */}
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-xl border transition-all ${
                isMuted
                  ? 'bg-rose-50 border-rose-300 text-rose-600'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={isMuted ? '取消静音' : '音效静音'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Speech Rate Control */}
            <button
              onClick={handleToggleSpeed}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-sm"
              title="语速调节 (慢速 / 正常)"
            >
              <Gauge className="w-3.5 h-3.5 text-amber-600" />
              <span>{speechSpeed === 0.7 ? '0.7x 慢速' : speechSpeed === 0.85 ? '0.85x 教学' : '1.0x 正常'}</span>
            </button>

            {/* Speech Accent US/UK */}
            <button
              onClick={handleToggleAccent}
              className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-sm"
              title="口音切换 (美音 / 英音)"
            >
              <Globe className="w-3.5 h-3.5 text-sky-600" />
              <span>{speechAccent === 'en-US' ? '美音 US' : '英音 UK'}</span>
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={handleToggleFullscreen}
              className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 shadow-sm transition-colors"
              title="全屏显示 (适合课堂白板/投影)"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around gap-1 pt-2 mt-2 border-t border-amber-200/50">
          <button
            onClick={() => {
              soundEngine.playClick();
              setCurrentView('teaching');
            }}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${
              currentView === 'teaching' ? 'bg-amber-500 text-white' : 'text-slate-600'
            }`}
          >
            对镜教学
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setCurrentView('pk');
            }}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${
              currentView === 'pk' ? 'bg-rose-500 text-white' : 'text-slate-600'
            }`}
          >
            红蓝PK
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setCurrentView('puzzle');
            }}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${
              currentView === 'puzzle' ? 'bg-amber-500 text-white' : 'text-slate-600'
            }`}
          >
            拼图闯关
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setCurrentView('detective');
            }}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${
              currentView === 'detective' ? 'bg-indigo-600 text-white' : 'text-slate-600'
            }`}
          >
            小侦探
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setCurrentView('prep');
            }}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg ${
              currentView === 'prep' ? 'bg-emerald-600 text-white' : 'text-slate-600'
            }`}
          >
            备课打印
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {currentView === 'teaching' && <TeachingLabView />}
        {currentView === 'pk' && <PkArenaView />}
        {currentView === 'puzzle' && <PuzzleGameView />}
        {currentView === 'detective' && <DetectiveGameView />}
        {currentView === 'prep' && <LessonPrepKitView />}
      </main>

      {/* Footer (quiet copyright & quick vocabulary badges) */}
      <footer className="border-t border-amber-200/60 bg-white/70 py-4 px-6 text-center text-xs text-slate-500 print:hidden mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">小学英语目标词汇库:</span>
            <span className="text-slate-500">
              short / long (pencil, tree) · thick / thin (book) · fat / thin (people) · blonde / dark (hair) · straight / curly (hair) · ugly · moustache · beard
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            专为小学英语课堂互动打造 · 纯正发音与合成音律
          </div>
        </div>
      </footer>
    </div>
  );
}
