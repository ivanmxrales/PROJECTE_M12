import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold mb-4'>Benvingut a la pàgina principal</h1>
      <p className='text-lg mb-4'>Per poder accedir has de tenir un compte.</p>
      <Link to="/login" className='text-blue-500 hover:underline'>Login</Link> <br />
      <Link to="/sign-up" className='text-blue-500 hover:underline'>Sign Up</Link>
      </div>
  )
}
