import React, { useState } from 'react';
import { VOCAB_ITEMS, OPPOSITE_PAIRS } from '../../types/vocab';
import { VocabSvg } from '../illustrations/VocabSvg';
import { soundEngine } from '../../services/soundEngine';
import { Printer, GraduationCap, ClipboardList, CheckSquare, Sparkles, Download } from 'lucide-react';

export const LessonPrepKitView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'worksheet' | 'lesson-plan' | 'flashcards'>('worksheet');

  const handlePrint = () => {
    soundEngine.playClick();
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner (hidden during print) */}
      <div className="print:hidden bg-white rounded-3xl border-2 border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              高级备课助手与随堂打印包 (Teacher Lesson Prep & Worksheets)
            </h2>
            <p className="text-xs text-slate-500">
              为小学英语老师量身定制：40分钟完整教案、板书规划、随堂练习卷与词卡，支持一键浏览器打印导出！
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-amber-50 p-1 rounded-xl border border-amber-200">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('worksheet');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'worksheet'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              📝 随堂练习卷
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('lesson-plan');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'lesson-plan'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              📖 40分钟教案
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('flashcards');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-amber-800 hover:text-amber-950'
              }`}
            >
              🖴 打印剪贴词卡
            </button>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4" /> 打印 / 存为PDF
          </button>
        </div>
      </div>

      {/* TAB 1: Printable Worksheet */}
      {activeTab === 'worksheet' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-sm space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Paper Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                Primary English Fun Worksheet · 反义词与外貌特征随堂测验
              </span>
              <h1 className="text-2xl font-black text-slate-900 mt-1">
                Unit Vocabulary Mastery (反义对对碰与小神探)
              </h1>
            </div>
            <div className="flex gap-4 text-xs font-bold text-slate-700">
              <div>班级(Class): <span className="inline-block border-b border-slate-400 w-24"></span></div>
              <div>姓名(Name): <span className="inline-block border-b border-slate-400 w-24"></span></div>
              <div>得分(Score): <span className="inline-block border-b border-slate-400 w-16"></span></div>
            </div>
          </div>

          {/* Section 1: Connect Opposites */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">1</span>
              Part A: Look and Match (把互为反义的一对词语连起来)
            </h3>
            <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 print:bg-transparent">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-sm">1. short pencil</span>
                  <span className="text-slate-300">●</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-sm">2. thick book</span>
                  <span className="text-slate-300">●</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-sm">3. fat people</span>
                  <span className="text-slate-300">●</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-sm">4. blonde hair</span>
                  <span className="text-slate-300">●</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="font-bold text-sm">5. straight hair</span>
                  <span className="text-slate-300">●</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-300">●</span>
                  <span className="font-bold text-sm">A. thin book</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-300">●</span>
                  <span className="font-bold text-sm">B. curly hair</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-300">●</span>
                  <span className="font-bold text-sm">C. long pencil</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-300">●</span>
                  <span className="font-bold text-sm">D. dark hair</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-300">●</span>
                  <span className="font-bold text-sm">E. thin people</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Multiple Choice with Visual Prompts */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">2</span>
              Part B: Circle the Correct Word (根据中文或特征圈出正确单词)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 border border-slate-200 rounded-xl">
                <span className="font-bold">1. 圣诞老人的长在下巴上的胡子是：</span>
                <div className="mt-2 flex gap-4 text-slate-700 font-bold">
                  <span>[ A ] moustache</span>
                  <span>[ B ] beard</span>
                </div>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl">
                <span className="font-bold">2. 魔术师翘在嘴唇上方的八字胡是：</span>
                <div className="mt-2 flex gap-4 text-slate-700 font-bold">
                  <span>[ A ] moustache</span>
                  <span>[ B ] beard</span>
                </div>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl">
                <span className="font-bold">3. 绿皮小怪兽做了一个滑稽丑怪的表情：</span>
                <div className="mt-2 flex gap-4 text-slate-700 font-bold">
                  <span>[ A ] pretty</span>
                  <span>[ B ] ugly</span>
                </div>
              </div>
              <div className="p-3 border border-slate-200 rounded-xl">
                <span className="font-bold">4. 矮小的苹果树和高大的松树：</span>
                <div className="mt-2 flex gap-4 text-slate-700 font-bold">
                  <span>[ A ] short tree</span>
                  <span>[ B ] long / tall tree</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Fill in Blanks with Word Bank */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="w-5 h-5 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs">3</span>
              Part C: Fill in the Blanks (选词填空)
            </h3>
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-bold text-center text-amber-900 tracking-wider">
              [ Word Bank: &nbsp; thick &nbsp;·&nbsp; curly &nbsp;·&nbsp; blonde &nbsp;·&nbsp; fat &nbsp;·&nbsp; short ]
            </div>
            <div className="space-y-2.5 text-xs font-medium text-slate-700">
              <div>1. This English dictionary has 1000 pages. It is very ______________.</div>
              <div>2. Look at my little pencil! It is only 3 centimeters ______________.</div>
              <div>3. Anna has golden ______________ hair like sunshine.</div>
              <div>4. Tom's hair is not straight; it is ______________ like little springs.</div>
              <div>5. The cheerful baker loves sweet cakes, so he is a little ______________.</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Complete 40-minute Lesson Plan */}
      {activeTab === 'lesson-plan' && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold text-amber-700 uppercase">
              Primary English Lesson Plan · 教学教案
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Unit: Describing Things & People (物品与人物外貌特征)
            </h2>
            <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-4">
              <span><b>课时:</b> 1课时 (40分钟)</span>
              <span><b>教学对象:</b> 小学三年级 / 四年级学生</span>
              <span><b>教具:</b> 互动大屏、短/长铅笔实物、厚字典与薄绘本</span>
            </div>
          </div>

          {/* Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200">
              <div className="font-bold text-sky-900 mb-1">🎯 知识目标 (Knowledge)</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>能听懂、认读15个目标词汇</li>
                <li>掌握6组核心反义特征关系</li>
                <li>分清 moustache 与 beard 的区别</li>
              </ul>
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="font-bold text-emerald-900 mb-1">💡 技能目标 (Skills)</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>能用 "This is a ..." 描述长短厚薄</li>
                <li>能用 "He/She has ..." 描述发型胡须</li>
                <li>大屏互动PK中迅速反应与拼读</li>
              </ul>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="font-bold text-amber-900 mb-1">❤️ 情感目标 (Attitude)</div>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>培养学生友好、客观描述他人的品格</li>
                <li>以趣味怪兽看待 ugly，建立自信包容</li>
                <li>在红蓝团队PK中培养合作拼搏精神</li>
              </ul>
            </div>
          </div>

          {/* Procedure */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-sm text-slate-900">40分钟教学流程设计 (Procedure)</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 border-l-4 border-amber-500 bg-slate-50 rounded-r-xl">
                <span className="font-bold text-slate-900">Step 1: Warm-up & Hook (5 mins)</span>
                <p className="text-slate-600 mt-0.5">
                  教师播放网页轻松BGM，拿出两支真实铅笔（一支极短、一支全新长铅笔）提问："Which one is long? Which one is short?"，引出课题。
                </p>
              </div>

              <div className="p-3 border-l-4 border-sky-500 bg-slate-50 rounded-r-xl">
                <span className="font-bold text-slate-900">Step 2: Presentation & Morphing Slider (12 mins)</span>
                <p className="text-slate-600 mt-0.5">
                  使用【互动对镜教学台】，逐一展示铅笔长短、树木高矮、书本厚薄、直发/卷发、金发/黑发。教师拖拽对比拉杆让学生齐读、分组拼读音节。重点讲解 moustache (长在嘴唇上) 与 beard (长在下巴上) 的动作配合。
                </p>
              </div>

              <div className="p-3 border-l-4 border-rose-500 bg-slate-50 rounded-r-xl">
                <span className="font-bold text-slate-900">Step 3: Classroom PK Arena (12 mins)</span>
                <p className="text-slate-600 mt-0.5">
                  全班分成红蓝两队，每轮各派一名代表上讲台在触控屏上进行抢答PK！结合听音辩词与反义词挑战，连胜加倍积分，全班欢呼互动。
                </p>
              </div>

              <div className="p-3 border-l-4 border-purple-500 bg-slate-50 rounded-r-xl">
                <span className="font-bold text-slate-900">Step 4: Character Detective & Synthesis (8 mins)</span>
                <p className="text-slate-600 mt-0.5">
                  切换至【百变小侦探】，教师朗读或播放语音案件线索，学生根据组合特征抓捕嫌疑人；随后让学生口头描述并自由捏脸。
                </p>
              </div>

              <div className="p-3 border-l-4 border-emerald-500 bg-slate-50 rounded-r-xl">
                <span className="font-bold text-slate-900">Step 5: Consolidation & Homework (3 mins)</span>
                <p className="text-slate-600 mt-0.5">
                  分发随堂练习纸完成快速连线测评，布置口语作业："回家向爸爸妈妈用英语描述自己的书包文具与家人发型特征"。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Printable Flashcards */}
      {activeTab === 'flashcards' && (
        <div className="space-y-4">
          <div className="print:hidden text-xs text-slate-500">
            打印后沿虚线剪下，即可作为课堂闪卡或墙面词汇墙 (Word Wall) 使用：
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {VOCAB_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-between text-center print:border-slate-800"
              >
                <span className="text-[10px] font-bold text-slate-400">
                  {item.categoryLabel}
                </span>
                <VocabSvg type={item.svgType} className="w-20 h-20 my-2" />
                <div>
                  <div className="font-black text-base text-slate-900">{item.word}</div>
                  <div className="text-[11px] font-bold text-amber-700">({item.context})</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{item.chinese}</div>
                  <div className="text-[9px] font-mono text-slate-400 mt-1">{item.phonics}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
