import PropTypes from 'prop-types';
import Head from 'next/head';
import { useCanvas, useDispatchCanvas } from '../components/DataStore';
import CanvasContainer from '../components/Canvas';
import CanvasTile from '../components/CanvasTile';
import type from '../components/ActionTypes';
import { useRouter } from 'next/router';
import App from '../lib/app';
// import Button from '../components/Button';
import Button from '../components/ui/Button';
import { PresentationChartBarIcon, PrinterIcon, SaveIcon } from '@heroicons/react/solid';

export default function Canvas() {

	const router = useRouter();
	const dispatch = useDispatchCanvas();
	const canvasStore = useCanvas();

	const { id } = router.query;

	const canvas = canvasStore.blocks.get(id);
	// console.log(canvas);

	const handleAddCard = (tileId, body) => {
		dispatch({
			type: type.ADD_CARD,
			payload: {
				tileId,
				body,
			},
		});
	};

	const handleEditCard = (tileId, cardId, body) => {
		dispatch({
			type: type.EDIT_CARD,
			payload: {
				tileId,
				cardId,
				body
			}
		});
	};

	const handleRemoveCard = (cardId) => {
		dispatch({
			type: type.REMOVE_CARD,
			payload: {
				cardId,
			}
		});
	};

	return (
		<>
			<Head>
				<title>Model Canvas</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{
				canvas
				&&
				<>
					<div className="flex flex-row items-center justify-between">
						<div>
							<h3 className="font-bold text-xl">{canvas.properties.name}</h3>
							{canvas.properties.description && <p>{canvas.properties.description}</p>}
						</div>
						<div className="flex items-center space-x-2">
							<Button 
								variant={Button.variant.WARNING} 
								size={Button.size.SMALL}
								icon={PresentationChartBarIcon}
							>
								Export as Presentation...
							</Button>
							<Button variant={Button.variant.INFO} size={Button.size.SMALL} icon={PrinterIcon}>Print as PDF...</Button>
							<Button variant={Button.variant.DANGER} size={Button.size.SMALL} icon={SaveIcon}>Download...</Button>
							{/* <Button category="secondary" className="flex flex-row"><PresentationChartBarIcon className="h-5 w-5" /><span>Export Canvas as PDF</span></Button> */}							
						</div>
					</div>
					{/* <div className="grid grid-cols-2 gap-4 py-4">
					</div> */}
					<hr className="p-4" />
					{/* <div className="container mx-auto"></div> */}
					<CanvasContainer>
						{App.listChildren(canvasStore, canvas).map(t => (
							<CanvasTile
								key={t.id}
								id={t.id}
								title={t.properties.title}
								description={t.properties.description}
								cards={App.listChildren(canvasStore, t)}
								addCard={handleAddCard}
								editCard={handleEditCard}
								removeCard={handleRemoveCard}
							/>
						))}
					</CanvasContainer>
				</>
			}			
		</>
	);

}

Canvas.propTypes = {
	// canvas: PropTypes.shape({
	// 	name: PropTypes.string,
	// 	description: PropTypes.string,
	// 	type: PropTypes.string,
	// 	language: PropTypes.string,
	// 	tags: PropTypes.arrayOf(PropTypes.string),
	// 	tiles: PropTypes.arrayOf(PropTypes.shape({
	// 		title: PropTypes.string,
	// 		id: PropTypes.string,
	// 		description: PropTypes.string,
	// 		cards: PropTypes.arrayOf(PropTypes.string),
	// 	})),
	// })
};