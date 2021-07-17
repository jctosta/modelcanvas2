// import PropTypes from 'prop-types';
import Head from 'next/head';
import { useCanvas, useDispatchCanvas } from '../components/DataStore';
import { useEffect, useState } from 'react';
import CanvasContainer from '../components/Canvas';
import CanvasTile from '../components/CanvasTile';
import type from '../components/ActionTypes';
import { useRouter } from 'next/router';
import App from '../lib/app';
import MyButton from '../components/ui/Button';
import MyAnchor from '../components/ui/Anchor';
import { PresentationChartBarIcon, PrinterIcon, SaveIcon, DocumentTextIcon } from '@heroicons/react/solid';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
	Box,
	Heading,
	Text,
	Button,
	SimpleGrid,
	Divider,
	Stack,
	VisuallyHidden,
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Textarea,
	useRadio,
	HStack,
	useRadioGroup,
	Icon,
	Flex,
	Spacer,
	IconButton,
	LinkBox,
	LinkOverlay,
	Grid,
	GridItem,
	Editable,
	EditablePreview,
	EditableInput,
	CloseButton,
} from '@chakra-ui/react';

const CanvasCardForm = ({ id, addCard }) => {
	const [displayForm, setDisplayForm] = useState(false);
	const [cardContent, setCardContent] = useState('');
	
	const handleAddCard = (evt) => {
		evt.preventDefault();
		addCard(id, cardContent);
		setCardContent('');
		setDisplayForm(false);
	};

	return (
		<Box>
			{
				displayForm
					?
					<Box>
						<FormControl py="3">
							<FormLabel>Content</FormLabel>
							<Textarea onChange={(e) => setCardContent(e.target.value)} value={cardContent} bg="white"></Textarea>
						</FormControl>
						<Button variant="solid" colorScheme="brand" onClick={handleAddCard}>Create</Button>
					</Box>
					:
					<Box>
						<Button variant="solid" colorScheme="brand" onClick={() => setDisplayForm(true)}>Add Card</Button>
					</Box>
			}
		</Box>
	);
};

const EditableCard = ({ parentId, id, content, editCard }) => {
	const [cardContent, setCardContent] = useState(content);

	const handleEditCard = () => {
		editCard(parentId, id, cardContent);
	};

	return (
		<Box py="2" bg="gray.100" rounded="md" px="4" my="4">
			<Flex>
				<Stack>
					<Editable defaultValue={cardContent} onSubmit={handleEditCard} onChange={(value) => setCardContent(value)}>
						<EditablePreview />
						<EditableInput />
					</Editable>
					<Text textAlign="left" fontSize="xs" fontStyle="italic">Edited</Text>
				</Stack>
				<Spacer />
				<CloseButton />
			</Flex>
		</Box>
	);
};

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

	console.log(canvasStore);

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
					<Grid templateRows={{ base: 'auto', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(2, 1fr)' }} templateColumns={{ base: 'auto', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' }} gap={4}>
						{App.listChildren(canvasStore, canvas).map(t => (
							<GridItem 
								key={t.id} 
								rowSpan={{ base: 'auto', sm: '1', xl: t.properties.rowSpan }} 
								colSpan={{ base: 'auto', sm: '1', xl: t.properties.colSpan }} 
								borderWidth="2px"
								borderRadius="md"
								borderColor="gray.200"
								padding="4"
								boxShadow="md"
								backgroundColor="white">
								<Heading fontSize="xl" py="2" fontStyle="">{t.properties.title}</Heading>
								<Text fontSize="sm" fontStyle="italic" color="gray.700" py="2">{t.properties.description}</Text>
								<Divider py="2" />
								{App.listChildren(canvasStore, t).map(card => (
									<EditableCard key={card.id} parentId={t.id} id={card.id} content={card.properties.content} editCard={handleEditCard} />
								))}
								<CanvasCardForm id={t.id} addCard={handleAddCard} />
							</GridItem>
							// <CanvasTile
							// 	key={t.id}
							// 	id={t.id}
							// 	title={t.properties.title}
							// 	description={t.properties.description}
							// 	cards={App.listChildren(canvasStore, t)}
							// 	addCard={handleAddCard}
							// 	editCard={handleEditCard}
							// 	removeCard={handleRemoveCard}
							// />
						))}
						
					</Grid>
				</>
			}
			{/* {
				canvas
				&&
				<>
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div>
							<h3 className="font-bold text-xl">{canvas.properties.name}</h3>
							{canvas.properties.description && <p>{canvas.properties.description}</p>}
						</div>
						<div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 space-x-0 md:space-x-2">
							<MyAnchor 
								variant={MyAnchor.variant.WARNING} 
								size={MyAnchor.size.SMALL} 
								icon={PresentationChartBarIcon} 
								href={`/remark.html?markdown=${encodeURIComponent(btoa(markdown))}`}
								target={MyAnchor.target.BLANK}
							>
								{t('canvas-button-export-presentation')}
							</MyAnchor>
							<MyAnchor
								variant={MyAnchor.variant.DARK}
								size={MyAnchor.size.SMALL}
								icon={DocumentTextIcon}
								href={`data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`}
								target={MyAnchor.target.SELF}
								download={`${App.toSnakeCase(canvas.properties.name)}.md`}
							>
								{t('canvas-button-download-markdown')}
							</MyAnchor>
							<MyButton variant={MyButton.variant.SECONDARY} size={MyButton.size.SMALL} onClick={handleShare}>{t('canvas-button-share')}</MyButton>
							<MyButton variant={MyButton.variant.INFO} size={MyButton.size.SMALL} icon={PrinterIcon}>{t('canvas-button-print-pdf')}</MyButton>
							<MyButton variant={MyButton.variant.DANGER} size={MyButton.size.SMALL} icon={SaveIcon}>{t('canvas-button-download')}</MyButton>
						</div>
					</div>
					<hr className="p-4" />
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
			}			 */}
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