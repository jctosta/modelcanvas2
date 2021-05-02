// import '../styles/app.scss';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';

import { CanvasProvider } from '../components/CanvasStore';

export function getStaticProps(props) {
  
}


function MyApp({ Component, pageProps }) {
  return (
    <CanvasProvider>
      <Component {...pageProps} />      
    </CanvasProvider>
  );
}

export default MyApp
