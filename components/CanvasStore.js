import { useReducer, useContext, useEffect, createContext } from 'react';
import type from './ActionTypes';
import { useLocalStorage } from './LocalStorage';

const CanvasStateContext = createContext();
const CanvasDispatchContext = createContext();

const initialAppState = {
    isDarkMode: false,
    canvas: undefined,
    availableTemplates: [
        {
            name: '',
            title: 'Business Model Canvas',
            description: '',
            tags: [],
            language: 'en-US',
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
    archived: [],
    starred: [],
}

const utils = {
    findIndex: (arr, tileId) => arr.findIndex(a => a.id === tileId),
}

const reducer = (state, action) => {
    if (action.type === 'TESTE') {
        let newState = state;
        newState.canvas.name = action.payload;
        return {...newState};
    } else if (action.type === type.CREATE_CANVAS) {
        let newState = state;
        const { name, template } = action.payload;
        newState.canvas = {...newState.availableTemplates[template]};
        newState.canvas.name = name;
        return {...newState};
    } else if (action.type === type.ADD_CARD) {
        let newState = state;
        const { body, tileId } = action.payload;
        const tileIndex = newState.canvas.tiles.findIndex(t => t.id === tileId);
        console.log(tileIndex);
        newState.canvas.tiles[tileIndex].cards.push({ content: body });
        return {...newState};
    } else if (action.type === type.EDIT_CARD) {
        let newState = state;
        const { cardId, body, tileId } = action.payload;
        const tileIndex = newState.canvas.tiles.findIndex(t => t.id === tileId);
        newState.canvas.tiles[tileIndex].cards[cardId].content = body;
        return {...newState};
    } else if (action.type === type.MOVE_CARD) {
        let newState = state;
        const { cardId, tileId } = action.payload;
        const tileIndex = newState.canvas.tiles.findIndex(t => t.id === tileId);
        let cardContent = newState.canvas.tiles[tileIndex].cards[cardId].content;
        // newState.tiles[]
        newState.canvas.tiles[tileId].cards[cardId].content = body;
        return {...newState};
    } else if (action.type === type.REMOVE_CARD) {
        let newState = state;
        const { cardId, tileId } = action.payload;
        const tileIndex = newState.canvas.tiles.findIndex(t => t.id === tileId);
        newState.canvas.tiles[tileIndex].cards.splice(cardId, 1);
        return {...newState};
    } else {
        return {...state};
    }  
}

export const CanvasProvider = ({ children }) => {
    const [appState, setAppState] = useLocalStorage("modelcanvas", initialAppState);
    const [state, dispatch] = useReducer(reducer, appState);

    useEffect(() => {
        setAppState(state);
    }, [state]);

    return (
        <CanvasDispatchContext.Provider value={dispatch}>
            <CanvasStateContext.Provider value={state}>
                {children}
            </CanvasStateContext.Provider>
        </CanvasDispatchContext.Provider>
    );
}

export const useCanvas = () => useContext(CanvasStateContext);
export const useDispatchCanvas = () => useContext(CanvasDispatchContext);