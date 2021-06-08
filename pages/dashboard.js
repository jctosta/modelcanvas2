/* eslint-disable jsx-a11y/no-onchange */
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useCanvas, useDispatchCanvas } from '../components/DataStore';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import type from '../components/ActionTypes';
import App from '../lib/app';
import TemplatesManager from '../lib/templates';
import {
	DocumentAddIcon,
	FolderOpenIcon,
} from '@heroicons/react/solid';

export default function Dashboard() {
	const canvasStore = useCanvas();
	const dispatch = useDispatchCanvas();

	const [canvasName, setCanvasName] = useState('');
	const [canvasDescription, setCanvasDescription] = useState('');
	const [canvasTemplate, setCanvasTemplate] = useState(-1);
	const [formVisible, setFormVisible] = useState(false);

	const handleNewCanvas = evt => {
		evt.preventDefault();
		dispatch({
			type: type.CREATE_CANVAS,
			payload: {
				name: canvasName,
				description: canvasDescription,
				// template: canvasTemplate,
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

	return (
		<>
			<Head>
				<title>Model Canvas</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{
				canvasStore
				&&
				<div className="container max-w-5xl mx-auto text-gray-900 dark:text-gray-100">
					<>
						<h2 className="text-3xl p-4 font-bold">All Canvases</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
							{App.listBlocksByType(canvasStore, 'canvas').map(arr => 
								<Link 
									href={{
										pathname: '/canvas',
										query: { id: arr.id },
									}}
									key={arr.id}
								>
									<a>
										<div className="card-home hover-effect">
											<h3 className="text-lg font-semibold">{arr.properties.name}</h3>
											<p className="text-base">{arr.properties.description}</p>
											<div className="flex flex-row space-x-2">
												<Tag variant={Tag.variant.SECONDARY}>{arr.properties.type}</Tag>
												<Tag variant={Tag.variant.SECONDARY}>{arr.children.size} tiles</Tag>
												<Tag variant={Tag.variant.SECONDARY}>{App.countCards(canvasStore, arr)} cards</Tag>
											</div>
										</div>
									</a>
								</Link>
							)}
						</div>
						<h2 className="text-3xl p-4 font-bold">Menu</h2>
						<div className="p-4">
							{
								formVisible
								&&
								<>
									<div>
										<div className="py-2">
											<label htmlFor="canvasName">Name:</label>
											<input 
												type="text" 
												className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" 
												onChange={e => setCanvasName(e.target.value)}
												value={canvasName}
											/>
										</div>
										<div className="py-2">
											<label htmlFor="canvasDescription">Description:</label>
											<textarea 
												id="canvasDescription"
												className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" 
												onChange={e => setCanvasDescription(e.target.value)} 
												value={canvasDescription}></textarea>
										</div>
										<div className="py-2">
											<label htmlFor="canvasTemplate">Template:</label>
											<select 
												id="canvasTemplate" 
												className="rounded-md rounded-r-node flex-grow p-3 w-full border-gray-300"
												value={canvasTemplate}
												onChange={e => setCanvasTemplate(e.target.value)}
											>
												{/* <option value={TemplatesManager.templates.BUSINESS_MODEL_CANVAS}></option> */}
												{TemplatesManager.availableTemplates.map((t, idx) => 
													<option key={idx} value={t.id}>{t.title.ptBR}</option>
												)}
											</select>
										</div>
										<div className="py-2 flex flex-row-reverse space-x-2 space-x-reverse">
											<Button variant={Button.variant.PRIMARY} onClick={handleNewCanvas}>Create</Button>
											<Button variant={Button.variant.SECONDARY} onClick={() => setFormVisible(false)}>Cancel</Button>
										</div>
									</div>
								</>
							}
							{
								!formVisible
								&&
								<div className="flex flex-row space-x-2">
									<Button variant={Button.variant.PRIMARY} onClick={() => setFormVisible(true)}>Create New Canvas</Button>
									<Button variant={Button.variant.DARK} onClick={handleExportCanvas}>Export Database</Button>
								</div>
							}
						</div>
					</>
				</div>
			}
		</>
	);
}
