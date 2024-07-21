import React from 'react'

function Navbar() {
  return (
    <div className='flex text-white bg-slate-800 max-w-screen-2xl max-h-xl justify-between py-2'>
      <div className="logo  mx-9 font-bold text-xl">
        <span>iTodo</span>
      </div>
      <ul className="flex mx-9 gap-6 cursor-pointer transition-all text-lg">
        <li className="text  hover:text-purple-200">Home</li>
        <li className="text hover:text-purple-200">Your tasks</li>
      </ul>
    </div>
  )
}

export default Navbar