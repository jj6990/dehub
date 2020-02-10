import React, { useState, useContext, useEffect } from 'react';
import PostContext from '../../context/post/postContext';

const PostForm = props => {
  const postContext = useContext(PostContext);

  const { AddPost, UpdatePost, ClearCurrent, current } = postContext;

  useEffect(() => {
    if (current !== null) {
      setPost(current);
    } else {
      setPost({
        title: '',
        description: '',
        productImage: ''
      });
    }
  }, [postContext, current]);

  const [post, setPost] = useState({
    title: '',
    description: '',
    productImage: ''
  });

  const { title, description, productImage } = post;

  const onChange = e => setPost({ ...post, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      AddPost(post);
    } else {
      UpdatePost(post);
    }
    clearAll();
  };

  const clearAll = () => {
    ClearCurrent();
  };

  return (
    <form
      onSubmit={onSubmit}
      enctype='multipart/form-data'
      action='/profile'
      method='post'
    >
      <h2 className='text-primary'>{current ? 'Update Post' : 'Add Post'}</h2>
      <input
        type='text'
        placeholder='title'
        name='title'
        value={title}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <input
        type='file'
        name='productImage'
        value={productImage}
        onChange={onChange}
      />

      <div>
        <input
          className='btn btn-primary btn-block'
          type='submit'
          value={current ? 'Update Post' : 'Add Post'}
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-dark btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default PostForm;
