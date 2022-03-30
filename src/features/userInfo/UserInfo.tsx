import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Card, Button, Empty, PageHeader } from 'antd';

import { RootState } from '../../app/store/configureStore';
import { fetchUser, resetUserState } from './userInfoSlice';
import UserData from '../users/UserData';
import Posts from './posts/Posts';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { error, userInfo, hasFetched } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUser(userId));

    return () => {
      dispatch(resetUserState());
    };
  }, [dispatch, userId]);

  if (error && isEmpty(userInfo)) {
    return <Empty description='Failed to load data' />;
  }

  return (
    <Card
      loading={!hasFetched}
      cover={
        <img alt='example' src={`https://joeschmoe.io/api/v1/${userInfo.id}`} />
      }
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
