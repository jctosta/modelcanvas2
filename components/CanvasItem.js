import { XIcon } from '@heroicons/react/solid';

export default function CanvasItem( {children } ) {

    return (
        <div className="bg-blue-100 dark:bg-gray-900 dark:text-white rounded-md flex flex-row p-4">
            <div className="flex-grow">
                {children}
            </div>
            <div className="flex-none">
                <XIcon className="h-5 w-5 text-gray-400" />
            </div>
        </div>
    );
}