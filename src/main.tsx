import { createRoot } from 'react-dom/client'
import './index.css'
import { Game } from './Game'

const container = document.getElementById('root')
if (!container) {
  throw new Error('no root element')
}
const root = createRoot(container)
root.render(<Game />)
