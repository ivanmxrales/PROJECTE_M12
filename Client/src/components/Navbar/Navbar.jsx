import React from 'react'

const Navbar = () => {
  const stories = Array(10).fill(0);
  return (
    <div className="sticky top-0 h-24 w-full border-b z-[1000px] flex justify-center">
      <div className="overflow-x-auto whitespace-nowrap px-4 max-w-screen-md w-full">
        <div className="flex items-center gap-10">
          {stories.map((_, index) => (
            <div key={index} className="flex-shrink-0 w-20 h-20 border rounded-full bg-transparent overflow-hidden">
              <img src={'a'} alt="Story" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar
