import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Empty } from 'antd';

import { RootState } from '../../app/store/configureStore';
import { fetchPosts } from './postsSlice';
import UserData from '../users/UserData';
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { loading, error, allUsersInfo } = useSelector(
    (state: RootState) => state.users
  );
  const { allPostsInfo } = useSelector((state: RootState) => state.posts);

  const user = allUsersInfo[Number(userId) - 1];

  useEffect(() => {
    dispatch(fetchPosts(userId));
  }, [dispatch]);

  if (error) {
    console.log(error);
    return <Empty description='Failed to load data'></Empty>;
  }

  return (
    <Card
      loading={loading}
      cover={
        <img
          style={{ width: 240 }}
          alt='example'
          src='https://joeschmoe.io/api/v1/random'
        />
      }
    >
      <Card.Meta title={user.name} />
      <UserData userInfo={user} isOpen={true} allUsersInfo={allUsersInfo} />
      {allPostsInfo.map((post) => (
        <Post key={post.id} id={post.id} body={post.body} title={post.title} />
      ))}
      <Link to='/'>
        <Button>See all users</Button>
      </Link>
    </Card>
  );
};

export default Posts;
