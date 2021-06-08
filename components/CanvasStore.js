import PropTypes from 'prop-types';
import { useReducer, useContext, useEffect, createContext, useState } from 'react';
import type from './ActionTypes';
import canvasUtils from '../lib/CanvasUtils';
import CanvasHandler from '../lib/CanvasHandler';
import App from '../lib/app';
import Block from '../lib/block';

const CanvasStateContext = createContext();
const CanvasDispatchContext = createContext();

const initialAppState = {
	isDarkMode: false,
	canvas: undefined,
	availableTemplates: [
		{
			id: undefined,
			name: undefined,
			description: undefined,
			type: 'Business Model Canvas',
			language: 'en-US',
			tags: [],
			tiles: [
				{ title: 'Key Partners', id: 'key-partners', description: '', cards: [] },
				{ title: 'Key Activities', id: 'key-activities', description: '', cards: [] },
				{ title: 'Key Resources', id: 'key-resources', description: '', cards: [] },
				{ title: 'Value Proposition', id: 'value-proposition', description: '', cards: [] },
				{ title: 'Client Relations', id: 'client-relations', description: '', cards: [] },
				{ title: 'Channels', id: 'channels', description: '', cards: [] },
				{ title: 'Client Segments', id: 'client-segments', description: '', cards: [] },
				{ title: 'Cost Structure', id: 'cost-structure', description: '', cards: [] },
				{ title: 'Revenue Sources', id: 'revenue-sources', description: '', cards: [] },
			]
		}
	],
	archived: new Map(),
	starred: [],
};

const reducer = (state, action) => {
	if (action.type === 'TESTE') {
		let newState = state;
		newState.canvas.name = action.payload;
		return {...newState};
	} else if (action.type === type.CREATE_CANVAS) {
		let newState = state;
		
		const { name, description, template } = action.payload;
		
		let newCanvas = {...newState.availableTemplates[template]};
		newCanvas.name = name;
		newCanvas.description = description;
		let newCanvasId = canvasUtils.generateID();
		
		newState.archived.set(newCanvasId, newCanvas);
		newState.canvas = newCanvasId;
		
		return {...newState};
	} else if (action.type === type.ADD_CARD) {
		let newState = state;
		const { body, canvasId, tileId } = action.payload;

		// const tempCanvas = newState.archived.get(canvasId);

		const tempCanvas = CanvasHandler.addCard(newState.archived.get(canvasId), tileId, body);

		// const tileIndex = tempCanvas.tiles.findIndex(t => t.id === tileId);
		// tempCanvas.tiles[tileIndex].cards.push({ id: canvasUtils.generateID(), content: body });

		newState.archived.set(canvasId, tempCanvas);

		return {...newState};
	} else if (action.type === type.EDIT_CARD) {

		let newState = state;

		const { canvasId, cardId, body, tileId } = action.payload;

		// const tempCanvas = newState.archived.get(canvasId);

		const tempCanvas = CanvasHandler.editCard(newState.archived.get(canvasId), tileId, cardId, body);

		// const tileIndex = tempCanvas.tiles.findIndex(t => t.id === tileId);
		// const cardIndex = tempCanvas.tiles[tileIndex].cards.findIndex(c => c.id === cardId);
		// tempCanvas.tiles[tileIndex].cards[cardIndex].content = body;

		newState.archived.set(canvasId, tempCanvas);

		return {...newState};
	} else if (action.type === type.MOVE_CARD) {
		let newState = state;
		
		const { canvasId, cardId, tileId } = action.payload;
		const tempCanvas = newState.archived.get(canvasId);

		const tileIndex = tempCanvas.tiles.findIndex(t => t.id === tileId);
		const cardIndex = tempCanvas.tiles[tileIndex].cards.findIndex(c => c.id === cardId);
		let cardContent = tempCanvas.tiles[tileIndex].cards[cardIndex].content;

		tempCanvas.tiles[tileId].cards[cardId].content = cardContent;

		newState.archived.set(canvasId, tempCanvas);

		return {...newState};
	} else if (action.type === type.REMOVE_CARD) {
		let newState = state;

		const { canvasId, cardId, tileId } = action.payload;

		const tempCanvas = newState.archived.get(canvasId);

		const tileIndex = tempCanvas.tiles.findIndex(t => t.id === tileId);
		const cardIndex = tempCanvas.tiles[tileIndex].cards.findIndex(c => c.id === cardId);
		tempCanvas.tiles[tileIndex].cards.splice(cardIndex, 1);

		newState.archived.set(canvasId, tempCanvas);

		return {...newState};
	} else if (action.type === type.LOAD_CANVAS) {
		let newState = action.value;
		return {...newState};
	} else {
		return {...state};
	}  
};

export const CanvasProvider = ({ children, storageKey }) => {

	const [appState, setAppState] = useState(initialAppState);
	const [started, setStarted] = useState(false);
	const [state, dispatch] = useReducer(reducer, appState);

	useEffect(() => {
		if (started) {
			// const newAppState = appState instanceof Function ? appState()
			window.localStorage.setItem(storageKey, JSON.stringify(state, canvasUtils.replacer));
			// setAppState(appState);
		}
	}, [storageKey, state, started]);

	useEffect(() => {
		const item = window.localStorage.getItem(storageKey);
		dispatch({
			type: type.LOAD_CANVAS,
			value: (item !== undefined ? JSON.parse(item, canvasUtils.reviver) : initialAppState),
		});
		setStarted(true);
		
		// const item = window.localStorage.getItem(storageKey);
		// item && setAppState(JSON.parse(item, canvasUtils.reviver));
		// setAppState(item ? JSON.parse(item, canvasUtils.reviver) : initialAppState);
	}, [storageKey]);

	

	return (
		<CanvasDispatchContext.Provider value={dispatch}>
			<CanvasStateContext.Provider value={state}>
				{children}
			</CanvasStateContext.Provider>
		</CanvasDispatchContext.Provider>
	);
};

CanvasProvider.propTypes = {
	storageKey: PropTypes.string,
	children: PropTypes.node
};

export const useCanvas = () => useContext(CanvasStateContext);
export const useDispatchCanvas = () => useContext(CanvasDispatchContext);