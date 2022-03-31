import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Card, Empty, Button } from 'antd';

import { fetchUser, resetUserState, userSelector } from './userInfoSlice';
import UserData from './UserData';
import Posts from './posts/Posts';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { error, userInfo, hasFetched } = useSelector(userSelector);

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
    <Card loading={!hasFetched} className='user-posts'>
      <UserData userInfo={userInfo} />
      <Posts />
    </Card>
  );
};

export default UserInfo;
