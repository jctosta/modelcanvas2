module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		fontFamily: {
			// sans: ['Titillium Web', 'sans-serif'],
		},
		extend: {
			colors: {
				sunset: {
					'50':  '#fdfcfa',
					'100': '#fbf1e9',
					'200': '#f7d2d0',
					'300': '#eda5a6',
					'400': '#e8757a',
					'500': '#da5156',
					'600': '#c0392b',
					'700': '#99292b',
					'800': '#6d1c1d',
					'900': '#431210',
				},
				sepia: {
					'50':  '#fbfaf7',
					'100': '#f8f0df',
					'200': '#eedbba',
					'300': '#d8b688',
					'400': '#bc8a58',
					'500': '#9f6935',
					'600': '#814e23',
					'700': '#623a1c',
					'800': '#422815',
					'900': '#29180e',
				},
				shadow: {
					'50':  '#f9f9f7',
					'100': '#f2f0e9',
					'200': '#e1dfcf',
					'300': '#bebca2',
					'400': '#8f9472',
					'500': '#70734c',
					'600': '#595935',
					'700': '#45432a',
					'800': '#2f2d1f',
					'900': '#1d1b15',
				},
				teal: {
					'50':  '#f6f9f8',
					'100': '#e6f1f5',
					'200': '#c7e1e9',
					'300': '#97c1ce',
					'400': '#5e9cab',
					'500': '#467b89',
					'600': '#39616c',
					'700': '#2e4953',
					'800': '#20313a',
					'900': '#141e26',
				},
				steel: {
					'50':  '#f7f9f9',
					'100': '#e8f1f7',
					'200': '#cbe0ed',
					'300': '#9dbfd6',
					'400': '#6999b7',
					'500': '#4f7798',
					'600': '#405c7b',
					'700': '#2c3e50',
					'800': '#232e41',
					'900': '#151c29',
				},
				royalblue: {
					'50':  '#f7f9fb',
					'100': '#e4f1fc',
					'200': '#c6dcf8',
					'300': '#9abaee',
					'400': '#7092e0',
					'500': '#586ed4',
					'600': '#4852c0',
					'700': '#373d9d',
					'800': '#262970',
					'900': '#161946',
				},
				denim: {
					'50':  '#f8fafb',
					'100': '#e8f1fc',
					'200': '#cfd9f9',
					'300': '#a9b5ef',
					'400': '#868de2',
					'500': '#6c68d7',
					'600': '#584cc4',
					'700': '#4338a1',
					'800': '#2e2673',
					'900': '#191846',
				},
				orchid: {
					'50':  '#f9fafb',
					'100': '#edf1fb',
					'200': '#d9d8f7',
					'300': '#b8b3eb',
					'400': '#9b89dc',
					'500': '#8064ce',
					'600': '#6848b8',
					'700': '#4e3593',
					'800': '#352466',
					'900': '#1e173c',
				},
				cerise: {
					'50':  '#fcfbfb',
					'100': '#f8f1f5',
					'200': '#f0d3eb',
					'300': '#dfaad2',
					'400': '#d47cb3',
					'500': '#bf5797',
					'600': '#a33c76',
					'700': '#7c2d57',
					'800': '#561f39',
					'900': '#31131f',
				},
				blush: {
					'50':  '#fcfcfa',
					'100': '#faf1ef',
					'200': '#f5d3dd',
					'300': '#e8a7b9',
					'400': '#e17890',
					'500': '#cf546e',
					'600': '#b5394f',
					'700': '#8d2b39',
					'800': '#631e26',
					'900': '#3b1215',
				},
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
	],
};
