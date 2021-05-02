import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function CanvasInputDialog({isOpen, showDialog}) {
    // const [isOpen, setIsOpen] = useState(open);

    return (
        <Transition 
            show={isOpen} 
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <Dialog static open={isOpen} onClose={() => showDialog(false)} className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    <div className="bg-white rounded max-w-sm mx-auto">
                        <Dialog.Title>Create a new card</Dialog.Title>
                        <Dialog.Description>Create a new card and add it to the page...</Dialog.Description>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A id eligendi eius sapiente pariatur distinctio doloribus sint quis consectetur doloremque maxime possimus quod optio dicta omnis quasi, placeat maiores. Rem.</p>
                        <button onClick={() => showDialog(false)}>Create</button>
                        <button onClick={() => showDialog(false)}>Cancel</button>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}