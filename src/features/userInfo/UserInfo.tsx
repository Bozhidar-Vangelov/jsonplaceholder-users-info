import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Empty } from 'antd';

import { RootState } from '../../app/store/configureStore';
import { fetchUser } from './userInfoSlice';
import UserData from '../users/UserData';
import Posts from './posts/Posts';
import { fetchUsersState } from '../users/usersListSlice';

const UserInfo = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { loading, error, userInfo } = useSelector(
    (state: RootState) => state.user
  );
  const { allUsersInfo } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (allUsersInfo.length) {
      dispatch(fetchUsersState);
      return;
    }

    dispatch(fetchUser(userId));
  }, [dispatch]);

  if (error) {
    console.log(error);
    return <Empty description='Failed to load data'></Empty>;
  }

  return (
    <Card
      loading={loading}
      cover={
        <img
          style={{ width: 240 }}
          alt='example'
          src='https://joeschmoe.io/api/v1/random'
        />
      }
    >
      <UserData userInfo={userInfo} isOpen={true} allUsersInfo={allUsersInfo} />
      <Link to='/'>
        <Button>See all users</Button>
      </Link>
      <Posts />
    </Card>
  );
};

export default UserInfo;
