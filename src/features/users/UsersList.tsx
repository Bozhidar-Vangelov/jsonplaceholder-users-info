import { useEffect, useState } from 'react';
import { fetchUsers, resetUserState } from './usersListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/configureStore';
import { List, Empty } from 'antd';
import User from './User';

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, loading, userInfo } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());

    return () => {
      resetUserState();
    };
  }, [dispatch]);

  if (error) {
    console.log(error);
    return <Empty description='Failed to load data'></Empty>;
  }

  return (
    <List
      dataSource={userInfo}
      bordered
      loading={loading}
      renderItem={(user) => <User user={user}></User>}
    />
  );
};

export default UsersList;
