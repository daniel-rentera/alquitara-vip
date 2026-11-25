/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07040d',
        night: '#0d0618',
        panel: '#140a24',
        panel2: '#1b0f2e',
        neon: '#b026ff',
        grape: '#7a1fff',
        magenta: '#ff2d9b',
        pinky: '#ff6fd8',
        gold: '#f5c542',
        goldsoft: '#e8c66b',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        brush: ['"Permanent Marker"', 'cursive'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(176,38,255,0.55), 0 0 40px rgba(176,38,255,0.25)',
        'neon-pink': '0 0 20px rgba(255,45,155,0.55), 0 0 44px rgba(255,45,155,0.22)',
        gold: '0 0 22px rgba(245,197,66,0.45)',
        card: '0 24px 60px -24px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'grape-gold': 'linear-gradient(120deg, #b026ff 0%, #ff2d9b 55%, #f5c542 120%)',
        'night-fade': 'radial-gradient(1200px 600px at 50% -10%, rgba(176,38,255,0.22), transparent 60%)',
      },
      keyframes: {
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'float-slow': 'float-slow 7s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-glow': 'pulse-glow 2.6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
