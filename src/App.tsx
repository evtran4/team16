import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Notes from './Notes'
import './App.css'
import Homepage from './Homepage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <Router>
        <Routes>
          <Route path = "/" element = {<Homepage/>}></Route>
        </Routes>
    </Router>
  )
}

export default App
