import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { useParams, Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back to posts
      </Link>
      <PostItem showActions={false} post={post} />
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.length > 0 &&
          post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              postId={post._id}
              comment={comment}
            />
          ))}
      </div>
    </Fragment>
  );
};

export default Post;
