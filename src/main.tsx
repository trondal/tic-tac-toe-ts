import { createRoot } from 'react-dom/client';
import { Game } from './Game';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('no root element');
}
const root = createRoot(container);
root.render(<Game />);
