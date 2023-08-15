import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Comment from './Comment.jsx';
import VideoThumbnail from './VideoThumbnail.jsx';
// import { api } from '../configs/index.js'

const VideoDetail = () => {
  const { videoID } = useParams();
  const [videoDetail, setVideoDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ username: '', commentUser: '' })
  const [videos, setVideos] = useState([]);
  const [selectedCommentId, setSelectedCommentId] = useState(null);


  // VideoDetail 
  useEffect(() => {
    console.log('Fetching video detail for:', videoID);
    const fetchVideoDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/${videoID}`)
        if (!response.ok) {
          throw new Error(`Network response was not OK!`)
        }

        const data = await response.json();
        console.log('Fetched video detail data:', data);
        setVideoDetail(data[0]);
      }
      catch (error) {
        console.error('error fetching video', error)
      }
    }
    fetchVideoDetail();

  }, [videoID]);

  // getCommentList
  useEffect(() => {
    console.log('Fetching comment detail for:', videoID);
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/comment/${videoID}`)
        if (!response.ok) {
          throw new Error('Network response was not OK!');
        }

        const data = await response.json();
        console.log('Fetched comment detail data:', data);
        setComments(data)
      }
      catch (error) {
        console.error('Error fetching comments', error)
      }
    }

    fetchComments();
  }, [videoID])

  // Get Video in product list
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

  //AddComment (I try to SSE (Server Side Event)... :( ))
  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3000/api/comment/submit-comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newComment.username,
          commentUser: newComment.commentUser,
          videoID: videoID,
        }),
      });

      const responseCommentData = await response.json();

      if (response.ok) {
        // Update comments list with the new comment
        setComments([...comments, responseCommentData.commentList])
        // Clear the form
        setNewComment({ username: '', commentUser: '' });
      } else {
        console.error('Error submiting comments', responseCommentData.message)
      }
    }
    catch (error) {
      console.error('Error submitting comments', error)
    }
  }

  // Delete Comment 
    const handleDeleteComment = async (commentId) => {
      try {
        const response = await fetch (`http://localhost:3000/api/comment/delete-comment/${videoID}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the deleted comment from the comments array
          setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
          setSelectedCommentId(null); // Clear the selected comment state
        } 
      }
      catch (error) {
        console.error('Error deleting comment', error)
      }
    }
  

  return (
    <div className="flex flex-col lg:flex-row overflow-visible">
      {/* List Produk Section */}
      <div className='bg-deep-pine flex-auto p-4 ml-4 mt-2 my-4 w-auto md:w-1/6 rounded-lg shadow-2xl overflow-y-auto'>
        <h3 className='font-bold justify-center text-light-peach text-2xl -mb-8'>Product List</h3>
        <div className='p-2 mt-2 shadow-2xl'>
          {videos.map(video => (
            <VideoThumbnail key={video._id} video={video} />
          ))}
        </div>
      </div>
      {/* Video Detail Product Section */}
      {videoDetail ? (
        <div className="flex-auto p-4 m-4 w-full md:w-1/2 h-[800px] bg-light-peach rounded-lg shadow-xl aspect-ratio">
          <iframe className="rounded-2xl bg-cover border-orange"
            src={videoDetail.linkProduct.replace('watch?v=', 'embed/')}
            title={videoDetail.productName}
            width="100%"
            height="100%"
            allowFullScreen
          />
          <h2 className="text-4xl font-bold mt-5 text-deep-pine">{videoDetail.productName}</h2>
          <p className="font-semibold m-1 text-2xl text-orange">Rp{videoDetail.price}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Comment Section */}
      <div className="flex-auto h-90 w-full md:w-1/6 p-4 my-4 mr-7 bg-deep-pine rounded-xl shadow-lg">
        <h3 className='pt-2 font-bold text-light-peach text-lg md:text-2xl'> All Comment!</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment 
            key={comment._id} 
            comment={comment}
            onDeleteComment={() => handleDeleteComment(comment._id)}
            selectedCommentId={selectedCommentId}
             />
          ))
        ) : (
          <p className='font-bold text-light-peach'>No Comments available</p>
        )}
        <form className="bg-light-peach rounded-lg mt-4 px-2 " onSubmit={handleSubmitComment}>
          <input
            type='text'
            name='username'
            placeholder='put your name here...'
            value={newComment.username}
            onChange={handleCommentChange}
            className='w-full p-2 mb-2 mt-3 rounded-md bg-mango placeholder:text-amber-600 text-deep-pine' />
          <textarea
            name="commentUser"
            placeholder="add your comment here..."
            value={newComment.commentUser}
            onChange={handleCommentChange}
            className="w-full p-2 rounded-md bg-mango placeholder:text-amber-600 text-deep-pine"
            rows="3" />
          <button type="submit" className="my-3 mx-2 bg-mango hover:bg-orange text-deep-pine active:bg-amber-900 p-2 rounded-lg font-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default VideoDetail;