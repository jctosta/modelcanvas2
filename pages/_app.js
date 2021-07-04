import PropTypes from 'prop-types';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import { CanvasProvider } from '../components/DataStore';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import MainLayout from '../components/layout/Main';

const theme = extendTheme({	
	colors: {
		brand: {
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
		wood: {
			'50': '#FFFFFF',
			'100': '#FFFFFF',
			'200': '#FFFFFF',
			'300': '#FFFFFF',
			'400': '#FFFFFF',
			'500': '#F6F2EF',
			'600': '#E4D7CE',
			'700': '#D1BDAE',
			'800': '#BFA28D',
			'900': '#AD886C'
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
		}
	},
	styles: {
		global: {
			body: {
				bg: 'wood.500',
				color: 'gray.900'
			},
			a: {
				color: 'brand.500',
			}
		}
	},
});

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
				<meta name="description" content="Description" />
				<meta name="keywords" content="Keywords" />
				<link rel="manifest" href="/manifest.json" />
				<meta name="theme-color" content="#da5156" />
			</Head>
			<CanvasProvider>
				<ChakraProvider theme={theme}>
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</ChakraProvider>
			</CanvasProvider>		
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType,
	pageProps: PropTypes.any
};

export default appWithTranslation(MyApp);
