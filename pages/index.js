import Head from 'next/head';
import { useCanvas, useDispatchCanvas } from '../components/CanvasStore';
import Layout from '../components/Layout';
import CanvasContainer from '../components/Canvas';
import CanvasTile from '../components/CanvasTile';
import CanvasItem from '../components/CanvasItem';
import { ADD_CARD, EDIT_CARD, REMOVE_CARD, MOVE_CARD } from '../components/ActionTypes';

export default function Home() {

  const canvas = useCanvas();
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
      type: ADD_CARD,
      payload: {
        tileId,
        body,
      }
    });
  };

  return (    
    <Layout canvasName={canvas.name} canvasTiles={canvas.tiles}>
        <Head>
          <title>Model Canvas</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CanvasContainer>
          {canvas.tiles.map(t => (
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
}
