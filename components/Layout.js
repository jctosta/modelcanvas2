import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
// import Sidebar from './Sidebar';
// import SidebarMenu from './SidebarMenu';
import { MenuIcon, XIcon, InformationCircleIcon, SaveAsIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import FloatMenu from './FloatMenu';


export default function Layout({ children, canvasName, canvasTiles }) {

    // Usando react hooks para controlar a visibilidade do menu
    const [hiddenSidebar, setHiddenSidebar] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [modal, setModal] = useState(false);

    const toggleDarkMode = () => {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            setDarkMode(false);
        } else {
            document.body.classList.add("dark-mode");
            setDarkMode(true);
        }
    }

    const toggleSidebar = () => { setHiddenSidebar(!hiddenSidebar) }

    const showModal = () => { setModal(true) }

    const variants = {
        open: { display: "block", opacity: 1, x: 0 },
        close: { display: "none", opacity: 0, x: "-100%" }
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content="Model Canvas" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
                <meta name="viewport" content="width=device-width" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap" rel="stylesheet" /> 
            </Head>
            <div className="flex flex-row w-full max-h-full">
            {/* <motion.div className={`flex-grow ${hiddenSidebar ? "hidden" : "fixed z-10 md:static block"} md:flex-none w-5/6 md:w-1/6 h-screen bg-gray-900 shadow-lg`} animate={hiddenSidebar ? "open" : "closed"} variants={variants}> */}
                <motion.div className={`flex-grow fixed z-20 md:static md:flex-none w-5/6 md:w-1/6 h-screen bg-steel-800 shadow-lg`} animate={hiddenSidebar ? "open" : "close"} variants={variants}>
                    <div className="flex flex-col">
                        <div className="flex-none bg-sunset-600 shadow p-4">
                            <div className="flex flex-row">
                                <div className="flex-grow">
                                    <h1 className="text-gray-100 font-bold uppercase">ModelCanvas.app</h1>
                                </div>
                                <div className="flex-none md:hidden">
                                    <button onClick={() => toggleSidebar()}>
                                        <XIcon className="h-5 w-5 text-gray-100" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <ul className="text-white py-4">
                                <li><button className="p-2 w-full my-2">About this canvas</button></li>
                                <li><button className="p-2 w-full my-2">Export as PDF</button></li>
                                <li><button className="p-2 w-full my-2">Export as Markdown</button></li>
                                <li><button className="p-2 w-full my-2">Settings</button></li>
                            </ul>
                        </div>
                    </div>
                    
                </motion.div>
                {/* Overlay */}
                <div className={`w-full h-screen bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm fixed z-10 ${hiddenSidebar ? "block md:hidden" : "hidden"}`} onClick={() => toggleSidebar()}></div>
                {/* Main Container */}
                <div className="flex-grow self-stretch md:flex-grow h-screen">
                    <div className="flex flex-col w-full flex-1">
                        <div className="flex-none fixed w-full z-0">
                            <div className="flex flex-row items-center bg-sepia-50 dark:bg-steel-800 w-full border-b-2 border-gray-900 border-opacity-10">
                                <div className="flex-none p-4 w-1/4">
                                    <div className="flex flex-row">
                                        <button onClick={() => toggleSidebar()}>
                                            {
                                                hiddenSidebar
                                                ?
                                                <XIcon className="h-5 w-5 text-gray-400" />
                                                :
                                                <MenuIcon className="h-5 w-5 text-gray-400" />
                                            }
                                        </button>
                                        {/* <FloatMenu>
                                            <MenuIcon className="h-5 w-5 text-gray-400" />
                                        </FloatMenu> */}
                                    </div>
                                </div>
                                <div className="flex-grow w-2/4 text-center p-4">
                                    <Image src="/LogoModelCanvasApp.svg" alt="Logotipo do Aplicativo Model Canvas" width={200} height={34.65} />
                                    {/* <Image src="/LogoModelCanvasApp.svg" alt="Logotipo do Aplicativo Model Canvas" layout="fill" /> */}
                                    {/* <h2 className="p-3 font-extrabold text-base uppercase text-gray-800 truncate overflow-ellipsis">ModelCanvas</h2> */}
                                </div>
                                <div className="flex-none p-4 w-1/4">
                                    <div className="flex flex-row-reverse">
                                        <a className="px-2 flex items-center space-x-2"><SaveAsIcon className="h-5 w-5 text-gray-900" /><span className="hidden md:inline">Export</span></a>
                                    </div>
                                    {/* <input type="text" className="rounded-full border-gray-300 p-2 my-2 text-gray-800" /> */}
                                </div>
                                {/* <div className="flex-none p-2">
                                    <button className="p-2 mr-1 bg-blue-500 rounded-md text-white shadow">New Canvas...</button>
                                    <button className="p-2 mr-1 bg-blue-500 rounded-md text-white shadow">Import...</button>
                                    <button className="p-2 mr-1 bg-blue-500 rounded-md text-white shadow">Export...</button>
                                    <button className="p-2 mr-1 bg-blue-500 rounded-md text-white shadow">Options...</button>                                
                                </div> */}
                            </div>
                        </div>
                        <div className="flex-grow mt-16 p-4 overflow-auto">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flex h-screen w-full">
                <Sidebar>
                    <h1 className="text-xl p-4">ModelCanvas</h1>                        
                    { canvasTiles ? (
                        <SidebarMenu title="Canvas Navigation">                                
                            <ul className="flex flex-col space-y-4">
                                {canvasTiles.map(t => <li><a href={`#${t.id}`} className="sidebar-link">{t.title}</a></li>)}
                            </ul>
                        </SidebarMenu>
                    ) : <></> }                        
                    <SidebarMenu title="Main Menu">
                        <ul className="flex flex-col space-y-4">
                            <li className="hover:text-purple-300"><Link href="/dashboard"><a className="is-active">Dashboard</a></Link></li>
                            <li><Link href="/canvas"><a>Canvas Workspace</a></Link></li>
                            <li><Link href="/settings"><a>Settings</a></Link></li>
                        </ul>                       
                    </SidebarMenu>                        
                    <SidebarMenu title="Quick Settings">
                        <ul className="flex flex-col space-y-4">
                            <li><a onClick={() => { toggleDarkMode() }}>Dark Mode</a></li>
                        </ul>
                    </SidebarMenu>                        
                </Sidebar>                
                <div className="flex-grow bg-gray-100 dark:bg-gray-800 p-4 overflow-auto">
                    {children}
                </div>
            </div>             */}
        </>
    );
}