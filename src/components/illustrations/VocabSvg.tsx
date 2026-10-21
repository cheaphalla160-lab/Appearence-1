import React from 'react';

interface SvgProps {
  type: string;
  className?: string;
  animated?: boolean;
}

export const VocabSvg: React.FC<SvgProps> = ({ type, className = 'w-36 h-36', animated = false }) => {
  const animClass = animated ? 'transition-all duration-300 hover:scale-105' : '';

  switch (type) {
    case 'pencil-short':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background soft glow circle */}
          <circle cx="100" cy="100" r="90" fill="#FEF3C7" opacity="0.6" />
          {/* Ruler guide */}
          <rect x="30" y="160" width="140" height="14" rx="3" fill="#E2E8F0" />
          <line x1="45" y1="160" x2="45" y2="167" stroke="#94A3B8" strokeWidth="2" />
          <line x1="75" y1="160" x2="75" y2="169" stroke="#EF4444" strokeWidth="2.5" />
          <text x="75" y="156" fill="#EF4444" fontSize="11" fontWeight="bold" textAnchor="middle">4 cm</text>
          
          {/* Short Pencil */}
          <g transform="translate(60, 45)">
            {/* Eraser */}
            <rect x="20" y="0" width="40" height="24" rx="6" fill="#F472B6" />
            <rect x="20" y="18" width="40" height="10" fill="#CBD5E1" />
            <line x1="20" y1="23" x2="60" y2="23" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Pencil Body - Short */}
            <path d="M20 28 H60 V70 H20 Z" fill="#10B981" />
            <path d="M33 28 H47 V70 H33 Z" fill="#059669" />
            {/* Wooden Tip */}
            <polygon points="20,70 60,70 40,96" fill="#FDE68A" />
            {/* Lead tip */}
            <polygon points="34,88 46,88 40,96" fill="#1E293B" />
            {/* Cute Face */}
            <circle cx="33" cy="50" r="2.5" fill="#064E3B" />
            <circle cx="47" cy="50" r="2.5" fill="#064E3B" />
            <path d="M37 57 Q40 61 43 57" stroke="#064E3B" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="29" cy="53" rx="2" ry="1.2" fill="#F43F5E" opacity="0.6" />
            <ellipse cx="51" cy="53" rx="2" ry="1.2" fill="#F43F5E" opacity="0.6" />
          </g>
          {/* Label Badge in SVG */}
          <text x="100" y="186" fill="#0F766E" fontSize="13" fontWeight="bold" textAnchor="middle">
            SHORT PENCIL
          </text>
        </svg>
      );

    case 'pencil-long':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#FEF08A" opacity="0.5" />
          {/* Ruler guide */}
          <rect x="20" y="165" width="160" height="14" rx="3" fill="#E2E8F0" />
          <line x1="30" y1="165" x2="30" y2="172" stroke="#94A3B8" strokeWidth="2" />
          <line x1="165" y1="165" x2="165" y2="175" stroke="#3B82F6" strokeWidth="2.5" />
          <text x="165" y="160" fill="#3B82F6" fontSize="11" fontWeight="bold" textAnchor="middle">18 cm</text>

          {/* Long Pencil */}
          <g transform="translate(82, 16)">
            {/* Eraser */}
            <rect x="0" y="0" width="36" height="22" rx="6" fill="#FB7185" />
            <rect x="0" y="16" width="36" height="9" fill="#CBD5E1" />
            <line x1="0" y1="21" x2="36" y2="21" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Pencil Body - Long */}
            <path d="M0 25 H36 V115 H0 Z" fill="#FBBF24" />
            <path d="M12 25 H24 V115 H12 Z" fill="#F59E0B" />
            {/* Wooden Tip */}
            <polygon points="0,115 36,115 18,142" fill="#FDE68A" />
            {/* Lead tip */}
            <polygon points="12,133 24,133 18,142" fill="#1E293B" />
            {/* Cute Face */}
            <circle cx="12" cy="65" r="2.5" fill="#78350F" />
            <circle cx="24" cy="65" r="2.5" fill="#78350F" />
            <path d="M15 72 Q18 76 21 72" stroke="#78350F" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="8" cy="68" rx="2" ry="1.2" fill="#F43F5E" opacity="0.6" />
            <ellipse cx="28" cy="68" rx="2" ry="1.2" fill="#F43F5E" opacity="0.6" />
          </g>
          <text x="100" y="190" fill="#B45309" fontSize="13" fontWeight="bold" textAnchor="middle">
            LONG PENCIL
          </text>
        </svg>
      );

    case 'tree-short':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#ECFDF5" opacity="0.8" />
          {/* Ground */}
          <path d="M20 160 Q100 150 180 160" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="100" cy="162" rx="40" ry="8" fill="#D1FAE5" />

          {/* Short Trunk */}
          <rect x="92" y="125" width="16" height="36" rx="4" fill="#92400E" />
          {/* Short Foliage */}
          <circle cx="100" cy="105" r="35" fill="#34D399" />
          <circle cx="82" cy="112" r="24" fill="#10B981" />
          <circle cx="118" cy="112" r="24" fill="#059669" />
          <circle cx="100" cy="85" r="24" fill="#6EE7B7" />

          {/* Apples */}
          <circle cx="90" cy="98" r="5" fill="#EF4444" />
          <circle cx="115" cy="106" r="5" fill="#EF4444" />

          {/* Face on tree */}
          <circle cx="95" cy="112" r="2" fill="#065F46" />
          <circle cx="105" cy="112" r="2" fill="#065F46" />
          <path d="M98 118 Q100 121 102 118" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" />

          {/* Height arrow */}
          <line x1="50" y1="160" x2="50" y2="75" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="50,70 46,78 54,78" fill="#94A3B8" />
          <text x="44" y="120" fill="#64748B" fontSize="10" fontWeight="bold" textAnchor="end">Short</text>

          <text x="100" y="185" fill="#047857" fontSize="13" fontWeight="bold" textAnchor="middle">
            SHORT TREE
          </text>
        </svg>
      );

    case 'tree-long':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#F0FDF4" opacity="0.8" />
          {/* Ground */}
          <path d="M20 165 Q100 156 180 165" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="100" cy="166" rx="55" ry="9" fill="#DCFCE7" />

          {/* Tall & Long Trunk */}
          <rect x="91" y="80" width="18" height="85" rx="5" fill="#78350F" />
          <path d="M91 120 Q80 110 75 115" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <path d="M109 105 Q120 95 125 100" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />

          {/* Stately Full Foliage reaching sky */}
          <circle cx="100" cy="55" r="42" fill="#22C55E" />
          <circle cx="75" cy="65" r="32" fill="#16A34A" />
          <circle cx="125" cy="65" r="32" fill="#15803D" />
          <circle cx="100" cy="35" r="28" fill="#4ADE80" />

          {/* Sweet apples */}
          <circle cx="85" cy="50" r="6" fill="#DC2626" />
          <circle cx="120" cy="55" r="6" fill="#DC2626" />
          <circle cx="100" cy="70" r="6" fill="#DC2626" />

          {/* Height guide */}
          <line x1="35" y1="165" x2="35" y2="18" stroke="#16A34A" strokeWidth="2" strokeDasharray="3 3" />
          <polygon points="35,12 31,22 39,22" fill="#16A34A" />
          <text x="30" y="90" fill="#15803D" fontSize="11" fontWeight="bold" textAnchor="end">Tall / Long</text>

          <text x="100" y="186" fill="#15803D" fontSize="12" fontWeight="bold" textAnchor="middle">
            LONG / TALL TREE
          </text>
        </svg>
      );

    case 'book-thick':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#EFF6FF" opacity="0.8" />
          {/* Shadow */}
          <ellipse cx="100" cy="160" rx="55" ry="12" fill="#CBD5E1" opacity="0.5" />

          {/* Heavy Thick Encyclopedia */}
          <g transform="translate(45, 45)">
            {/* Bottom cover */}
            <path d="M5 80 L105 80 L95 95 L-5 95 Z" fill="#1E3A8A" />
            {/* Thick stacked pages (multi-layer effect) */}
            <rect x="0" y="30" width="100" height="52" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            {/* Layer lines for thickness */}
            <line x1="5" y1="42" x2="95" y2="42" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="5" y1="52" x2="95" y2="52" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="5" y1="62" x2="95" y2="62" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="5" y1="72" x2="95" y2="72" stroke="#CBD5E1" strokeWidth="1.5" />
            {/* Spine */}
            <rect x="-8" y="24" width="16" height="66" rx="4" fill="#2563EB" />
            <line x1="0" y1="35" x2="0" y2="80" stroke="#1D4ED8" strokeWidth="2" />
            {/* Top cover */}
            <path d="M0 24 L100 24 L90 35 L-5 35 Z" fill="#3B82F6" />
            {/* Red bookmark ribbon */}
            <path d="M45 35 L45 88 L52 82 L59 88 L59 35 Z" fill="#EF4444" />
            {/* Book title */}
            <text x="50" y="16" fill="#1E40AF" fontSize="12" fontWeight="bold" textAnchor="middle">DICTIONARY</text>
            {/* Thickness measurement bracket */}
            <path d="M108 30 H114 V82 H108" stroke="#EF4444" strokeWidth="2" fill="none" />
            <text x="118" y="60" fill="#EF4444" fontSize="10" fontWeight="bold">Thick</text>
          </g>
          <text x="100" y="185" fill="#1D4ED8" fontSize="13" fontWeight="bold" textAnchor="middle">
            THICK BOOK
          </text>
        </svg>
      );

    case 'book-thin':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#FDF2F8" opacity="0.8" />
          <ellipse cx="100" cy="155" rx="55" ry="8" fill="#CBD5E1" opacity="0.5" />

          {/* Thin Comic Booklet */}
          <g transform="translate(48, 70)">
            {/* Light pages - thin slice */}
            <rect x="0" y="24" width="98" height="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <line x1="5" y1="30" x2="93" y2="30" stroke="#E2E8F0" strokeWidth="1" />
            {/* Slim spine */}
            <rect x="-6" y="20" width="12" height="18" rx="2" fill="#EC4899" />
            {/* Cover */}
            <path d="M0 20 L98 20 L90 26 L-3 26 Z" fill="#F472B6" />
            {/* Cover design */}
            <circle cx="48" cy="10" r="14" fill="#FBCFE8" />
            <text x="48" y="14" fill="#BE185D" fontSize="11" fontWeight="bold" textAnchor="middle">★ COMIC ★</text>
            {/* Thin measure indicator */}
            <path d="M106 24 H110 V36 H106" stroke="#EC4899" strokeWidth="2" fill="none" />
            <text x="114" y="33" fill="#BE185D" fontSize="10" fontWeight="bold">Thin</text>
          </g>
          <text x="100" y="185" fill="#BE185D" fontSize="13" fontWeight="bold" textAnchor="middle">
            THIN BOOK
          </text>
        </svg>
      );

    case 'people-fat':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#FFF7ED" opacity="0.8" />
          <ellipse cx="100" cy="170" rx="45" ry="8" fill="#CBD5E1" opacity="0.4" />

          {/* Chubby Cheerful Character */}
          <g transform="translate(50, 20)">
            {/* Round Chubby Body / Tummy */}
            <ellipse cx="50" cy="105" rx="42" ry="36" fill="#FB923C" />
            {/* Round Belt */}
            <path d="M15 105 Q50 120 85 105" stroke="#C2410C" strokeWidth="6" strokeLinecap="round" />
            <rect x="44" y="108" width="12" height="10" rx="2" fill="#FDE047" />

            {/* Little Legs */}
            <rect x="28" y="132" width="14" height="22" rx="6" fill="#1E293B" />
            <rect x="58" y="132" width="14" height="22" rx="6" fill="#1E293B" />
            <ellipse cx="35" cy="154" rx="10" ry="5" fill="#475569" />
            <ellipse cx="65" cy="154" rx="10" ry="5" fill="#475569" />

            {/* Chubby Head */}
            <circle cx="50" cy="46" r="28" fill="#FDE047" opacity="0.25" />
            <ellipse cx="50" cy="46" rx="26" ry="24" fill="#FED7AA" />
            {/* Rosy round cheeks */}
            <circle cx="32" cy="50" r="6" fill="#FB7185" opacity="0.7" />
            <circle cx="68" cy="50" r="6" fill="#FB7185" opacity="0.7" />
            {/* Smiling Eyes */}
            <path d="M34 40 Q40 36 44 40" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M56 40 Q60 36 66 40" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
            {/* Big Happy Smile */}
            <path d="M40 50 Q50 62 60 50" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="#DC2626" />
            {/* Hair */}
            <path d="M26 38 C28 20 72 20 74 38 Z" fill="#9A3412" />
            {/* Cheerful Wave Hand */}
            <circle cx="10" cy="95" r="8" fill="#FED7AA" />
            <circle cx="90" cy="75" r="8" fill="#FED7AA" />
          </g>
          <text x="100" y="186" fill="#C2410C" fontSize="13" fontWeight="bold" textAnchor="middle">
            FAT (CHUBBY)
          </text>
        </svg>
      );

    case 'people-thin':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#F0FDFA" opacity="0.8" />
          <ellipse cx="100" cy="172" rx="35" ry="7" fill="#CBD5E1" opacity="0.4" />

          {/* Slender Energetic Character */}
          <g transform="translate(60, 20)">
            {/* Thin slender body */}
            <rect x="28" y="70" width="24" height="60" rx="8" fill="#06B6D4" />
            {/* Belt */}
            <rect x="28" y="102" width="24" height="5" fill="#0E7490" />

            {/* Slender Legs */}
            <rect x="30" y="126" width="7" height="30" rx="3" fill="#1E293B" />
            <rect x="43" y="126" width="7" height="30" rx="3" fill="#1E293B" />
            <ellipse cx="33" cy="156" rx="7" ry="4" fill="#475569" />
            <ellipse cx="47" cy="156" rx="7" ry="4" fill="#475569" />

            {/* Arms */}
            <rect x="18" y="75" width="6" height="36" rx="3" fill="#0891B2" />
            <rect x="56" y="75" width="6" height="36" rx="3" fill="#0891B2" />
            <circle cx="21" cy="113" r="4.5" fill="#FED7AA" />
            <circle cx="59" cy="113" r="4.5" fill="#FED7AA" />

            {/* Face */}
            <ellipse cx="40" cy="45" rx="18" ry="22" fill="#FED7AA" />
            {/* Cheerful face */}
            <circle cx="34" cy="42" r="2" fill="#0F172A" />
            <circle cx="46" cy="42" r="2" fill="#0F172A" />
            <path d="M35 52 Q40 58 45 52" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            {/* Hair */}
            <path d="M22 38 C25 22 55 22 58 38 Z" fill="#0369A1" />
          </g>
          <text x="100" y="186" fill="#0E7490" fontSize="13" fontWeight="bold" textAnchor="middle">
            THIN (SLENDER)
          </text>
        </svg>
      );

    case 'hair-blonde':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#FEF9C3" opacity="0.8" />
          {/* Sunny Blonde Hair */}
          <g transform="translate(45, 25)">
            {/* Long sunny golden hair behind face */}
            <path d="M10 50 C5 95 15 130 25 140 C35 125 35 70 35 50 Z" fill="#FACC15" />
            <path d="M100 50 C105 95 95 130 85 140 C75 125 75 70 75 50 Z" fill="#FACC15" />
            <ellipse cx="55" cy="100" rx="42" ry="40" fill="#FBBF24" />

            {/* Face */}
            <ellipse cx="55" cy="75" rx="30" ry="35" fill="#FED7AA" />
            {/* Bright Eyes & Smile */}
            <circle cx="45" cy="72" r="3" fill="#2563EB" />
            <circle cx="65" cy="72" r="3" fill="#2563EB" />
            <path d="M48 88 Q55 94 62 88" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            <circle cx="40" cy="79" r="4" fill="#F43F5E" opacity="0.4" />
            <circle cx="70" cy="79" r="4" fill="#F43F5E" opacity="0.4" />

            {/* Top bangs blonde */}
            <path d="M22 60 C25 25 85 25 88 60 C75 45 60 55 55 45 C50 55 35 45 22 60 Z" fill="#FDE047" />
            <path d="M20 55 Q35 70 30 90" stroke="#EAB308" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M90 55 Q75 70 80 90" stroke="#EAB308" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>
          <text x="100" y="186" fill="#A16207" fontSize="13" fontWeight="bold" textAnchor="middle">
            BLONDE HAIR
          </text>
        </svg>
      );

    case 'hair-dark':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#F1F5F9" opacity="0.8" />
          {/* Deep Dark Hair */}
          <g transform="translate(45, 25)">
            {/* Dark Hair Background */}
            <ellipse cx="55" cy="70" rx="42" ry="46" fill="#1E293B" />
            <path d="M12 70 C10 110 20 135 28 140 C35 125 35 70 35 70 Z" fill="#0F172A" />
            <path d="M98 70 C100 110 90 135 82 140 C75 125 75 70 75 70 Z" fill="#0F172A" />

            {/* Face */}
            <ellipse cx="55" cy="75" rx="30" ry="35" fill="#FED7AA" />
            <circle cx="45" cy="72" r="3" fill="#1E293B" />
            <circle cx="65" cy="72" r="3" fill="#1E293B" />
            <path d="M48 88 Q55 94 62 88" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            <circle cx="40" cy="79" r="4" fill="#F43F5E" opacity="0.4" />
            <circle cx="70" cy="79" r="4" fill="#F43F5E" opacity="0.4" />

            {/* Dark glossy bangs */}
            <path d="M22 62 C26 24 84 24 88 62 C75 48 60 52 55 45 C50 52 35 48 22 62 Z" fill="#1E293B" />
            {/* Hair sheen */}
            <path d="M35 38 Q55 30 70 38" stroke="#475569" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
          <text x="100" y="186" fill="#1E293B" fontSize="13" fontWeight="bold" textAnchor="middle">
            DARK HAIR
          </text>
        </svg>
      );

    case 'hair-straight':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#EFF6FF" opacity="0.8" />
          {/* Straight Sleek Hair */}
          <g transform="translate(45, 25)">
            {/* Long Pin-straight Curtains */}
            <rect x="18" y="45" width="16" height="95" rx="4" fill="#B45309" />
            <rect x="76" y="45" width="16" height="95" rx="4" fill="#B45309" />
            {/* Hair lines showing sleek straight texture */}
            <line x1="26" y1="50" x2="26" y2="135" stroke="#78350F" strokeWidth="2" />
            <line x1="84" y1="50" x2="84" y2="135" stroke="#78350F" strokeWidth="2" />

            {/* Face */}
            <ellipse cx="55" cy="75" rx="28" ry="34" fill="#FED7AA" />
            <circle cx="46" cy="72" r="3" fill="#1E293B" />
            <circle cx="64" cy="72" r="3" fill="#1E293B" />
            <path d="M49 88 Q55 94 61 88" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />

            {/* Straight neat bangs */}
            <path d="M22 55 H88 V40 C88 25 22 25 22 40 Z" fill="#92400E" />
            <line x1="25" y1="54" x2="85" y2="54" stroke="#78350F" strokeWidth="2" />
          </g>
          {/* Parallel guide arrows indicating straightness */}
          <line x1="25" y1="90" x2="25" y2="130" stroke="#3B82F6" strokeWidth="2.5" />
          <polygon points="25,135 21,127 29,127" fill="#3B82F6" />
          <line x1="175" y1="90" x2="175" y2="130" stroke="#3B82F6" strokeWidth="2.5" />
          <polygon points="175,135 171,127 179,127" fill="#3B82F6" />

          <text x="100" y="186" fill="#92400E" fontSize="13" fontWeight="bold" textAnchor="middle">
            STRAIGHT HAIR
          </text>
        </svg>
      );

    case 'hair-curly':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#FAF5FF" opacity="0.8" />
          {/* Curly Bouncy Ringlets */}
          <g transform="translate(45, 25)">
            {/* Fluffy Curly Cloud of Hair */}
            <circle cx="22" cy="50" r="14" fill="#9333EA" />
            <circle cx="16" cy="72" r="13" fill="#7E22CE" />
            <circle cx="18" cy="94" r="14" fill="#9333EA" />
            <circle cx="25" cy="115" r="12" fill="#7E22CE" />

            <circle cx="88" cy="50" r="14" fill="#9333EA" />
            <circle cx="94" cy="72" r="13" fill="#7E22CE" />
            <circle cx="92" cy="94" r="14" fill="#9333EA" />
            <circle cx="85" cy="115" r="12" fill="#7E22CE" />

            <circle cx="35" cy="30" r="14" fill="#A855F7" />
            <circle cx="55" cy="24" r="15" fill="#9333EA" />
            <circle cx="75" cy="30" r="14" fill="#A855F7" />

            {/* Spirals / Springs */}
            <path d="M16 65 Q10 75 18 80 Q12 90 20 95" stroke="#C084FC" strokeWidth="2" fill="none" />
            <path d="M94 65 Q100 75 92 80 Q98 90 90 95" stroke="#C084FC" strokeWidth="2" fill="none" />

            {/* Face */}
            <ellipse cx="55" cy="75" rx="28" ry="34" fill="#FED7AA" />
            <circle cx="46" cy="72" r="3" fill="#1E293B" />
            <circle cx="64" cy="72" r="3" fill="#1E293B" />
            <path d="M49 88 Q55 94 61 88" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            {/* Curly bangs */}
            <circle cx="45" cy="46" r="8" fill="#7E22CE" />
            <circle cx="65" cy="46" r="8" fill="#7E22CE" />
            <circle cx="55" cy="42" r="9" fill="#9333EA" />
          </g>
          <text x="100" y="186" fill="#7E22CE" fontSize="13" fontWeight="bold" textAnchor="middle">
            CURLY HAIR
          </text>
        </svg>
      );

    case 'ugly':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#ECFCCB" opacity="0.8" />
          {/* Silly Goofy Monster Face (Ugly in a fun cartoon way that kids love) */}
          <g transform="translate(45, 25)">
            {/* Lumpy Monster Head */}
            <path
              d="M20 50 Q10 20 40 25 Q70 10 90 35 Q105 70 95 110 Q70 135 45 125 Q15 120 15 80 Z"
              fill="#84CC16"
            />
            {/* Purple Spots */}
            <circle cx="35" cy="40" r="6" fill="#A855F7" opacity="0.6" />
            <circle cx="85" cy="60" r="8" fill="#A855F7" opacity="0.6" />
            <circle cx="75" cy="110" r="5" fill="#A855F7" opacity="0.6" />

            {/* Three mismatched goofy eyes */}
            {/* Left Big Eye */}
            <circle cx="38" cy="60" r="14" fill="#FFFFFF" stroke="#4D7C0F" strokeWidth="2" />
            <circle cx="38" cy="60" r="5" fill="#1E293B" />
            <circle cx="40" cy="58" r="2" fill="#FFFFFF" />

            {/* Middle Tiny Eye */}
            <circle cx="58" cy="48" r="8" fill="#FFFFFF" stroke="#4D7C0F" strokeWidth="2" />
            <circle cx="59" cy="48" r="3" fill="#1E293B" />

            {/* Right Droopy Eye */}
            <circle cx="78" cy="64" r="11" fill="#FFFFFF" stroke="#4D7C0F" strokeWidth="2" />
            <circle cx="76" cy="66" r="4" fill="#DC2626" />

            {/* Crooked Antenna */}
            <path d="M50 25 Q45 5 35 10" stroke="#4D7C0F" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="35" cy="10" r="6" fill="#F59E0B" />

            {/* Crooked goofy mouth with single funny buck tooth */}
            <path d="M30 95 Q55 115 80 90" stroke="#365314" strokeWidth="3" strokeLinecap="round" fill="#1E293B" />
            {/* Silly single tooth */}
            <rect x="44" y="96" width="9" height="11" rx="2" fill="#FFFFFF" stroke="#365314" strokeWidth="1.5" />
            <rect x="62" y="93" width="7" height="9" rx="2" fill="#FFFFFF" stroke="#365314" strokeWidth="1.5" />
          </g>
          <text x="100" y="186" fill="#4D7C0F" fontSize="13" fontWeight="bold" textAnchor="middle">
            UGLY (FUN MONSTER)
          </text>
        </svg>
      );

    case 'moustache':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#FEF3C7" opacity="0.8" />
          {/* Face outline with emphasis on moustache above upper lip */}
          <g transform="translate(45, 20)">
            <ellipse cx="55" cy="75" rx="36" ry="42" fill="#FED7AA" />
            {/* Friendly eyes */}
            <circle cx="42" cy="55" r="3.5" fill="#1E293B" />
            <circle cx="68" cy="55" r="3.5" fill="#1E293B" />
            {/* Nose */}
            <ellipse cx="55" cy="68" rx="8" ry="6" fill="#FDBA74" />

            {/* Glorious Handlebar Moustache right under nose / above lip! */}
            <path
              d="M55 77 C45 74 30 70 20 82 C16 88 20 95 28 92 C38 88 48 83 55 86 C62 83 72 88 82 92 C90 95 94 88 90 82 C80 70 65 74 55 77 Z"
              fill="#1E293B"
            />
            {/* Highlights on moustache */}
            <path d="M26 84 Q35 77 50 80" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <path d="M84 84 Q75 77 60 80" stroke="#475569" strokeWidth="2" strokeLinecap="round" />

            {/* Mouth underneath */}
            <path d="M48 97 Q55 101 62 97" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
            {/* Hair */}
            <path d="M22 50 C26 22 84 22 88 50 Z" fill="#451A03" />
          </g>
          {/* Arrow pointing to moustache */}
          <path d="M30 115 Q35 105 55 102" stroke="#D97706" strokeWidth="2.5" fill="none" markerEnd="url(#arrow)" />
          <text x="100" y="186" fill="#B45309" fontSize="13" fontWeight="bold" textAnchor="middle">
            MOUSTACHE (唇上胡)
          </text>
        </svg>
      );

    case 'beard':
      return (
        <svg viewBox="0 0 200 200" className={`${className} ${animClass}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="#F3F4F6" opacity="0.8" />
          {/* Character with full chin / jaw beard */}
          <g transform="translate(45, 18)">
            <ellipse cx="55" cy="70" rx="36" ry="42" fill="#FED7AA" />
            {/* Eyes & Nose */}
            <circle cx="42" cy="52" r="3.5" fill="#1E293B" />
            <circle cx="68" cy="52" r="3.5" fill="#1E293B" />
            <ellipse cx="55" cy="64" rx="7" ry="5" fill="#FDBA74" />
            {/* Hair */}
            <path d="M22 45 C26 20 84 20 88 45 Z" fill="#4B5563" />

            {/* Full Fluffy Beard on Chin & Jaw */}
            <path
              d="M20 65 C18 100 22 135 55 138 C88 135 92 100 90 65 C85 85 75 80 68 85 C62 90 48 90 42 85 C35 80 25 85 20 65 Z"
              fill="#374151"
            />
            {/* Beard texture strokes */}
            <path d="M42 98 Q55 125 55 132" stroke="#6B7280" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M32 95 Q42 118 48 126" stroke="#6B7280" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M78 95 Q68 118 62 126" stroke="#6B7280" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Cheerful mouth visible */}
            <path d="M48 76 Q55 82 62 76" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          </g>
          {/* Labeling bracket for chin beard */}
          <text x="100" y="186" fill="#374151" fontSize="13" fontWeight="bold" textAnchor="middle">
            BEARD (下巴胡/络腮胡)
          </text>
        </svg>
      );

    default:
      return (
        <div className={`flex items-center justify-center bg-slate-100 rounded-2xl text-slate-400 ${className}`}>
          {type}
        </div>
      );
  }
};
