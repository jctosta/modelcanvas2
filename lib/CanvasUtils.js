export default {
	generateID: () => '_' + Math.random().toString(36).substr(2, 9),
	replacer: (key, value) => {
		if (value instanceof Map) {
			return {
				dataType: 'Map',
				value: Array.from(value.entries()),
			};
		} else {
			return value;
		}
	},
	reviver: (key, value) => {
		if (typeof value === 'object' && value !== null) {
			if (value.dataType === 'Map') {
				return new Map(value.value);
			}
		}
		return value;
	}
};