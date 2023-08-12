// import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const Comment = ({ comment }) => {
  return (
    <div className='bg-mango rounded-lg mt-2 text-deep-pine'>
      <h1 className="px-2 font-bold pt-1 text-2xl">{comment.username}</h1>
      <p className="px-1 mx-1 pb-2 font-light text-xl">{comment.commentUser}</p>
      <p className='px-1 mx-1 pb-3 italic'>{moment(comment.timestamp).format('MMMM D, YYYY h:mm A')}</p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    username: PropTypes.string.isRequired,
    commentUser: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
  }).isRequired,
}

export default Comment;