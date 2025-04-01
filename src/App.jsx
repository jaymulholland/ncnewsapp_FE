
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../Components/Header'
import Home from './Home'
import Topics from '../Components/Topics'
import Articles from '../Components/Articles'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <Header />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/api/topics' element={<Topics/>}/>
    <Route path='/api/articles' element={<Articles/>}/>
    <Route path="/articles/:article_id" element={<Articles />} />

    </Routes>
    
     
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
       
      </div> */}
      <p className="read-the-docs">
        Made by Jay
      </p>
    </Router>
  )
}

export default App
