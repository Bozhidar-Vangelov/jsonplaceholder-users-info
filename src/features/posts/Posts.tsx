import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../app/store/configureStore';
import UserCard from '../users/UserCard';
import { fetchPosts } from './postsSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { allUsersInfo } = useSelector((state: RootState) => state.users);
  const { allPostsInfo } = useSelector((state: RootState) => state.posts);

  const user = allUsersInfo[Number(userId) - 1];

  useEffect(() => {
    dispatch(fetchPosts(userId));
  }, [dispatch]);

  return <div>{<UserCard userInfo={user} allUsersInfo={allUsersInfo} />}</div>;
};

export default Posts;
