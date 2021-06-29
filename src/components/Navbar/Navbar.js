import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">Pokemon API&nbsp;&nbsp;&nbsp;&nbsp;</Link>
      <a href="/deck">Mycatch</a>
    </div>
  )
}

export default Navbar
