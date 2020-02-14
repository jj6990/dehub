import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PostContext from '../../context/post/postContext';

const PostItem = ({ post }) => {
  const postContext = useContext(PostContext);
  const { DeletePost, SetCurrent, ClearCurrent } = postContext;

  const { id, title, description, productImage } = post;

  const onDelete = () => {
    DeletePost(id);
    ClearCurrent();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {title}

        <img src={productImage} />
      </h3>
      <ul>
        {title && (
          <li>
            {' '}
            <i className='fas fa-envelope-open' />
            {description}
          </li>
        )}
      </ul>
      <button className='btn btn-dark btn-sm' onClick={() => SetCurrent(post)}>
        Edit
      </button>
      <button className='btn btn-danger btn-sm' onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItem;
