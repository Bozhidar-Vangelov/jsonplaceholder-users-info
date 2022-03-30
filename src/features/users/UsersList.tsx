import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Empty, Card, Space, Button } from 'antd';

import { fetchUsers, usersSelector } from './usersListSlice';
import UserCard from './UserCard';
import UserInfo from '../userInfo/UserInfo';

const UsersList = () => {
  const dispatch = useDispatch();
  const { error, hasFetched, allUsersInfo, loading } =
    useSelector(usersSelector);

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

  // if (loading) {
  //   return <div>LOADING</div>;
  // }

  return (
    <section className='user-cards-container'>
      {allUsersInfo.map((userInfo) => (
        <Card
          key={userInfo.id}
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
          <Button className='user-card-btn'>See user's info</Button>
        </Card>
      ))}
    </section>
  );

  // return (
  //   <List
  //     dataSource={allUsersInfo}
  //     loading={!hasFetched}
  //     className='user-list'
  //     renderItem={(user) => <UserCard userInfo={user} />}
  //   />
  // );
};

export default UsersList;
