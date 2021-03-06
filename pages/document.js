import { useEffect } from 'react';
import { useRemark } from 'react-remark';
import { useRouter } from 'next/router';
import { useCanvas } from '../components/DataStore';
import App from '../lib/app';

export default function Slides() {
	
	const router = useRouter();
	const canvasStore = useCanvas();	

	const [reactContent, setMarkdownSource] = useRemark({
		remarkParseOptions: { commonmark: true },
		remarkToRehypeOptions: { commonmark: true },
	});
	
	const { id } = router.query;
	const canvas = canvasStore.blocks.get(id);	
	
	useEffect(() => {
		if (!router.isReady) return;
		setMarkdownSource(App.generateMarkdown(canvasStore, canvas));
	}, [router.isReady, setMarkdownSource, canvasStore, canvas]);

	return (
		<div className="container md:w-1/2 mx-auto p-10 bg-white m-4 shadow-md">
			<article className="prose lg:prose-xl ">
				{reactContent}
			</article>
			<iframe src="/remark.html" frameBorder="0" title="presentation"></iframe>
		</div>
	);
}