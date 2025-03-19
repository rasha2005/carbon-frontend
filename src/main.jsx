
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CarbonProvider } from './context/carbonContextprovider'

createRoot(document.getElementById('root')).render(
 
  <CarbonProvider>
  <App />
</CarbonProvider>
 
)
