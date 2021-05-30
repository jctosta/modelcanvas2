import PropTypes from 'prop-types';
import { useState } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/solid';
import CanvasItem from './CanvasItem';
import Button from './Button';

export default function CanvasTile( {id, title, cards, addCard, editCard} ) {
    
	const [cardInput, setCardInput] = useState('');
	const [formVisible, setFormVisible] = useState(false);

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
						</div>
						<div className="flex-none">				
							<button className="text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"><DotsVerticalIcon className="w-5 h-5" /></button>
						</div>
					</div>
				</div>
				<div className="flex-grow">
					<div className="grid lg:grid-cols-2 gap-4 py-4">
						{cards.map(c => (
							<CanvasItem key={c.id} id={c.id} parentId={id} content={c.content} editValue={editCard} />
						))}
						{/* {children} */}
					</div>
				</div>
				<div className={`flex-none py-2 ${!formVisible && 'hidden'}`}>
					<div className="mt-2">
						<textarea className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" onChange={e => setCardInput(e.target.value)} value={cardInput}></textarea>
						{/* <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A id eligendi eius sapiente pariatur distinctio doloribus sint quis consectetur doloremque maxime possimus quod optio dicta omnis quasi, placeat maiores. Rem.</p> */}
					</div>
					<div className="mt-4 flex flex-row-reverse space-x-2 space-x-reverse">
						<Button category="primary" type="button" size="sm" onClick={handleAddCardInline}>Save</Button>
						<Button category="secondary" type="button" size="sm" onClick={() => setFormVisible(false)}>Cancel</Button>
						{/* <button type="button" className="flex-none rounded-md bg-blue-500 text-white p-2 ml-2 w-24" onClick={handleAddCardInline}>Save</button>
						<button type="reset" className="flex-none rounded-md bg-gray-300 text-gray-900 p-2 ml-2 w-24" onClick={() => setFormVisible(false)}>Cancel</button>                                 */}
					</div>
				</div>
				<div className="flex-none">
					<div className="flex flex-row-reverse">
						<button className="flex-none rounded-md bg-sunset-500 text-white p-2 ml-2 w-24" onClick={() => setFormVisible(true)}>Add Card</button>
					</div>
				</div>
			</div>
		</>
	);
}
CanvasTile.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			content: PropTypes.string,
		})
	),
	addCard: PropTypes.func,
	editCard: PropTypes.func,
};
