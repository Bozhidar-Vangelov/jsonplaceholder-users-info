import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Card, Empty, Button } from 'antd';

import { fetchUser, resetUserState, userSelector } from './userInfoSlice';
import { postsSelector, togglePosts } from './posts/postsSlice';
import UserData from './UserData';
import Posts from './posts/Posts';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { error, userInfo, hasFetched } = useSelector(userSelector);
  const { showPosts } = useSelector(postsSelector);

  useEffect(() => {
    dispatch(fetchUser(userId));

    return () => {
      dispatch(resetUserState());
      dispatch(togglePosts(false));
    };
  }, [dispatch, userId]);

  if (error && isEmpty(userInfo)) {
    return <Empty description='Failed to load data' />;
  }

  return (
    <Card loading={!hasFetched} className='user-posts'>
      <UserData userInfo={userInfo} />
      {showPosts ? <Posts /> : <></>}
    </Card>
  );
};

export default UserInfo;
