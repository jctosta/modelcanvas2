import PropTypes from 'prop-types';
import { XIcon, PencilIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Button from '../components/ui/Button';
import { useTranslation } from 'next-i18next';
// import EditableElement from './EditableElement';

export default function CanvasItem( {id, parentId, content, editValue, removeCard} ) {

	const [cardContent, setCardContent] = useState(content);
	const [editMode, setEditMode] = useState(false);
	const { t } = useTranslation('common');

	const handleEditSave = (evt) => {
		evt.preventDefault();
		editValue(parentId, id, cardContent);
		setEditMode(false);
	};

	const handleRemoveCard = (evt) => {
		evt.preventDefault();
		removeCard(id);
	};

	if (editMode) {
		return (
			<div className="bg-gray-100 dark:bg-gray-900 dark:text-white rounded-md flex flex-col p-4">
				<div className="mt-2">
					<textarea value={cardContent} className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" onChange={e => setCardContent(e.target.value)} />
				</div>
				<div className="mt-4 flex flex-row-reverse">
					<Button size={Button.size.SMALL} variant={Button.variant.PRIMARY} onClick={handleEditSave}>{t('canvas-item-button-update')}</Button>
					<Button size={Button.size.SMALL} variant={Button.variant.SECONDARY} onClick={() => setEditMode(false)}>{t('canvas-item-button-cancel')}</Button>
				</div>
			</div>
		);
	} else {
		return (
			<div className="bg-gray-100 dark:bg-gray-900 dark:text-white rounded-md flex flex-row p-4 hover-effect hover:bg-gray-200">
				<div className="flex-grow">
					{content}
				</div>
				<div className="flex-none">
					<div className="flex flex-row">
						<Button size={Button.size.ICON_ONLY} variant={Button.variant.TRANSPARENT} icon={PencilIcon} onClick={() => setEditMode(true)} />
						<Button size={Button.size.ICON_ONLY} variant={Button.variant.TRANSPARENT} icon={XIcon} onClick={handleRemoveCard} />
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
	removeCard: PropTypes.func,
};
