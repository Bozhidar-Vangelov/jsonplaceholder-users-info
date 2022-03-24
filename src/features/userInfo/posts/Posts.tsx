import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Empty, Spin } from 'antd';

import { RootState } from '../../../app/store/configureStore';
import { fetchPosts } from './postsSlice';
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { loading, error, allPostsInfo } = useSelector(
    (state: RootState) => state.posts
  );

  const userPosts = allPostsInfo.filter(
    (post) => post.userId === Number(userId)
  );

  useEffect(() => {
    if (userPosts.length) {
      return;
    }

    dispatch(fetchPosts());
  }, [dispatch]);

  if (error) {
    console.log(error);
    return <Empty description='Failed to load data'></Empty>;
  }

  if (loading) {
    return <Spin size='large' />;
  }

  return (
    <>
      {userPosts.map((post) => (
        <Post
          key={post.id}
          userId={post.userId}
          id={post.id}
          body={post.body}
          title={post.title}
        />
      ))}
    </>
  );
};

export default Posts;
