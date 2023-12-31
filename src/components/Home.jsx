import { useState, useEffect } from 'react';
import VideoThumbnail from './VideoThumbnail.jsx';

const Home = () => {
  const [videos, setVideos] = useState([]);
  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/videos')
        if (!response.ok) {
          throw new Error('Network response was not ok!')
        }
        const data = await response.json();
        setVideos(data);
      }
      catch (error) {
        console.error('Error fetching videos', error)
      }
    };

    fetchVideos()
  }, []);

  return (
    <div className="p-4 grid grid-cols-5 gap-4 box-border" >
      {videos.map(video => (
        <VideoThumbnail key={video._id} video={video} />
      ))}
    </div>
  );
}

export default Home;