export default {
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        zoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 3s ease-in-out forwards',
        slideUp: 'slideUp 600ms ease-out forwards',
        zoomIn: 'zoomIn 500ms ease-in forwards',
      },
    },
  },
  plugins: [],
}
