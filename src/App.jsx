import { Routes, Route } from 'react-router-dom'
import Layout from './component/Layout'
import Home from './pages/Home'
import Flights from './pages/Flights'
import Trains from './pages/Trains'
import Hotels from './pages/Hotels'
import Buses from './pages/Buses'
import Customer from './pages/Customer'

import Loginpage from './pages/Authpages/Loginpage'
import Signuppage from './pages/Authpages/Signuppage'
import ProfilePage from './pages/Authpages/Profilepage'
import FlightResults from './pages/Authpages/Flightsresults'
import MyTripsPage from './pages/Authpages/MyTripsPage'

import ProtectedRoute from './component/Protectedroute'

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

      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
      />
      <Route path="/bookings" element={
        <ProtectedRoute>
          <MyTripsPage />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App