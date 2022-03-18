import { useEffect, useState } from 'react';
import { fetchUser, resetUserState } from '../../app/slices/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/configureStore';

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, loading, userInfo } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUser());

    return () => {
      resetUserState();
    };
  }, [dispatch]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error</div>;
  }

  return (
    <div>
      {userInfo.map((user) => (
        <div>{user.name}</div>
      ))}
    </div>
  );
};

export default UsersList;
