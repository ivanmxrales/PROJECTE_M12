import React from 'react'

const Navbar = () => {
  const stories = Array(6).fill(0);
  return (
    <div className="sticky top-0 h-20 w-full max-w-screen-md mx-auto border z-50">
      <div className='flex items-center justify-center gap-10'>
        {stories.map((_, index) => (
          <div key={index} className='w-20 h-20 border rounded-full bg-transparent'>
            <img src={'a'} alt="Story" className='text-center' />
            {/* falta hacer el borde de color si no has visto el story todavía */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Navbar