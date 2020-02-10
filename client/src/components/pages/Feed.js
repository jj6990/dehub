import React, { useContext, useEffect } from 'react';
import Posts from '../posts/Post';
import PostForm from '../posts/PostForm';
import PostFilter from '../posts/PostFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <h1>Feed</h1>
        <PostForm />
      </div>
      <div>
        <PostFilter />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
