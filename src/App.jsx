import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx'
import VideoDetailPage from './Pages/VideoDetailPage.jsx'

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/videos/:videoID" element={<VideoDetailPage />} />
        </Routes>
      </Router>
  )
}