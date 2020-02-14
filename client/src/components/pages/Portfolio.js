import React, { useContext, useEffect } from 'react';
import Posts from '../posts/Post';
import AuthContext from '../../context/auth/authContext';

const Portfolio = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className='grid-1'>
      <div>
        <h1>Portfolio</h1>
        <Posts />
      </div>
    </div>
  );
};

export default Portfolio;
