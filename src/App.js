import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './pages/groupChat/Chat'
import List from './pages/shopping/List'
import Calendar from './pages/Calendar/Calendar'
import Home from './pages'
import logo from './logo.png'
import { SignIn, SignOut, useAuthentication } from './services/authService'

function App() {
  const user = useAuthentication()
  return (
    <div class="static-site">
      <div class="side-nav">
        <img src={logo} alt="Crib Logo" width="200" height="200" />
        <h1>Roommates </h1>
        <ul>
          <div class="primary">
            {' '}
            <h3>{!user ? <SignIn /> : <SignOut />}</h3>{' '}
          </div>
          <div class="secondary">
            <h3>Member 2</h3>
          </div>
          <div class="secondary">
            <h3>Member 3</h3>
          </div>
          <div class="secondary">
            <h3>Member 4</h3>
          </div>
        </ul>
      </div>
      <div class="top-nav">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/list" element={<List />} />
            <Route path="/Calendar" element={<Calendar />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
