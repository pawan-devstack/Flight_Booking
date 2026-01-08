import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Loginpage from './pages/Authpages/Loginpage'
import Signuppage from './pages/Authpages/Signuppage'
import Customer from './pages/Customer'
import Layout from './component/Layout'
import Flights from './pages/Flights'
import Hotels from './pages/Hotels'
import Trains from './pages/Trains'
import Buses from './pages/Buses'
import Home from './pages/Home'
import ProfilePage from './pages/Authpages/Profilepage'
import FlightResults from './pages/Flightsresults'
import MyTripsPage from './pages/Authpages/MyTripsPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="flightsresults" element={<FlightResults />} />
        <Route path="flights" element={<Flights />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="trains" element={<Trains />} />
        <Route path="buses" element={<Buses />} />
        <Route path='customer' element={<Customer />} />
      </Route>
      <Route path="/login" element={<Loginpage />} />
      <Route path="/signup" element={<Signuppage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/bookings" element={<MyTripsPage />} />
    </Routes>
  )
}

export default App