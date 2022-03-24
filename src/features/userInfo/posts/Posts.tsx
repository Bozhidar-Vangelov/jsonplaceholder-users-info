import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Empty } from 'antd';

import { RootState } from '../../../app/store/configureStore';
import { fetchPosts } from './postsSlice';
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { loading, error, allPostsInfo } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    if (allPostsInfo.length) {
      return;
    }

    dispatch(fetchPosts(userId));
  }, [dispatch]);

  if (error) {
    console.log(error);
    return <Empty description='Failed to load data'></Empty>;
  }

  return (
    <>
      {allPostsInfo.map((post) => (
        <Post key={post.id} id={post.id} body={post.body} title={post.title} />
      ))}
    </>
  );
};

export default Posts;
