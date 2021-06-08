import { useState, useEffect } from 'react';
import canvasUtils from '../lib/CanvasUtils';
// import { window } from 'browser-monads';

export function useLocalStorage(key, initialValue) {

	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item, canvasUtils.reviver) : initialValue;
		} catch(error) {
			console.log(error);
			return initialValue;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore, canvasUtils.replacer));
		} catch(error) {
			console.log(error);
		}
	};

	return [storedValue, setValue];
}