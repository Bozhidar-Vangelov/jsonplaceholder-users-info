import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Empty } from 'antd';

import { fetchUsers, fetchUsersState } from './usersListSlice';
import { RootState } from '../../app/store/configureStore';
import UserCard from './UserCard';

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, loading, allUsersInfo } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (allUsersInfo.length) {
      dispatch(fetchUsersState);
      return;
    }

    dispatch(fetchUsers());
  }, [dispatch, allUsersInfo]);

  if (error) {
    console.log(error);
    return <Empty description='Failed to load data' />;
  }

  return (
    <List
      dataSource={allUsersInfo}
      className='user-list'
      loading={loading}
      renderItem={(user) => <UserCard userInfo={user} />}
    />
  );
};

export default UsersList;
