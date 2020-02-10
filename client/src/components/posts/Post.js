import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';
import PostContext from '../../context/post/postContext';

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts, filtered } = postContext;

  if (posts.length === 0) {
    return <h4>There is no posts yet! </h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(post => (
              <CSSTransition key={post.id} timeout={500}>
                <PostItem post={post} />
              </CSSTransition>
            ))
          : posts.map(post => (
              <CSSTransition key={post.id} timeout={500}>
                <PostItem post={post} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Posts;
