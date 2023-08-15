import { useState, useEffect } from 'react';
import VideoThumbnail from './VideoThumbnail.jsx';
import { api } from '../config/index.js'

const Home = () => {
  const [videos, setVideos] = useState([]);
  

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(api.BASE_URL + api.GET_VIDEOS_HOME)
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