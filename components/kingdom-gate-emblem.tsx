type KingdomGateEmblemProps = {
  className?: string;
};

export function KingdomGateEmblem({ className = "" }: KingdomGateEmblemProps) {
  return (
    <svg
      viewBox="0 0 220 300"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g className="passport-emblem-gold" stroke="currentColor" strokeWidth="1.15">
        <path d="M28 248 H192" strokeWidth="0.9" opacity="0.85" />
        <path d="M34 252 H186" strokeWidth="0.7" opacity="0.65" />
        <path
          d="M44 248 V118 C44 72 68 44 110 44 C152 44 176 72 176 118 V248"
          strokeWidth="1.2"
        />
        <path
          d="M52 248 V122 C52 82 72 56 110 56 C148 56 168 82 168 122 V248"
          strokeWidth="0.75"
          opacity="0.55"
        />
        <path
          d="M98 44 L110 24 L122 44"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path d="M104 34 H116" strokeWidth="0.75" />
        <circle cx="110" cy="30" r="2.2" fill="currentColor" stroke="none" />
        <path
          d="M110 78 L118 92 L132 94 L122 104 L124 118 L110 111 L96 118 L98 104 L88 94 L102 92 Z"
          fill="currentColor"
          stroke="none"
        />
        <circle cx="88" cy="118" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="132" cy="118" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="76" cy="136" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="144" cy="136" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="110" cy="148" r="1.1" fill="currentColor" stroke="none" />
        <path
          d="M78 214 C78 202 86 196 96 196 C104 196 108 200 110 206 C112 200 116 196 124 196 C134 196 142 202 142 214 C142 226 134 234 124 234 L96 234 C86 234 78 226 78 214 Z"
          fill="currentColor"
          stroke="none"
        />
        <path
          d="M118 214 C118 202 126 196 136 196 C146 196 154 202 154 214 C154 226 146 234 136 234 L118 234 Z"
          fill="currentColor"
          stroke="none"
        />
        <ellipse cx="96" cy="210" rx="5" ry="3" fill="#0b1424" stroke="none" opacity="0.35" />
        <ellipse cx="136" cy="210" rx="5" ry="3" fill="#0b1424" stroke="none" opacity="0.35" />
      </g>
    </svg>
  );
}
