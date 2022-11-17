module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sendDesk: '#2FB8FA',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
