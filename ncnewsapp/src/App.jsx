import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import Home from './Home'
import Topics from './Topics'
import Articles from './Articles'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/topics' element={<Topics/>}/>
    <Route path='/articles' element={<Articles/>}/>


    </Routes>
    
     
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
      </div>
      <p className="read-the-docs">
        Made by Jay
      </p>
    </Router>
  )
}

export default App
