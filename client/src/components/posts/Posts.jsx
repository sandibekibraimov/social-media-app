import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  console.log(posts);
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome to the community
      </p>

      <PostForm />

      {posts.length > 0 &&
        posts.map((post) => (
          <PostItem key={post._id} post={post} showActions={true} />
        ))}
    </Fragment>
  );
};

export default Posts;
