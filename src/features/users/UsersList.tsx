import { useEffect } from 'react';
import { fetchUsers, resetUsersState, updateUsers } from './usersListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/configureStore';
import { List, Empty } from 'antd';
import UserCard from './UserCard';

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, loading, allUsersInfo } = useSelector(
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
      dataSource={allUsersInfo}
      bordered
      loading={loading}
      renderItem={(user) => (
        <UserCard userInfo={user} allUsersInfo={allUsersInfo} />
      )}
    />
  );
};

export default UsersList;
