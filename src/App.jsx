
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '../Components/Header'
import Home from './Home'
import Topics from '../Components/Topics'
import Articles from '../Components/Articles'
import './App.css'

import { PostComment } from '../Components/ArticlesCard'

function App() {


  return (
    <Router>
      <Header />
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/api/Topics/' element={<Topics/>}/>
    <Route path="/topics/:topic_slug/articles" element={<Articles />} />
    <Route path='/api/articles' element={<Articles/>}/>
    <Route path="/articles/:article_id" element={<Articles />} />
    <Route path="/articles/:article_id/comments" element={<PostComment />} />
    </Routes>
    
      <p className="read-the-docs">
        Made by Jay
      </p>
    </Router>
  )
}

export default App
