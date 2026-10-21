import React from 'react';

export interface CharacterTraits {
  hairColor: 'blonde' | 'dark';
  hairStyle: 'straight' | 'curly';
  facialHair: 'none' | 'moustache' | 'beard' | 'both';
  body: 'fat' | 'thin';
  heldItem?: 'none' | 'short-pencil' | 'long-pencil' | 'thick-book' | 'thin-book';
}

interface AvatarProps {
  traits: CharacterTraits;
  className?: string;
  size?: number;
}

export const AvatarGenerator: React.FC<AvatarProps> = ({ traits, className = '', size = 240 }) => {
  const { hairColor, hairStyle, facialHair, body, heldItem } = traits;

  const isBlonde = hairColor === 'blonde';
  const isCurly = hairStyle === 'curly';
  const isFat = body === 'fat';
  const hasMoustache = facialHair === 'moustache' || facialHair === 'both';
  const hasBeard = facialHair === 'beard' || facialHair === 'both';

  const hairFill = isBlonde ? '#FACC15' : '#1E293B';
  const hairDarkAccent = isBlonde ? '#CA8A04' : '#0F172A';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={`${className} drop-shadow-sm select-none`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circular backdrop */}
      <circle cx="120" cy="120" r="110" fill={isFat ? '#FFF7ED' : '#F0FDFA'} stroke="#E2E8F0" strokeWidth="3" />

      {/* HAIR BACK (for long or curly) */}
      {isCurly ? (
        <g>
          <circle cx="75" cy="85" r="22" fill={hairFill} />
          <circle cx="60" cy="108" r="20" fill={hairDarkAccent} />
          <circle cx="65" cy="130" r="18" fill={hairFill} />
          <circle cx="165" cy="85" r="22" fill={hairFill} />
          <circle cx="180" cy="108" r="20" fill={hairDarkAccent} />
          <circle cx="175" cy="130" r="18" fill={hairFill} />
          <circle cx="95" cy="55" r="22" fill={hairFill} />
          <circle cx="120" cy="50" r="24" fill={hairDarkAccent} />
          <circle cx="145" cy="55" r="22" fill={hairFill} />
        </g>
      ) : (
        <g>
          {/* Straight hair falling down shoulders */}
          <rect x="68" y="75" width="22" height="75" rx="8" fill={hairFill} />
          <rect x="150" y="75" width="22" height="75" rx="8" fill={hairFill} />
          <line x1="78" y1="80" x2="78" y2="140" stroke={hairDarkAccent} strokeWidth="2" />
          <line x1="162" y1="80" x2="162" y2="140" stroke={hairDarkAccent} strokeWidth="2" />
        </g>
      )}

      {/* BODY (Fat or Thin) */}
      {isFat ? (
        <g>
          {/* Fat round torso */}
          <ellipse cx="120" cy="190" rx="58" ry="42" fill="#FB923C" stroke="#EA580C" strokeWidth="2.5" />
          {/* Belt */}
          <path d="M72 195 Q120 210 168 195" stroke="#9A3412" strokeWidth="6" strokeLinecap="round" />
          <rect x="112" y="196" width="16" height="12" rx="3" fill="#FDE047" />
          {/* Shirt collar */}
          <polygon points="120,154 105,170 135,170" fill="#FED7AA" />
        </g>
      ) : (
        <g>
          {/* Thin slender torso */}
          <rect x="92" y="152" width="56" height="65" rx="14" fill="#06B6D4" stroke="#0891B2" strokeWidth="2.5" />
          {/* Collar */}
          <path d="M106 152 Q120 166 134 152" stroke="#0E7490" strokeWidth="3" fill="#FED7AA" />
        </g>
      )}

      {/* HEAD */}
      <g>
        <ellipse cx="120" cy="115" rx="42" ry="45" fill="#FED7AA" stroke="#FDBA74" strokeWidth="2" />
        {/* Rosy Cheeks */}
        <circle cx="95" cy="122" r="7" fill="#FB7185" opacity="0.5" />
        <circle cx="145" cy="122" r="7" fill="#FB7185" opacity="0.5" />

        {/* Big Bright Eyes */}
        <circle cx="104" cy="108" r="4.5" fill="#1E293B" />
        <circle cx="136" cy="108" r="4.5" fill="#1E293B" />
        <circle cx="106" cy="106" r="1.5" fill="#FFFFFF" />
        <circle cx="138" cy="106" r="1.5" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path d="M96 98 Q104 94 112 98" stroke={hairDarkAccent} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M128 98 Q136 94 144 98" stroke={hairDarkAccent} strokeWidth="2.5" strokeLinecap="round" />

        {/* Cute Nose */}
        <ellipse cx="120" cy="117" rx="5" ry="3.5" fill="#FDBA74" />
      </g>

      {/* HAIR FRONT (Bangs) */}
      {isCurly ? (
        <g>
          <circle cx="105" cy="76" r="14" fill={hairFill} />
          <circle cx="135" cy="76" r="14" fill={hairFill} />
          <circle cx="120" cy="70" r="16" fill={hairFill} />
        </g>
      ) : (
        <g>
          {/* Straight neat bangs */}
          <path d="M80 88 C85 64 155 64 160 88 C145 78 132 82 120 76 C108 82 95 78 80 88 Z" fill={hairFill} />
        </g>
      )}

      {/* BEARD (Chin & Jaw) */}
      {hasBeard && (
        <g>
          <path
            d="M84 125 C82 165 95 178 120 180 C145 178 158 165 156 125 C150 142 142 138 134 140 C128 143 112 143 106 140 C98 138 90 142 84 125 Z"
            fill={hairFill}
            stroke={hairDarkAccent}
            strokeWidth="1.5"
          />
          {/* Beard detail texture */}
          <line x1="120" y1="150" x2="120" y2="172" stroke={hairDarkAccent} strokeWidth="2" strokeLinecap="round" />
          <line x1="108" y1="148" x2="114" y2="168" stroke={hairDarkAccent} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="132" y1="148" x2="126" y2="168" stroke={hairDarkAccent} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}

      {/* MOUSTACHE (Above Lip) */}
      {hasMoustache && (
        <g>
          <path
            d="M120 128 C110 124 95 120 86 130 C82 135 87 141 94 138 C102 134 112 133 120 135 C128 133 138 134 146 138 C153 141 158 135 154 130 C145 120 130 124 120 128 Z"
            fill={hairFill}
            stroke={hairDarkAccent}
            strokeWidth="1.5"
          />
        </g>
      )}

      {/* MOUTH (if no full beard covering) */}
      {!hasBeard && !hasMoustache && (
        <path d="M110 133 Q120 142 130 133" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      )}
      {hasMoustache && !hasBeard && (
        <path d="M112 140 Q120 146 128 140" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
      )}

      {/* HELD ITEMS (Optional clue item) */}
      {heldItem === 'short-pencil' && (
        <g transform="translate(160, 150) rotate(-15)">
          <rect x="0" y="0" width="14" height="24" rx="3" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          <polygon points="0,24 14,24 7,34" fill="#FDE68A" />
          <polygon points="4,29 10,29 7,34" fill="#1E293B" />
          <rect x="0" y="-8" width="14" height="8" rx="2" fill="#F472B6" />
        </g>
      )}

      {heldItem === 'long-pencil' && (
        <g transform="translate(165, 125) rotate(-20)">
          <rect x="0" y="0" width="14" height="58" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <polygon points="0,58 14,58 7,72" fill="#FDE68A" />
          <polygon points="4,66 10,66 7,72" fill="#1E293B" />
          <rect x="0" y="-8" width="14" height="8" rx="2" fill="#FB7185" />
        </g>
      )}

      {heldItem === 'thick-book' && (
        <g transform="translate(162, 160)">
          <rect x="0" y="0" width="38" height="28" rx="4" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="1.5" />
          <rect x="4" y="4" width="30" height="20" fill="#F8FAFC" />
          <line x1="4" y1="9" x2="34" y2="9" stroke="#94A3B8" strokeWidth="1" />
          <line x1="4" y1="14" x2="34" y2="14" stroke="#94A3B8" strokeWidth="1" />
          <line x1="4" y1="19" x2="34" y2="19" stroke="#94A3B8" strokeWidth="1" />
        </g>
      )}

      {heldItem === 'thin-book' && (
        <g transform="translate(162, 175)">
          <rect x="0" y="0" width="36" height="8" rx="2" fill="#DB2777" stroke="#9D174D" strokeWidth="1.5" />
          <rect x="3" y="2" width="30" height="4" fill="#FFFFFF" />
        </g>
      )}
    </svg>
  );
};
