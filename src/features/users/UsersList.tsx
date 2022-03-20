import { useEffect } from 'react';
import { fetchUsers, resetUserState } from './usersListSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/configureStore';
import { Spin } from 'antd';

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

  if (loading) {
    return (
      <div className='example'>
        <Spin />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  return (
    <div>
      {userInfo.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default UsersList;
