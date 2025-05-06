import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Register from './components/Register'
import Login from "./components/Login";
import OtpVerification from './components/OtpVerfication'
import ProtectedRoute from "./components/ProtectedRoute";
import React from 'react'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otp' element={<OtpVerification />} />
        <Route element={< ProtectedRoute />} >
        <Route path='/' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App