import { defineConfig } from 'vite-plugin-windicss';
import { primaryColor } from './build/config/themeConfig';

export default defineConfig({
  darkMode: 'class',
  plugins: [createEnterPlugin()],
  theme: {
    extend: {
      zIndex: {
        '-1': '-1',
      },
      colors: {
        primary: primaryColor,
        title: '#171b25',
        body1: '#414960',
        body2: '#61687c',
        body3: '#9fa3b0',
        gray1: '#b5b5be',
        gray2: '#d5d5dc',
        gray3: '#e2e2ea',
        gray4: '#f1f2f5',
        gray5: '#fafafb',
        'dark-title': '#ffffff',
        'dark-body1': 'rgba(255, 255, 255, 0.95)',
        'dark-body2': 'rgba(255, 255, 255, 0.75)',
        'dark-body3': 'rgba(255, 255, 255, 0.65)',
        'dark-gray1': 'rgba(255, 255, 255, 0.25)',
        'dark-gray2': 'rgba(255, 255, 255, 0.2)',
        'dark-gray3': 'rgba(255, 255, 255, 0.15)',
        'dark-gray4': 'rgba(255, 255, 255, 0.1)',
        'dark-gray5': 'rgba(255, 255, 255, 0.05)',
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
    },
  },
});

/**
 * Used for animation when the element is displayed.
 * @param maxOutput The larger the maxOutput output, the larger the generated css volume.
 */
function createEnterPlugin(maxOutput = 6) {
  const createCss = (index: number, d = 'x') => {
    const upd = d.toUpperCase();
    return {
      [`*> .enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(50px)`,
      },
      [`*> .-enter-${d}:nth-child(${index})`]: {
        transform: `translate${upd}(-50px)`,
      },
      [`* > .enter-${d}:nth-child(${index}),* > .-enter-${d}:nth-child(${index})`]: {
        'z-index': `${10 - index}`,
        opacity: '0',
        animation: `enter-${d}-animation 0.4s ease-in-out 0.3s`,
        'animation-fill-mode': 'forwards',
        'animation-delay': `${(index * 1) / 10}s`,
      },
    };
  };
  const handler = ({ addBase }) => {
    const addRawCss = {};
    for (let index = 1; index < maxOutput; index++) {
      Object.assign(addRawCss, {
        ...createCss(index, 'x'),
        ...createCss(index, 'y'),
      });
    }
    addBase({
      ...addRawCss,
      [`@keyframes enter-x-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateX(0)',
        },
      },
      [`@keyframes enter-y-animation`]: {
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    });
  };
  return { handler };
}
