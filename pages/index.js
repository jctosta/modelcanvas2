import Head from 'next/head';
import Link from 'next/link';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// import { useTranslation } from 'react-i18next';

export default function Index() {

	const { t } = useTranslation('common');

	return (
		<>
			<Head>
				<title>{t('app-name')}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container max-w-5xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="p-4 text-center md:text-left text-gray-900 dark:text-gray-100">
						<h1 className="text-5xl font-bold py-4">{t('headline')}</h1>
						<p className="text-xl font-normal py-4">{t('headline-description')}</p>
						<div className="py-4">
							<Link href="/dashboard"><a className="bg-sunset-500 p-3 rounded-md text-white hover:bg-sunset-700">{t('headline-button')}</a></Link>
						</div>
					</div>
					<div className="flex align-middle justify-center md:justify-end">
						<img 
							src="/Startup_Flatline.svg" 
							alt="Startup Flatline" 
							width="406px"
							height="306px"                            
						/>
					</div>
				</div>
			</div>
			<div className="container max-w-5xl mx-auto text-gray-900 dark:text-gray-100">
				<hr className="p-4" />
				<h2 className="text-3xl p-4 font-bold">{t('marketing-title')}</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
					<div className="card-home">
						<h3 className="text-lg font-semibold">{t('marketing-bmc-title')}</h3>
						<p className="text-base italic">{t('marketing-bmc-description')}</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">{t('marketing-lean-title')}</h3>
						<p className="text-base italic">{t('marketing-lean-description')}</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">{t('marketing-media-title')}</h3>
						<p className="text-base italic">{t('marketing-media-description')}</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">{t('marketing-swot-title')}</h3>
						<p className="text-base italic">{t('marketing-swot-description')}</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">{t('marketing-product-title')}</h3>
						<p className="text-base italic">{t('marketing-product-description')}</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">{t('marketing-custom-title')}</h3>
						<p className="text-base italic">{t('marketing-custom-description')}</p>
					</div>
				</div>
			</div>
		</>
	);
}

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
});