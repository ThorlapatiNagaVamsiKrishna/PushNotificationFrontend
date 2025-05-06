import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookie from 'js-cookie'

const OtpVerification = () => {
    const [user , setUser] = useState(null)
    const [ otp , setOtp ] = useState('')
    const navigate = useNavigate()
    
    const handleOTP = (e) => {
        setOtp(e.target.value)
    }

useEffect(() => {
    const getUser = Cookie.get('user');
    if (getUser) {
        setUser(JSON.parse(getUser))
    }
},[])

const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
        const payload = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({user: user.userId, otp})
        }
        const response = await fetch('https://pushnotificationbackend-2.onrender.com/user/otp', payload)
        const data = await response.json()
        if(response.status === 200 ) {
            Cookie.set('jwtToken', data.token)
            navigate('/')
        }
    } catch(e) {
        console.log(e.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>

        <p className="text-gray-600 text-sm text-center mb-4">
          Please enter the OTP sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={otp}
            onChange={handleOTP}
            placeholder="Enter OTP"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            maxLength="6"
          />
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
