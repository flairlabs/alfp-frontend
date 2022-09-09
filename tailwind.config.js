const withFonts = require("next-fonts");

module.exports = withFonts({
  webpack(config, options) {
    config.node = {
      fs: "empty",
    };
    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "url-loader?limit=100000",
        },
        {
          loader: "file-loader",
        },
      ],
    });
    return config;
  },
});

module.exports = {
  important : true,
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        custom: ["ProximaNova", "sans-serif"]
      },
      colors: {
        'accent-1': '#a4d65e',
        'accent-2': '#2c5236',
        'accent-3': '#8adec1',
        'accent-4': '#EAEAEA',
        'accent-7': '#333',
        'accent-8': '#BDC1C9',
        'gray-700': '#444',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      aspectRatio: {
        '16/9': '16 / 9',
      },
      height: {
        'screen-45': '45vh',
        'screen-50': '50vh',
        'screen-75': '75vh'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
