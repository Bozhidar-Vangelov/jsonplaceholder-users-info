import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Empty } from 'antd';

import { fetchUsers } from './usersListSlice';
import { RootState } from '../../app/store/configureStore';
import UserCard from './UserCard';

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, hasFetched, allUsersInfo } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    // do not refetch data, as the API is not saving it
    if (allUsersInfo.length) {
      return;
    }

    dispatch(fetchUsers());
  }, [dispatch]);

  if (error) {
    return <Empty description='Failed to load data' />;
  }

  return (
    <List
      dataSource={allUsersInfo}
      loading={!hasFetched}
      className='user-list'
      renderItem={(user) => <UserCard userInfo={user} />}
    />
  );
};

export default UsersList;
