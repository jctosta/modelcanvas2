import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
	HomeIcon,
	ViewGridAddIcon,
	SunIcon,
	MoonIcon,
} from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import Navbar from './ui/Navbar';
import NavbarSection from './ui/NavbarSection';
// import { useTranslation } from 'react-i18next';

export default function Layout({ children }) {
	const [darkMode, setDarkMode] = useState(false);
	// const [t, i18n] = useTranslation();
	const router = useRouter();
	const { t } = useTranslation('common');
	
	const toggleDarkMode = () => {
		if (document.body.classList.contains('dark')) {
			document.body.classList.remove('dark');
			setDarkMode(false);
		} else {
			document.body.classList.add('dark');
			setDarkMode(true);
		}
	};

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="description" content="Model Canvas" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
				<meta
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
					name="viewport"
				/>
				<meta name="viewport" content="width=device-width" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div className="flex flex-row w-full max-h-full bg-sepia-50 dark:bg-steel-700">				
				{/* Main Container */}
				<div className="flex-grow self-stretch md:flex-grow h-screen">
					<div className="flex flex-col w-full flex-1">
						{/* Navbar */}
						<Navbar>
							<NavbarSection size={NavbarSection.size.QUARTER}>
								<Link href="/">
									<a className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
										<HomeIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
										<span className="hidden md:inline">{t('layout-home-menu')}</span>
									</a>
								</Link>
								<Link href="/dashboard">
									<a className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
										<ViewGridAddIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
										<span className="hidden md:inline">{t('layout-canvas-menu')}</span>
									</a>
								</Link>
							</NavbarSection>
							<NavbarSection size={NavbarSection.size.HALF} position={NavbarSection.position.CENTER} direction={NavbarSection.direction.CENTER}>
								<Image
									src="/ModelCanvasLogo.svg"
									alt="Logotipo do Aplicativo Model Canvas"
									width={200}
									height={34.65}
								/>
							</NavbarSection>
							<NavbarSection size={NavbarSection.size.QUARTER} direction={NavbarSection.direction.REVERSE}>
								<button
									className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100"
									onClick={() => toggleDarkMode()}
								>
									{
										darkMode 
											?
											<SunIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
											:
											<MoonIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
									}
									<span className="hidden md:inline">{t('layout-dark-mode')}</span>
								</button>
								<Link href={router.asPath} locale={'en'}>
									<a className="px-2">EN</a>
								</Link>
								<Link href={router.asPath} locale={'pt'}>
									<a className="px-2">PT</a>
								</Link>
							</NavbarSection>
						</Navbar>
						{/* <div className="flex-none fixed w-full z-0">
							<div className="flex flex-row items-center bg-sepia-50 dark:bg-steel-800 w-full border-b-2 border-gray-900 border-opacity-10 bg-opacity-80 ">
								<div className="flex-none p-4 w-1/4">
									<div className="flex flex-row">
										<Link href="/">
											<a className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
												<HomeIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
												<span className="hidden md:inline">{t('layout-home-menu')}</span>
											</a>
										</Link>
										<Link href="/dashboard">
											<a className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
												<ViewGridAddIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
												<span className="hidden md:inline">{t('layout-canvas-menu')}</span>
											</a>
										</Link>
									</div>
								</div>
								<div className="flex-grow w-2/4 text-center">
									<Image
										src="/ModelCanvasLogo.svg"
										alt="Logotipo do Aplicativo Model Canvas"
										width={200}
										height={34.65}
									/>
								</div>
								<div className="flex-none p-4 w-1/4">
									<div className="flex flex-row-reverse">
										<button
											className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100"
											onClick={() => toggleDarkMode()}
										>
											{
												darkMode 
													?
													<SunIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
													:
													<MoonIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
											}
											<span className="hidden md:inline">{t('layout-dark-mode')}</span>
										</button>
										<Link href={router.asPath} locale={'en'}>
											<a className="px-2">EN</a>
										</Link>
										<Link href={router.asPath} locale={'pt'}>
											<a className="px-2">PT</a>
										</Link>
									</div>
								</div>
							</div>
						</div> */}
						<div className="flex-grow mt-16 p-4 overflow-auto">
							{children}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node
};
