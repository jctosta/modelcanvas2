import Head from 'next/head';
import Link from 'next/link';
import { useCanvas } from '../components/CanvasStore';

export default function Index() {
	
	const canvasStore = useCanvas();

	return (
		<>
			<Head>
				<title>Model Canvas</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="container max-w-5xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="p-4 text-center md:text-left text-gray-900 dark:text-gray-100">
						<h1 className="text-5xl font-bold py-4">A better view for your business</h1>
						<p className="text-xl font-normal py-4">A business canvas application, recommended for all types of needs.</p>
						<div className="py-4">
							<Link href="/canvas"><a className="bg-sunset-500 p-3 rounded-md text-white hover:bg-sunset-700">Getting Started...</a></Link>
						</div>
					</div>
					<div className="flex align-middle justify-center md:justify-end">
						<img 
							src="/Startup_Flatline.svg" 
							alt="Startup Flatline" 
							width="406px"
							height="306px"                            
						/>
					</div>
				</div>
			</div>
			{
				canvasStore.canvas 
				&& 
				<>
					<h2>Active Canvas</h2>
					<h4>{canvasStore.canvas.name}</h4>
					<h6>{canvasStore.canvas.title}</h6>

					<h2>Starred Canvases</h2>
					<ul>
						{
							canvasStore.starred.forEach(s => <li>{s.name - s.title}</li>)
						}
					</ul>

					<h2>Archived Canvases</h2>
					<ul>
						{
							canvasStore.archived.forEach(a => <li>{a.name - a.title}</li>)
						}
					</ul>
				</>
			}
			<div className="container max-w-5xl mx-auto text-gray-900 dark:text-gray-100">
				<hr className="p-4" />
				<h2 className="text-3xl p-4 font-bold">A canvas that fit your needs...</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
					<div className="card-home">
						<h3 className="text-lg font-semibold">Business Model Canvas</h3>
						<p className="text-base italic">Plan your business and focus on what matters.</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">Lean Canvas</h3>
						<p className="text-base italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">Media Canvas</h3>
						<p className="text-base italic">Starting a new youtube channel, maybe a podcast, plan ahead and discover the problems that you may face along the road.</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">SWOT Canvas</h3>
						<p className="text-base italic">Review the strenghts, weakness, opportunities and threats of your business or product.</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">Product Canvas</h3>
						<p className="text-base italic">Get a better view of your product, identifying your value proposition and opportunities.</p>
					</div>
					<div className="card-home">
						<h3 className="text-lg font-semibold">Your Canvas</h3>
						<p className="text-base italic">Can&apos;t find a canvas that fit your needs, create your own here.</p>
					</div>
				</div>
			</div>
		</>
	);
}