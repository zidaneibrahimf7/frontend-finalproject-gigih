// import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-deep-pine w-1928 h-170 shrink-0 bg-[#] p-5 '>
      <Link to="/">
        <h1 className='font-sans font-extrabold text-xl text-light-peach'>Tokopedia Play Clone</h1>
      </Link>
    </header>
  )
}

export default Header;