import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function ConfirmDialog({open}) {

	let [isOpen, setIsOpen] = useState(open);

	return (
		<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
			<Dialog.Overlay />

			<Dialog.Title>Confirm your Operation</Dialog.Title>
			<Dialog.Description>
				This action will permanently delete all data in the local storage
			</Dialog.Description>
			<p>
				Are you sure you want to delete all data? All of your data will be permanently removed. This action cannot be undone.
			</p>
			<button onClick={() => setIsOpen(false)}>Delete</button>
			<button onClick={() => setIsOpen(false)}>Cancel</button>
		</Dialog>
	);

}