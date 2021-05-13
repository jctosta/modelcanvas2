import Head from "next/head";
import Layout from "../components/Layout";
import { useState } from 'react';

export default function Create() {

    const [canvas, setCanvas] = useState({});
    const [canvasName, setCanvasName] = useState("");
    const [canvasDescription, setCanvasDescription] = useState("");
    const [sectionName, setSectionName] = useState("");
    const [sectionDescription, setSectionDescription] = useState("");
    const [canvasTiles, setCanvasTiles] = useState([]);
    
    const handleSectionAdd = e => {
        e.preventDefault();
        canvasTiles.push({
            title: sectionName,
            description: sectionDescription,
            cards: []
        });
        setSectionName("");
        setSectionDescription("");
    }

    const handleCanvasGenerate = e => {
        e.preventDefault();
        let canvasClone = {...canvas};
        canvasClone.title = canvasName;
        canvasClone.description = canvasDescription;
        canvasClone.tiles = canvasTiles;
        setCanvas(canvasClone);
    }

    return (
        <Layout>
            <Head>
                <title>Canvas Maker</title>
            </Head>
            <div className="container mx-auto">
                <h1>Create a new canvas type</h1>

                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <label htmlFor="canvasName">Name: </label>
                        <input type="text" name="canvasName" value={canvasName} onChange={e => setCanvasName(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="canvasDescription">Description:</label>
                        <textarea name="canvasDescription" value={canvasDescription} onChange={e => setCanvasDescription(e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                        <h3>Canvas Sections</h3>
                        <div className="flex flex-col p-4">
                            <div className="flex flex-col">
                                <label htmlFor="sectionName">Name</label>
                                <input type="text" name="sectionName" value={sectionName} onChange={e => setSectionName(e.target.value)}/>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="sectionDescription">Description</label>
                                <textarea name="sectionDescription" value={sectionDescription} onChange={e => setSectionDescription(e.target.value)}></textarea>
                            </div>
                            <div className="flex flex-col">
                                <button onClick={handleSectionAdd}>Add Section</button>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleCanvasGenerate}>Generate Canvas</button>
                    <div className="flex flex-col">
                        <pre><code>{JSON.stringify(canvas, null, 2)}</code></pre>
                    </div>
                </div>
            </div>
        </Layout>
    );
}