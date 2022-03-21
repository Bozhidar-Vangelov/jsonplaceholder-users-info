import { useEffect } from 'react';
import { fetchUsers, resetUsersState } from './usersListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/configureStore';
import { List, Empty } from 'antd';
import User from './UserCard';

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, loading, userInfo } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());

    return () => {
      resetUsersState();
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
      renderItem={(user) => <User userInfo={user}></User>}
    />
  );
};

export default UsersList;
