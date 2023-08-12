import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const VideoThumbnail = ({ video }) => {
  return (
    <Link to={`/videos/${video.videoID}`} >
      <section>
        <div className="bg-light-peach mt-6 rounded-lg shadow-xl box-border text-deep-pine">
          <img src={video.thumbnailUrl} alt={video.videoTitle} className="w-full h-32 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{video.videoTitle}</h3>
          </div>
        </div>
      </section>
    </Link>
  );
};

VideoThumbnail.propTypes = {
  video: PropTypes.shape({
    thumbnailUrl: PropTypes.string.isRequired,
    videoTitle: PropTypes.string.isRequired,
    videoID: PropTypes.string.isRequired
  }).isRequired
};

export default VideoThumbnail;
