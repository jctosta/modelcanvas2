import Head from 'next/head';
import { useCanvas, useDispatchCanvas } from '../components/CanvasStore';
import Layout from '../components/Layout';
import CanvasContainer from '../components/Canvas';
import CanvasTile from '../components/CanvasTile';
import CanvasItem from '../components/CanvasItem';
import type from '../components/ActionTypes';
import { Menu } from '@headlessui/react';
import { StarIcon, ShareIcon, DocumentAddIcon, FolderOpenIcon, DocumentDuplicateIcon, DocumentDownloadIcon, DotsVerticalIcon  } from '@heroicons/react/solid';

export default function Home() {

  const canvasStore = useCanvas();
  const dispatch = useDispatchCanvas();

  const handleTeste = (event) => dispatch({
    type: 'TESTE',
    payload: 'Olá Mundo API de Contexto'
  });

  const handleMoveCard = (event) => {
    const { over, active } = event;
    // dispatch({
    //   type: EDIT_CARD,
    //   payload: {
    //     cardId: over.id,
    //     body, 
    //     tileId: active.id
    //   }
    // })
    console.log(event);
  };

  const handleAddCard = (tileId, body) => {
    dispatch({
      type: type.ADD_CARD,
      payload: {
        tileId,
        body,
      }
    });
  };

  const handleNewCanvas = () => {
    dispatch({
      type: type.CREATE_CANVAS,
      payload: {
        name: 'Meu Canvas',
        template: 0,
      }
    });
  }

  if (canvasStore.canvas !== undefined) {
    return (    
      <Layout>
          <Head>
            <title>Model Canvas</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="grid grid-cols-2 gap-4 py-4">          
            <div>
              <h3 className="font-bold text-xl">{canvasStore.canvas.name}</h3>
            </div>
            <div>
              <div className="flex flex-row-reverse space-x-2">                
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-sunset-500 rounded-md focus:outline-black focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-opacity-75">Actions</Menu.Button>
                  <Menu.Items className="flex flex-col space-y-2 absolute bg-white p-4 w-56 right-0 dark:bg-gray-700 dark:text-white rounded-md shadow">
                    <Menu.Item>
                      {({active}) => (<button className={`${active && "bg-sunset-500 rounded text-white"} p-2`}>New...</button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({active}) => (<button className={`${active && "bg-sunset-500 rounded text-white"} p-2`}>Open...</button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({active}) => (<button className={`${active && "bg-sunset-500 rounded text-white"} p-2`}>Import JSON...</button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({active}) => (<button className={`${active && "bg-sunset-500 rounded text-white"} p-2`}>Export as JSON...</button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({active}) => (<button className={`${active && "bg-sunset-500 rounded text-white"} p-2`}>Export as PDF...</button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({active}) => (<button className={`${active && "bg-sunset-500 rounded text-white"} p-2`}>Export as PNG...</button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({active}) => (<button className={`${active && "bg-sunset-500 rounded text-white"} p-2`}>Details...</button>)}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>                
                <button className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                    <DocumentAddIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    <span className="hidden md:inline">Close...</span>
                </button>
                <button className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                    <FolderOpenIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    <span className="hidden md:inline">Open...</span>
                </button>
                <button className="px-2 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                    <DocumentAddIcon className="h-5 w-5 text-gray-900 dark:text-gray-100" />
                    <span className="hidden md:inline">New...</span>
                </button>                
              </div>
            </div>
          </div>
          <hr className="p-4" />
          {/* <div className="container mx-auto"></div> */}
          <CanvasContainer>
            {canvasStore.canvas.tiles.map(t => (
              <CanvasTile key={t.id} id={t.id} title={t.title} addCard={handleAddCard}>
                {t.cards.map((c, idx) => (
                  <CanvasItem key={idx} id={`${t.id}-${idx}`} parentId={t.id}>
                    {c.content}
                  </CanvasItem>
                  ))}
              </CanvasTile>            
            ))}
          </CanvasContainer>        
      </Layout>    
    )
  } else {
    return (
      <Layout>
        <h1>Canvas não encontrado.</h1>
        <button onClick={handleNewCanvas}>Criar novo canvas</button>
      </Layout>
    )
  }

}
