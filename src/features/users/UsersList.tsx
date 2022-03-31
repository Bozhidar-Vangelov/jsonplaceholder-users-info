import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Empty, Card, Button } from 'antd';

import { fetchUsers, usersSelector } from './usersListSlice';

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, allUsersInfo, loading } = useSelector(usersSelector);

  useEffect(() => {
    // do not refetch data, as the API is not saving it
    if (allUsersInfo.length) {
      return;
    }

    dispatch(fetchUsers());
  }, [allUsersInfo, dispatch]);

  if (error) {
    return <Empty description='Failed to load data' />;
  }

  return (
    <section className='user-cards-container'>
      {allUsersInfo.map((userInfo) => (
        <Card
          key={userInfo.id}
          loading={loading}
          cover={
            <img
              alt={userInfo.name}
              src={`https://joeschmoe.io/api/v1/${userInfo.id}`}
              className='user-card-img'
            />
          }
          className='user-card'
        >
          <Card.Meta title={userInfo.name} description={userInfo.username} />
          <Button className='user-card-btn'>
            <Link to={`users/${userInfo.id}`}>See user's info</Link>
          </Button>
        </Card>
      ))}
    </section>
  );
};

export default UsersList;
