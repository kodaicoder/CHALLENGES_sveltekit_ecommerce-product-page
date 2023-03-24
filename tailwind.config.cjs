const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				//! Primary
				orange: 'hsl(26, 100%, 55%)',
				paleOrange: 'hsl(25, 100%, 94%)',

				//! Neutral
				veryDarkBlue: 'hsl(220, 13%, 13%)',
				darkGrayishBlue: 'hsl(219, 9%, 45%)',
				grayishBlue: 'hsl(220, 14%, 75%)',
				lightGrayishBlue: 'hsl(223, 64%, 98%)',
				black: 'hsl(0, 0%, 0%)' //? with 75% opacity for lightbox background
			},
			fontFamily: {
				kumbhSans: ['"KumbhSans"', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: []
};
