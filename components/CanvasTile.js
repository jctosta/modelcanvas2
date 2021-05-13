// import CanvasInputDialog from './CanvasInputDialog';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/solid';

export default function CanvasTile( {children, id, title, addCard} ) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [cardInput, setCardInput] = useState("");
    
    const handleAddCard = (evt) => {
        
        evt.preventDefault();
                
        addCard(id, cardInput);
        
        setIsOpen(false);

    };

    return (
        <>
            {/* <CanvasInputDialog open={isOpen} showDialog={((state) => setIsOpen(state)).bind} /> */}
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
                        {children}
                    </div>
                </div>
                <div className="flex-none">
                    <div className="flex flex-row-reverse">
                        <button className="flex-none rounded-md bg-blue-500 text-white p-2 ml-2 w-24" onClick={() => setIsOpen(true)}>Add Card</button>
                    </div>
                </div>
            </div>
            <Transition 
                show={isOpen} 
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                className="fixed"
            >
                <Dialog static open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                    <div className="flex items-center justify-center min-h-screen m-4">
                        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-md rounded-md">
                            <Dialog.Title as="h3" className="text-lg font-bold uppercase leading-6 text-gray-900">Create a new card</Dialog.Title>
                            <Dialog.Description className="font-light text-gray-700">Create a new card and add it to the page...</Dialog.Description>
                            <div className="mt-2">
                                <textarea className="rounded-md rounded-r-node flex-grow border-gray-300 p-3 w-full" onChange={e => setCardInput(e.target.value)} value={cardInput}></textarea>
                                {/* <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A id eligendi eius sapiente pariatur distinctio doloribus sint quis consectetur doloremque maxime possimus quod optio dicta omnis quasi, placeat maiores. Rem.</p> */}
                            </div>
                            <div className="mt-4 flex flex-row-reverse">
                                <button type="button" className="flex-none rounded-md bg-blue-500 text-white p-2 ml-2 w-24" onClick={handleAddCard}>Save</button>
                                <button type="reset" className="flex-none rounded-md bg-gray-300 text-gray-900 p-2 ml-2 w-24" onClick={() => setIsOpen(false)}>Cancel</button>                                
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}