import { useEffect, useState } from 'react';
import { fetchUser } from '../../app/slices/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/configureStore';

const UsersList = () => {
  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.users.error);
  const loading = useSelector((state: RootState) => state.users.loading);
  const userInfo = useSelector((state: RootState) => state.users.userInfo);

  const [users, setUsers] = useState([{}]);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading) {
    return <div>{loading}</div>;
  }

  if (error) {
    console.log(error);

    return <div>Failed to fetch data</div>;
  }

  const click = () => {
    setUsers(userInfo);
    console.log(users);
  };

  return <button onClick={click}>Hello</button>;
};

export default UsersList;
