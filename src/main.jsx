import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <BookingProvider>
                    <App />
                </BookingProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)
