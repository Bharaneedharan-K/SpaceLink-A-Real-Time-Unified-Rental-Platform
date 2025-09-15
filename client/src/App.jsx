import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FindProperty from './pages/FindProperty'
import PropertyDetails from './pages/PropertyDetails'
import BookProperty from './pages/BookProperty'
import MyBookings from './pages/MyBookings'
import AddProperty from './pages/AddProperty'
import ManageProperties from './pages/ManageProperties'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import OwnerBookingDetails from './pages/OwnerBookingDetails'
import BookingDetails from './pages/BookingDetails'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/find-property" element={<FindProperty />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route 
                  path="/book/:propertyId" 
                  element={
                    <ProtectedRoute>
                      <BookProperty />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/my-bookings" 
                  element={
                    <ProtectedRoute>
                      <MyBookings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-property" 
                  element={
                    <ProtectedRoute>
                      <AddProperty />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/manage-properties" 
                  element={
                    <ProtectedRoute>
                      <ManageProperties />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
              <Route 
                path="/owner-booking/:bookingId" 
                element={
                  <ProtectedRoute>
                    <OwnerBookingDetails />
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/booking/:bookingId" 
                element={
                  <ProtectedRoute>
                    <BookingDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
