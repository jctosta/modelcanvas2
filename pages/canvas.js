// import PropTypes from 'prop-types';
import Head from 'next/head';
import { useCanvas, useDispatchCanvas } from '../components/DataStore';
import { useEffect, useState } from 'react';
import CanvasContainer from '../components/Canvas';
import CanvasTile from '../components/CanvasTile';
import type from '../components/ActionTypes';
import { useRouter } from 'next/router';
import App from '../lib/app';
import Button from '../components/ui/Button';
import Anchor from '../components/ui/Anchor';
import { snakeCase } from 'lodash';
import { PresentationChartBarIcon, PrinterIcon, SaveIcon, DocumentTextIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Canvas() {

	const router = useRouter();
	const dispatch = useDispatchCanvas();
	const canvasStore = useCanvas();

	const { t } = useTranslation('common');

	const [markdown, setMarkdown] = useState('');

	const { id } = router.query;

	const canvas = canvasStore.blocks.get(id);

	useEffect(() => {
		if (!router.isReady) return;
		setMarkdown(App.createMarkdown(canvasStore, canvas));
	}, [router.isReady, canvasStore, canvas]);

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

	const handleShare = (evt) => {
		evt.preventDefault();
		if (navigator.share) {
			navigator.share({
				title: t('share-title'),
				text: t('share-text'),
				url: 'https://modelcanvas.vercel.app',
			})
				.then(() => console.log(t('share-success')))
				.catch((error) => console.error(t('share-error'), error));
		} else {
			window.alert(t('share-unavailable'));
		}
	};

	return (
		<>
			<Head>
				<title>{t('app-name')}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{
				canvas
				&&
				<>
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div>
							<h3 className="font-bold text-xl">{canvas.properties.name}</h3>
							{canvas.properties.description && <p>{canvas.properties.description}</p>}
						</div>
						<div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-2">
							<Anchor 
								variant={Anchor.variant.WARNING} 
								size={Anchor.size.SMALL} 
								icon={PresentationChartBarIcon} 
								href={`/remark.html?markdown=${encodeURIComponent(btoa(markdown))}`}
								target={Anchor.target.BLANK}
							>
								{t('canvas-button-export-presentation')}
							</Anchor>
							<Anchor
								variant={Anchor.variant.DARK}
								size={Anchor.size.SMALL}
								icon={DocumentTextIcon}
								href={`data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`}
								target={Anchor.target.SELF}
								download={`${snakeCase(canvas.properties.name)}.md`}
							>
								{t('canvas-button-download-markdown')}
							</Anchor>
							<Button variant={Button.variant.SECONDARY} size={Button.size.SMALL} onClick={handleShare}>{t('canvas-button-share')}</Button>
							<Button variant={Button.variant.INFO} size={Button.size.SMALL} icon={PrinterIcon}>{t('canvas-button-print-pdf')}</Button>
							<Button variant={Button.variant.DANGER} size={Button.size.SMALL} icon={SaveIcon}>{t('canvas-button-download')}</Button>
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

export const getStaticProps = async ({ locale }) => ({
	props: {
		...await serverSideTranslations(locale, ['common']),
	},
});