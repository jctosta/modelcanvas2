import PropTypes from 'prop-types';
import { XIcon, PencilIcon } from '@heroicons/react/solid';
import { useState } from 'react';
// import EditableElement from './EditableElement';

export default function CanvasItem( {id, parentId, content, editValue} ) {

	const [cardContent, setCardContent] = useState(content);
	const [editMode, setEditMode] = useState(false);

	const handleEditSave = (evt) => {
		evt.preventDefault();
		editValue(parentId, id, cardContent);
		setEditMode(false);
	};

	if (editMode) {
		return (
			<div className="bg-gray-100 dark:bg-gray-900 dark:text-white rounded-md flex flex-col p-4">
				<div className="mt-2">
					<textarea value={cardContent} className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" onChange={e => setCardContent(e.target.value)} />
				</div>
				<div className="mt-4 flex flex-row-reverse">
					<button type="button" className="flex-none rounded-md bg-sunset-500 text-white p-2 ml-2 w-24" onClick={handleEditSave}>Update</button>
					<button type="reset" className="flex-none rounded-md bg-gray-300 text-gray-900 p-2 ml-2 w-24" onClick={() => setEditMode(false)}>Cancel</button>                                
				</div>
			</div>
		);
	} else {
		return (
			<div className="bg-gray-100 dark:bg-gray-900 dark:text-white rounded-md flex flex-row p-4">
				<div className="flex-grow">
					{content}
				</div>
				<div className="flex-none">
					<div className="flex flex-row">
						<PencilIcon className="h-5 w-5 text-gray-400" onClick={() => setEditMode(true)} />
						<XIcon className="h-5 w-5 text-gray-400" />
					</div>
				</div>
			</div>
		);
	}

}
CanvasItem.propTypes = {
	id: PropTypes.string,
	parentId: PropTypes.string,
	content: PropTypes.string,
	editValue: PropTypes.func,
};
