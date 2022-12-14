import React from 'react'
import { Nav, NavLink, NavMenu } from './NavbarElements'

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/list">List</NavLink>
          <NavLink to="/calendar">Calendar</NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar
