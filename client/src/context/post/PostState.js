import React, { useReducer } from 'react';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  GET_POST,
  CLEAR_POST,
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_POST,
  FILTER_POSTS,
  CLEAR_FILTER,
  POST_ERROR
} from '../types';

const PostState = props => {
  const initialState = {
    posts: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  //GETPOST
  const GetPosts = async () => {
    try {
      const res = await axios.post('/api/feed');
      console.log(res.post);
      dispatch({ type: GET_POST, payload: res.post });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      });
    }
  };
  //add post

  const AddPost = async post => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/feed', post, config);
      console.log(res.post);
      dispatch({ type: ADD_POST, payload: res.post });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg
      });
    }
  };

  //delete post
  const DeletePost = id => {
    dispatch({ type: DELETE_POST, payload: id });
  };

  //set current
  const SetCurrent = post => {
    dispatch({ type: SET_CURRENT, payload: post });
  };
  //clear current
  const ClearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //update post
  const UpdatePost = post => {
    dispatch({ type: UPDATE_POST, payload: post });
  };
  //filter post
  const FilterPost = text => {
    dispatch({ type: FILTER_POSTS, payload: text });
  };
  //clear current
  const ClearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        AddPost,
        GetPosts,
        DeletePost,
        SetCurrent,
        ClearCurrent,
        UpdatePost,
        FilterPost,
        ClearFilter
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
