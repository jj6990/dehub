import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import PostContext from '../../context/post/postContext';

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts, filtered, GetPosts, loading } = postContext;

  useEffect(() => {
    GetPosts();
    //eslint-disable-next-line
  }, []);

  if (posts.length === 0) {
    return <h4>There is no posts yet! </h4>;
  }

  return (
    <Fragment>
      {posts !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(post => (
                <CSSTransition key={post._id} timeout={500}>
                  <PostItem post={post} />
                </CSSTransition>
              ))
            : posts.map(post => (
                <CSSTransition key={post._id} timeout={500}>
                  <PostItem post={post} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Posts;
