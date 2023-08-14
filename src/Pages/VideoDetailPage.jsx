import VideoDetail from '../components/VideoDetail.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx'


function VideoDetailPage() {

  return (
    <div className="flex flex-col min-h-screen bg-light-peach">
      <Header/>
      <div className="flex-grow">
        <VideoDetail />
      </div>
      <Footer />
    </div>
  )
}

export default VideoDetailPage