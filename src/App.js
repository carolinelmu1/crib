import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Chat from './pages/groupChat/Chat'
import List from './pages/shopping/List'
import Home from './pages'

function App() {
  return (
    <div class="static-site">
      <div class="top-nav">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/list" element={<List />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
