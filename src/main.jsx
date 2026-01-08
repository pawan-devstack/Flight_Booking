import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <BookingProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BookingProvider>
    </BrowserRouter>
)
