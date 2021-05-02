import { useReducer, useContext, createContext } from 'react';
import { ADD_CARD, MOVE_CARD, EDIT_CARD, REMOVE_CARD } from './ActionTypes';

const CanvasStateContext = createContext();
const CanvasDispatchContext = createContext();

const initialState = {
    name: 'Meu Canvas',
    type: 'business_model_canvas',
    tiles: [
        {
            id: 'BMC_PARCERIAS',
            title: 'Parcerias Principais',
            size: 'is-one-quarter',
            cards: [
                {
                    id: 'BMC_PARCERIAS-0',
                    content: 'Lorem Ipsum Dolor Sit Amet'
                },
                {
                    id: 'BMC_PARCERIAS-1',
                    content: 'Viajando pra Brasilia'
                }
            ]
        },
        {
            id: 'BMC_ATIVIDADES',
            title: 'Atividades Principais',
            size: 'is-one-quarter',
            cards: [
                {
                    id: 'BMC_ATIVIDADES-0',
                    content: 'Lorem Ipsum Dolor Sit Amet'
                },
                {
                    id: 'BMC_ATIVIDADES-1',
                    content: 'Viajando pra Brasilia'
                }
            ]
        },
        {
            id: 'BMC_RECURSOS',
            title: 'Recursos Principais',
            size: 'is-one-quarter',
            cards: [
                {
                    id: 'BMC_RECURSOS-0',
                    content: 'Lorem Ipsum Dolor Sit Amet'
                },
                {
                    id: 'BMC_RECURSOS-1',
                    content: 'Viajando pra Brasilia'
                }
            ]
        },
        {
            id: 'BMC_VALOR',
            title: 'Proposta de Valor',
            size: 'is-one-quarter',
            cards: [
                {
                    id: 'BMC_VALOR-0',
                    content: 'Lorem Ipsum Dolor Sit Amet'
                },
                {
                    id: 'BMC_VALOR-1',
                    content: 'Viajando pra Brasilia'
                }
            ]
        },
        {
            id: 'BMC_RELACIONAMENTO',
            title: 'Relacionamento com Clientes',
            size: 'is-one-third',
            cards: [
                {
                    id: 'BMC_RELACIONAMENTO-0',
                    content: 'Lorem Ipsum Dolor Sit Amet'
                },
                {
                    id: 'BMC_RELACIONAMENTO-1',
                    content: 'Viajando pra Brasilia'
                },
                {
                    id: 'BMC_RELACIONAMENTO-2',
                    content: 'Lorem Ipsum Dolor Sit Amet'
                },
                {
                    id: 'BMC_RELACIONAMENTO-3',
                    content: 'Viajando pra Brasilia'
                },
                {
                    id: 'BMC_RELACIONAMENTO-4',
                    content: 'Viajando pra Brasilia'
                },
                {
                    id: 'BMC_RELACIONAMENTO-5',
                    content: 'Viajando pra Brasilia'
                }
            ]
        },
        {
            id: 'BMC_CANAIS',
            title: 'Canais',
            size: 'is-one-third',
            cards: []
        },
        {
            id: 'BMC_SEGMENTOS',
            title: 'Segmentos de Clientes',
            size: 'is-one-third',
            cards: []
        },
        {
            id: 'BMC_CUSTOS',
            title: 'Estrutura de Custos',
            size: 'is-half',
            cards: []
        },
        {
            id: 'BMC_RECEITA',
            title: 'Fontes de Receita',
            size: 'is-half',
            cards: []
        }
    ]
};

const utils = {
    findIndex: (arr, tileId) => arr.findIndex(a => a.id === tileId),
}

const reducer = (state, action) => {
    if (action.type === 'TESTE') {
        let newState = state;
        newState.name = action.payload;
        return {...newState};
    } else if (action.type === ADD_CARD) {
        let newState = state;
        const { body, tileId } = action.payload;
        const tileIndex = newState.tiles.findIndex(t => t.id === tileId);
        console.log(tileIndex);
        newState.tiles[tileIndex].cards.push({ content: body });
        return {...newState};
    } else if (action.type === EDIT_CARD) {
        let newState = state;
        const { cardId, body, tileId } = action.payload;
        const tileIndex = newState.tiles.findIndex(t => t.id === tileId);
        newState.tiles[tileIndex].cards[cardId].content = body;
        return {...newState};
    } else if (action.type === MOVE_CARD) {
        let newState = state;
        const { cardId, tileId } = action.payload;
        const tileIndex = newState.tiles.findIndex(t => t.id === tileId);
        let cardContent = newState.tiles[tileIndex].cards[cardId].content;
        // newState.tiles[]
        newState.tiles[tileId].cards[cardId].content = body;
        return {...newState};
    } else if (action.type === REMOVE_CARD) {
        let newState = state;
        const { cardId, tileId } = action.payload;
        const tileIndex = newState.tiles.findIndex(t => t.id === tileId);
        newState.tiles[tileIndex].cards.splice(cardId, 1);
        return {...newState};
    } else {
        return {...state};
    }  
}

export const CanvasProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
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