const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		runtimeCaching,
		disable: process.env.NODE_ENV === 'development',
	},
	i18n,
});

// module.exports = {};