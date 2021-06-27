import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import App from '../lib/app';
import Block from '../lib/block';
import types from './ActionTypes';
import PropTypes from 'prop-types';
import TemplatesManager from '../lib/templates';

const CanvasStateContext = createContext();
const CanvasDispatchContext = createContext();

const STORAGE_KEY = 'modelcanvas';

const initialAppState = new App(STORAGE_KEY);

const reducer = (state, action) => {
	if (action.type === types.CREATE_CANVAS) {
		let newState = state;

		const { name, description, template } = action.payload;

		let block = new Block(
			App.generateID(), 
			'canvas', 
			{ name, description, type: 'business model canvas' },
		);

		if (template) {
			console.log(template);
			let children = template.tiles.map(b => new Block(App.generateID(), 'tile', b, block.id));
			console.log(children);
			// let children = TemplatesManager.loadTemplate(TemplatesManager.templates.BUSINESS_MODEL_CANVAS, TemplatesManager.languages.ptBR ,block.id);
			block.children = new Set();
	
			children.forEach(c => {
				newState.blocks.set(c.id, c);
				block.children.add(c.id);
			});
		}

		newState.blocks.set(block.id, block);

		return {...newState};
	} else if (action.type === types.CREATE_TILE) {
		let newState = state;
		const { title, description } = action.payload;
		let block = new Block(
			App.generateID(),
			'tile',
			{ title, description },
		);
		newState.blocks.set(block.id, block);
		return {...newState};
	} else if (action.type === types.ADD_CARD) {
		let newState = state;

		const { body, tileId } = action.payload;

		let block = new Block(
			App.generateID(),
			'card',
			{ content: body, type: 'text' },
			tileId,
		);

		if (newState.blocks.has(tileId)) {
			block.parent = tileId;
			newState.blocks.set(block.id, block);
			newState.blocks.get(tileId).children.add(block.id);
		} else {
			throw new Error('Parent not found');
		}		

		return {...newState};
	} else if (action.type === types.EDIT_CARD) {
		let newState = state;
		const { cardId, body } = action.payload;
		let card = newState.blocks.get(cardId);
		card.properties.content = body;
		newState.blocks.set(card.id, card);
		// newState.editBlock(cardId, card);
		return {...newState};
	} else if (action.type === types.REMOVE_CARD) {
		let newState = state;
		const { cardId } = action.payload;
		let card = newState.blocks.get(cardId);
		newState.blocks.get(card.parent).children.delete(cardId);
		newState.blocks.delete(cardId);
		return {...newState};
	} else if (action.type === types.RESET_DATABASE) {
		let newState = initialAppState;
		return {...newState};
	} else if (action.type === types.LOAD_CANVAS) {
		let newState = action.value;
		return {...newState};
	} else {
		return {...state};
	}
};

export function CanvasProvider({ children }) {

	// const [appState, setAppState] = useState(initialAppState);
	const [started, setStarted] = useState(false);
	const [state, dispatch] = useReducer(reducer, initialAppState);

	useEffect(() => {
		if (started) {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state, App.replacer));
		}
	}, [state, started]);

	useEffect(() => {
		const item = window.localStorage.getItem(STORAGE_KEY);
		dispatch({
			type: types.LOAD_CANVAS,
			value: (item !== undefined ? Object.assign(new App, JSON.parse(item, App.reviver)) : initialAppState),
		});
		setStarted(true);
	}, []);

	return (
		<CanvasDispatchContext.Provider value={dispatch}>
			<CanvasStateContext.Provider value={state}>
				{children}
			</CanvasStateContext.Provider>
		</CanvasDispatchContext.Provider>
	);
}

CanvasProvider.propTypes = {
	children: PropTypes.node,
};

export const useCanvas = () => useContext(CanvasStateContext);
export const useDispatchCanvas = () => useContext(CanvasDispatchContext);