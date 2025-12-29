import { useEffect, useState } from 'react';

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Don't update visibility while scrolling to top
      if (!isScrolling) {
        setVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolling]);

  const handleClick = () => {
    setIsPopping(true);
    setIsScrolling(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide after pop animation completes
    setTimeout(() => {
      setVisible(false);
    }, 400);

    // Reset states after scroll animation completes
    setTimeout(() => {
      setIsPopping(false);
      setIsScrolling(false);
    }, 1000); // Give enough time for smooth scroll to complete
  };

  if (!visible && !isPopping) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 group focus:outline-none bg-transparent hover:bg-transparent"
      aria-label="Scroll naar boven"
    >
      {/* SVG Circle with pop animation */}
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className={`${isPopping ? 'animate-bubble-pop' : ''} overflow-visible`}
        style={{ background: 'transparent' }}
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id="buttonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

          {/* Burst effect paths - only visible during pop */}
          {isPopping && (
            <>
              {/* Create 8 burst fragments radiating outward */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = 32 + Math.cos(rad) * 20;
                const y = 32 + Math.sin(rad) * 20;
                return (
                  <path
                    key={i}
                    d={`M 32 32 L ${x} ${y}`}
                    stroke="url(#buttonGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0"
                  >
                    <animate
                      attributeName="opacity"
                      from="0"
                      to="1"
                      begin="0s"
                      dur="0.15s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="opacity"
                      from="1"
                      to="0"
                      begin="0.15s"
                      dur="0.25s"
                      fill="freeze"
                    />
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      from="0 0"
                      to={`${Math.cos(rad) * 15} ${Math.sin(rad) * 15}`}
                      begin="0s"
                      dur="0.4s"
                      fill="freeze"
                    />
                  </path>
                );
              })}
            </>
          )}
        </defs>

        {/* Main circle button */}
        <circle
          cx="32"
          cy="32"
          r="28"
          fill="url(#buttonGradient)"
          className={`
            transition-all duration-300 
            ${!isPopping ? 'group-hover:scale-110 drop-shadow-2xl' : ''}
          `}
          style={{
            filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.3))',
            transformOrigin: 'center',
          }}
        >
          {isPopping && (
            <>
              {/* Scale up slightly then shrink to nothing */}
              <animate
                attributeName="r"
                values="28;32;26;0"
                keyTimes="0;0.3;0.6;1"
                dur="0.4s"
                fill="freeze"
              />
              {/* Fade out */}
              <animate
                attributeName="opacity"
                values="1;1;0.5;0"
                keyTimes="0;0.5;0.8;1"
                dur="0.4s"
                fill="freeze"
              />
            </>
          )}
        </circle>

        {/* Arrow icon */}
        <g
          transform="translate(32, 32)"
          className={`transition-transform ${!isPopping ? 'group-hover:-translate-y-0.5' : ''}`}
          style={{ transformOrigin: 'center' }}
        >
          <path
            d="M0,-10 L0,10 M-6,-4 L0,-10 L6,-4"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          >
            {isPopping && (
              <animate
                attributeName="opacity"
                values="1;0"
                dur="0.3s"
                fill="freeze"
              />
            )}
          </path>
        </g>
      </svg>
    </button>
  );
};
