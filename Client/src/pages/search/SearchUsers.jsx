import React, { useState, useEffect } from 'react'
import axios from 'axios'
import api from '../../lib/axios';
import getAuthUserToken from '../../utility/getAuthUserToken';

const SearchUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      setUsers([])
      return
    }

    const delayDebounceFn = setTimeout(() => {
      api.get('/api/users/search', getAuthUserToken(), {
        params: { query: searchTerm }
      })
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching users:', error))
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <div>
      <div className='mt-10'>
        <div className="flex items-center justify-center mt-10">
          <h1 className="text-2xl font-bold mb-4">Buscar usuaris</h1>
        </div>
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            placeholder="Buscar persones..."
            className="w-96 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='flex justify-center border-2'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="w-48 h-56 border rounded flex flex-col justify-center items-center"
            >
              <img
                src={user.profile_picture}
                alt="User"
                className="w-10 h-10 object-cover border rounded-full"
              />
              <div className="flex flex-col items-center mt-2">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-500">{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchUsers


// aplicar cuando no se encuentre nada
{/* <div className='flex flex-col items-center border-2 bg-transparent w-[1000px] h-[500px]'>
        <div className='flex flex-col items-center justify-center mt-10'>
          <h2 className="text-xl font-bold mb-4">Resultats de la cerca</h2>
          <div className="flex flex-col items-center">
            <p className="text-gray-500">No s'han trobat usuaris.</p>
          </div>

        </div>
      </div> */}