import { Popover } from '@headlessui/react';
import { useState } from 'react';
import { ChevronRightIcon } from "@heroicons/react/solid";

export default function FloatMenu({children}) {



    return (
        <Popover className="relative">
            <Popover.Button>
                {children}
                {/* <ChevronRightIcon className="" /> */}
            </Popover.Button>

            <Popover.Panel className="fixed bg-white mt-2 p-4 rounded border-2 border-gray-900 border-opacity-10 shadow w-2/3 md:w-1/4">
                <div className="flex flex-col space-y-4">
                    <a className="p-2 hover:bg-blue-500 hover:text-white rounded" href="/"><span>Analytics</span></a>
                    <a className="p-2 hover:bg-blue-500 hover:text-white rounded" href=".">Engagement</a>
                </div>
            </Popover.Panel>
        </Popover>
    );
}