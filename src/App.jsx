import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Loginpage from './pages/Loginpage'
import Signuppage from './pages/Signuppage'
import Customer from './pages/Customer'
import Layout from './component/Layout'
import Flights from './pages/Flights'
import Hotels from './pages/Hotels'
import Trains from './pages/Trains'
import Buses from './pages/Buses'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Flights />} />
        <Route path="flights" element={<Flights />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="trains" element={<Trains />} />
        <Route path="buses" element={<Buses />} />
        <Route path='customer' element={<Customer />} />
      </Route>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
    </Routes>
  )
}

export default App