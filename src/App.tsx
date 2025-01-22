import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Notes from './Notes'
import './App.css'
import Homepage from './Homepage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Transaction from './Transaction'
import SplitScreen from './SplitScreen'
import Search from './Search'
function App() {
  return (
    <Router>
        <Routes>
          <Route path = "/" element = {<Homepage/>}></Route>
          <Route path = "/Transaction" element = {<Transaction/>}></Route>
          <Route path = "/SplitScreen" element = {<SplitScreen/>}></Route>
          <Route path = "/Search" element = {<Search/>}></Route>
        </Routes>
    </Router>
  )
}

export default App
