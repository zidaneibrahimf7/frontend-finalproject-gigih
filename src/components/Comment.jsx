// import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Comment = ({ comment, onDeleteComment, selectedCommentId}) => {
  const handleDeleteClick = () => {
    onDeleteComment(); // Call the provided onDeleteComment function
  };

  return (
  <div className={`comment ${selectedCommentId === comment._id ? 'selected' : ''}`}>
    <div className='bg-mango rounded-lg mt-2 text-deep-pine'>
      <h1 className="px-2 font-bold pt-1 text-2xl">{comment.username}</h1>
      <p className="px-1 mx-1 pb-2 font-light text-xl">{comment.commentUser}</p>
      <p className='px-1 mx-1 pb-3 italic'>{moment(comment.timestamp).format('MMMM D, YYYY h:mm A')}</p>
      <button onClick={handleDeleteClick} className='bg-orange rounded-lg text-light-peach p-1 my-1 mb-2 mx-1 -mt-2'>
        Delete
      </button>
    </div>
  </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    commentUser: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
  }).isRequired,
   onDeleteComment: PropTypes.func.isRequired,
   selectedCommentId: PropTypes.string,
};

export default Comment;