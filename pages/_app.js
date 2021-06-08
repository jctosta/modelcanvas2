// import '../styles/app.scss';
import PropTypes from 'prop-types';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Layout from '../components/Layout';
import Head from 'next/head';

import { CanvasProvider } from '../components/DataStore';


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
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</CanvasProvider>		
		</>
	);
}

MyApp.propTypes = {
	Component: PropTypes.elementType,
	pageProps: PropTypes.any
};

export default MyApp;
