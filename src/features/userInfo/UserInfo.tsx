import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Empty, PageHeader } from 'antd';

import { RootState } from '../../app/store/configureStore';
import { fetchUser, resetUserState } from './userInfoSlice';
import UserData from '../users/UserData';
import Posts from './posts/Posts';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { loading, error, userInfo } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser(userId));

    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch, userId]);

  if (error) {
    console.log(error);
    return <Empty description='Failed to load data' />;
  }

  return (
    <Card
      loading={loading}
      cover={<img alt='example' src='https://joeschmoe.io/api/v1/random' />}
      className='user-posts'
    >
      <Button type='primary' className='user-posts-btn'>
        <Link to='/'>Go back to all users</Link>
      </Button>
      <PageHeader title="User's info" />
      <UserData userInfo={userInfo} isOpen={true} />
      <PageHeader title="User's posts" />
      <Posts />
    </Card>
  );
};

export default UserInfo;
