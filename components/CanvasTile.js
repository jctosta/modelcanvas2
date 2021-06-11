import PropTypes from 'prop-types';
import { useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import CanvasItem from './CanvasItem';
// import Button from './Button';
import Button from './ui/Button';
import { useTranslation } from 'next-i18next';

export default function CanvasTile( {id, title, description, cards, addCard, editCard, removeCard} ) {
    
	const [cardInput, setCardInput] = useState('');
	const [formVisible, setFormVisible] = useState(false);
	const { t } = useTranslation('common');

	const handleAddCardInline = (evt) => {
		evt.preventDefault();
		addCard(id, cardInput);
		setFormVisible(false);
	};

	return (
		<>
			<div className="card-home">
				<div className="flex-none">
					<div className="flex flex-row">
						<div className="flex-grow">
							<h3 id={id} className="text-base font-semibold uppercase">{title}</h3>
							<p className="text-sm italic py-2">{description}</p>
						</div>
						<div className="flex-none">
							<Button variant={Button.variant.TRANSPARENT} size={Button.size.ICON_ONLY} icon={DotsVerticalIcon} />
							{/* <button className="text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"><DotsVerticalIcon className="w-5 h-5" /></button> */}
						</div>
					</div>
				</div>
				<div className="flex-grow">
					<div className="grid lg:grid-cols-2 gap-4 py-4">
						{cards.map(c => (
							<CanvasItem key={c.id} id={c.id} parentId={id} content={c.properties.content} editValue={editCard} removeCard={removeCard}  />
						))}
					</div>
				</div>
				{
					formVisible
					&&
					<div className={'flex-none py-2'}>
						<div className="mt-2">
							<textarea className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" onChange={e => setCardInput(e.target.value)} value={cardInput}></textarea>
						</div>
						<div className="mt-4 flex flex-row-reverse space-x-2 space-x-reverse">
							<Button variant={Button.variant.PRIMARY} size={Button.size.SMALL} onClick={handleAddCardInline}>{t('canvas-tile-button-save')}</Button>
							<Button variant={Button.variant.SECONDARY} size={Button.size.SMALL} onClick={() => setFormVisible(false)}>{t('canvas-tile-button-cancel')}</Button>
						</div>
					</div>
				}
				<div className="flex-none">
					<div className="flex flex-row-reverse">
						{
							!formVisible
							&&
							<Button variant={Button.variant.PRIMARY} onClick={() => setFormVisible(true)}>{t('canvas-tile-button-addcard')}</Button>
						}
					</div>
				</div>
			</div>
		</>
	);
}
CanvasTile.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			content: PropTypes.string,
		})
	),
	addCard: PropTypes.func,
	editCard: PropTypes.func,
	removeCard: PropTypes.func,
};
