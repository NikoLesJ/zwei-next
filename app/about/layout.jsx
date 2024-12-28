import Link from 'next/link'
import React from 'react'

const Aboutlayout = ({ children }) => {
  return (
    <div>
        <h1 className='text-center text-2xl'>About us</h1>
        <ul>
            <li><Link href="/about/contacts">Contacts</Link></li>
            <li><Link href="/about/team">Team</Link></li>
        </ul>
        {children}
    </div>
  )
}

export default Aboutlayout