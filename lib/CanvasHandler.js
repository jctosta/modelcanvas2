import canvasUtils from './CanvasUtils';

export default class CanvasHandler {
	/**
	 * 
	 * @param {*} canvas 
	 * @returns number
	 */
	static cardCount(canvas) {
		return canvas.tiles.map(t => t.cards.length).reduce((acc, current) => acc + current);		
	}
	static getAllCards(canvas) {
		return [].concat.apply([], canvas.tiles.map(t => t.cards));
	}
	static getTileCards(canvas, tileId) {
		const tileIndex = canvas.tiles.findIndex(t => t.id === tileId);
		return canvas.tiles[tileIndex].cards;
	}
	static getCardById(canvas, cardId) {
		let cards = CanvasHandler.getAllCards(canvas);
		let cardIndex = cards.findIndex(c => c.id === cardId);
		return cards[cardIndex];
	}
	
	static addCard(canvas, tileId, body) {
		const tileIndex = canvas.tiles.findIndex(t => t.id === tileId);
		canvas.tiles[tileIndex].cards.push({ id: canvasUtils.generateID(), content: body });
		return {...canvas};
	}
	static editCard(canvas, tileId, cardId, body) {
		const tileIndex = canvas.tiles.findIndex(t => t.id === tileId);
		const cardIndex = canvas.tiles[tileIndex].cards.findIndex(c => c.id === cardId);
		canvas.tiles[tileIndex].cards[cardIndex].content = body;
		return {...canvas};
	}
	static moveCard(canvas, tileId, cardId) {

	}
}