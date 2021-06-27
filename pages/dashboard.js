/* eslint-disable jsx-a11y/no-onchange */
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useCanvas, useDispatchCanvas } from '../components/DataStore';
import Button from '../components/ui/Button';
import Anchor from '../components/ui/Anchor';
import Toast from '../components/ui/Toast';
import Tag from '../components/ui/Tag';
import type from '../components/ActionTypes';
import App from '../lib/app';
import PropTypes from 'prop-types';
import {
	DocumentDuplicateIcon,
	AdjustmentsIcon,
	PencilAltIcon,
	CloudUploadIcon,
	CloudDownloadIcon,
	ExclamationIcon,
	SparklesIcon,
	XIcon,
} from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { RadioGroup } from '@headlessui/react';

export default function Dashboard({ templates }) {
	const canvasStore = useCanvas();
	const dispatch = useDispatchCanvas();

	const [canvasName, setCanvasName] = useState('');
	const [canvasDescription, setCanvasDescription] = useState('');
	const [canvasTemplate, setCanvasTemplate] = useState(-1);
	const [formVisible, setFormVisible] = useState(false);
	const [notification, setNotification] = useState(undefined);
	const fileInput = useRef(null);

	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification(undefined);
			}, 4000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	const { t } = useTranslation('common');

	const handleNewCanvas = evt => {
		evt.preventDefault();
		dispatch({
			type: type.CREATE_CANVAS,
			payload: {
				name: canvasName,
				description: canvasDescription,
				template: templates[canvasTemplate],
			},			
		});
		setFormVisible(false);
		setCanvasName('');
		setCanvasDescription('');
		setCanvasTemplate(-1);
	};

	// const handleImport = (evt) => {
	// 	evt.preventDefault();
		
	// 	const dataURL = window.URL.createObjectURL(evt.target['file-import'].files[0]);
	// 	fetch(dataURL)
	// 		.then(results => results.json())
	// 		.then(data => {
	// 			dispatch({
	// 				type: type.IMPORT_DATABASE,
	// 				payload: {
	// 					data: data,
	// 				}
	// 			});
	// 		});
	// };

	const handleExportCanvas = (evt) => {
		evt.preventDefault();

		const dataURL = `data:text/json;charset=utf-8,${encodeURIComponent(App.exportAll(canvasStore))}`;

		const anchor = document.createElement('a');
		anchor.download = 'database.json';
		anchor.href = dataURL;
		anchor.target = '_self';
		document.body.appendChild(anchor);
		anchor.click();
		document.body.removeChild(anchor);		


	};

	const handleFileSelect = (evt) => {
		evt.preventDefault();

		fileInput.current.click();
		// console.log(blob);
	};

	const handleFileOpen = (evt) => {
		evt.preventDefault();

		console.log(evt.target.files[0].name);
		const dataURL = window.URL.createObjectURL(evt.target.files[0]);
		fetch(dataURL)
			.then(results => results.json())
			.then((data) => {
				console.log(data);
			});
	};

	const handleResetDatabase = (evt) => {
		evt.preventDefault();

		dispatch({
			type: type.RESET_DATABASE,
			payload: {}
		});

		setNotification('Database sucessfully erased');
	};

	return (
		<>
			<Head>
				<title>{t('app-name')}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			
			{
				canvasStore
				&&
				<div className="container max-w-5xl mx-auto text-gray-900 dark:text-gray-100">
					{
						notification 
						&& 
						<Toast variant={Toast.variant.SECONDARY} onClose={() => setNotification(undefined)}>{notification}</Toast>
					}
					<>
						<h2 className="text-3xl p-4 font-bold">{t('dashboard-canvas-list-title')}</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4">
							{App.listBlocksByType(canvasStore, 'canvas').map(arr => 
								<div className="card-home hover-effect" key={arr.id}>
									<div className="flex flex-row">
										<div className="flex-grow">
											<h3 className="text-lg font-semibold">{arr.properties.name}</h3>
											<p className="text-base">{arr.properties.description}</p>
										</div>
										<div className="flex-none">
											<Button variant={Button.variant.TRANSPARENT} size={Button.size.ICON_ONLY} icon={AdjustmentsIcon} />
											<Button variant={Button.variant.TRANSPARENT} size={Button.size.ICON_ONLY} icon={XIcon} />
										</div>
									</div>
									
									<div className="flex flex-row space-x-2 py-3">
										<Tag variant={Tag.variant.SECONDARY}>{arr.properties.type}</Tag>
										<Tag variant={Tag.variant.SECONDARY}>{arr.children.size} {t('dashboard-canvas-list-tile-name')}</Tag>
										<Tag variant={Tag.variant.SECONDARY}>{App.countCards(canvasStore, arr)} {t('dashboard-canvas-list-card-name')}</Tag>
									</div>
									<hr />
									<div className="flex flex-row-reverse space-x-2 space-x-reverse pt-3">
										<Link href={{ pathname: '/canvas', query: { id: arr.id }, }} passHref={true}>
											<Anchor variant={Anchor.variant.PRIMARY} size={Anchor.size.SMALL} icon={PencilAltIcon}>{t('dashboard-actions-button-edit-canvas')}</Anchor>
										</Link>
										<Button variant={Button.variant.SECONDARY} size={Button.size.SMALL} icon={DocumentDuplicateIcon}>{t('dashboard-actions-button-duplicate-canvas')}</Button>
									</div>
								</div>
							)}
						</div>			
						<div className="p-4">
							{
								formVisible
								&&
								<>
									<div>
										<div className="py-2">
											<div className="py-2">
												<label htmlFor="canvasName">{t('dashboard-form-label-name')}</label>
											</div>
											<input 
												type="text" 
												className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" 
												onChange={e => setCanvasName(e.target.value)}
												value={canvasName}
											/>
										</div>
										<div className="py-2">
											<div className="py-2">
												<label htmlFor="canvasDescription">{t('dashboard-form-label-description')}</label>
											</div>
											<textarea 
												id="canvasDescription"
												className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" 
												onChange={e => setCanvasDescription(e.target.value)} 
												value={canvasDescription}></textarea>
										</div>
										<div className="py-2">
											<RadioGroup value={canvasTemplate} onChange={setCanvasTemplate}>
												<RadioGroup.Label>{t('dashboard-form-label-template')}</RadioGroup.Label>
												<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 py-2">
													{templates.map((template, idx) => (
														<RadioGroup.Option key={idx} value={idx}>
															{({ checked }) => (
																<div className={`card-home hover-effect ${checked ? 'border-sunset-500' : ''}`}>
																	<div className="flex flex-row">
																		<div className="flex-grow">
																			<h3 className="text-lg font-semibold">{template.name}</h3>
																			<p className="text-base">{template.type}</p>
																			<div className="flex flex-row space-x-2 py-3">
																				<Tag variant={Tag.variant.PRIMARY}>{template.language}</Tag>
																				<Tag variant={Tag.variant.SECONDARY}>{template.tiles.length} tiles</Tag>														
																			</div>
																		</div>
																	</div>
																</div>
															)}
														</RadioGroup.Option>
													))}
												</div>
											</RadioGroup>
										</div>
										<div className="py-2 flex flex-row-reverse space-x-2 space-x-reverse">
											<Button variant={Button.variant.PRIMARY} onClick={handleNewCanvas}>{t('dashboard-form-button-create')}</Button>
											<Button variant={Button.variant.SECONDARY} onClick={() => setFormVisible(false)}>{t('dashboard-form-button-cancel')}</Button>
										</div>
									</div>
								</>
							}
							{
								!formVisible
								&&
								<div className="flex flex-row space-x-2">
									<Button variant={Button.variant.PRIMARY} icon={SparklesIcon} onClick={() => setFormVisible(true)}>{t('dashboard-actions-button-create-canvas')}</Button>
									<input ref={fileInput} className="hidden" type="file" accept=".json,.canvas" name="file-import" id="file-import" onChange={handleFileOpen} />
									<Button variant={Button.variant.DARK} onClick={handleFileSelect}>{t('dashboard-actions-button-upload-document')}</Button>
								</div>
							}
						</div>
						<h2 className="text-3xl p-4 font-bold">{t('dashboard-actions-title')}</h2>
						<div className="p-4">
							<div className="flex flex-row space-x-2">								
								<Button variant={Button.variant.DARK} icon={CloudDownloadIcon} onClick={handleExportCanvas}>{t('dashboard-actions-button-export-database')}</Button>
								<Button variant={Button.variant.WARNING} icon={CloudUploadIcon} >{t('dashboard-actions-button-import-database')}</Button>
								<Button variant={Button.variant.DANGER} icon={ExclamationIcon} onClick={handleResetDatabase}>{t('dashboard-actions-button-reset-database')}</Button>
							</div>
						</div>
					</>
				</div>
			}
		</>
	);
}

export const getStaticProps = async ({ locale }) => {
	const res = await fetch('https://gist.githubusercontent.com/jctosta/4e74e193b758203e46124e727eff928f/raw/8d6ed51b17b364480d09a4d4871dee088c37ee61/canvasTemplates.json');
	const data = await res.json();
	return {
		props: {
			...await serverSideTranslations(locale, ['common']),
			templates: data.templates,
		},
	};
};

Dashboard.propTypes = {
	templates: PropTypes.arrayOf(PropTypes.shape({
		language: PropTypes.string,
		type: PropTypes.string,
		name: PropTypes.string,
		tiles: PropTypes.arrayOf(PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string
		}))
	})),
};