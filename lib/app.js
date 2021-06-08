export default class App {
	constructor(name) {
		this.name = name;
		this.blocks = new Map();
	}
	static isSetsEqual(a, b) { 
		return a.size === b.size && [...a].every(value => b.has(value)); 
	}
	static generateID() {
		return Math.random().toString(36).substr(2, 9);
	}
	static replacer(key, value) {
		if (value instanceof Map) {
			return {
				dataType: 'Map',
				value: Array.from(value.entries()),
			};
		} else if (value instanceof Set) {
			return {
				dataType: 'Set',
				value: Array.from(value.values()),
			};
		} else {
			return value;
		}
	}
	static reviver(key, value) {
		if (typeof value === 'object' && value !== null) {
			if (value.dataType === 'Map') {
				return new Map(value.value);
			}
			if (value.dataType === 'Set') {
				return new Set(value.value);
			}
		}
		return value;
	}
	static addBlock(instance, blockId, block) {
		instance.blocks.set(blockId, block);
		return instance;
	}
	static editBlock(instance, blockId, block) {
		if (instance.blocks.has(blockId)) {
			instance.blocks.set(blockId, block);
		}
		return instance;
	}
	static removeBlock(instance, blockId) {
		// Deleting all children
		instance.blocks.get(blockId).forEach(c => instance.blocks.delete(c));
		// Deleting the block        
		instance.blocks.delete(blockId);
		return instance;
	}
	static listBlocksByType(instance, blockType)	 {
		return Array.from(instance.blocks.values()).filter(b => b.type === blockType);
	}
	static addChildren(instance, parent, block) {
		if (parent !== null && parent !== undefined) {
			block.parent = parent.id;
			instance.blocks.set(block.id, block);
			instance.blocks.get(parent.id).children.add(block.id);
		} else {
			instance.addBlock(block.id, block);
		}
		return instance;
	}
	static removeChildren(instance, parent, block) {
		if (parent.children.has(block.id)) {
			parent.children.delete(block.id);
		}
		// this.blocks.set(parent.id, parent);
		instance.blocks.delete(block.id);
		return instance;
	}
	static moveChildren(instance, currentParent, newParent, block) {
		// Remove children from old parent
		if (currentParent.children.has(block.id)) {
			currentParent.children.delete(block.id);
		}	
		// Add children to new parent
		block.parent = newParent.id;
		instance.blocks.set(block.id, block);
		instance.blocks.get(parent.id).children.add(block.id);
		return instance;
	}
	static listChildren(instance, parent) {
		return Array.from(parent.children.values()).map(c => instance.blocks.get(c));
	}
	static countCards(instance, parent) {
		return Array.from(parent.children.values()).map(tile => instance.blocks.get(tile).children.size).reduce((acc, current) => acc + current);
	}
	static exportCanvas(instance, parent) {
		let canvas = {};
		canvas.properties = parent.properties;
		canvas.children = parent.children.map(c => instance.get(c));
		canvas.id = parent.id;
		canvas.type = parent.type;
		
		
	}
	static importCanvas(instance, parent) {

	}
	static exportAll(instance) {
		return JSON.stringify(instance, App.replacer, 2);
	}
	static importAll(serializedInstance) {
		return JSON.parse(serializedInstance, App.reviver);
	}
}