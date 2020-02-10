import React, { useContext, useRef, useEffect } from 'react';
import PostContext from '../../context/post/postContext';

const PostFilter = () => {
  const postContext = useContext(PostContext);

  const text = useRef('');

  const { FilterPost, ClearFilter, filtered } = postContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      FilterPost(e.target.value);
    } else {
      ClearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='filtered posts..'
        onChange={onChange}
      />
    </form>
  );
};

export default PostFilter;
