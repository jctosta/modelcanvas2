export default class Block {
	constructor(
		id,
		type,
		properties,
		parent = undefined,
		children = new Set(),
	) {
		this.id = id;
		this.type = type;
		this.properties = properties;
		this.parent = parent;
		this.children = children;
	}
}
