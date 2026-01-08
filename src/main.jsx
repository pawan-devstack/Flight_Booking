import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <BookingProvider>
            <App />
        </BookingProvider>
    </BrowserRouter>
)
