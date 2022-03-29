import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, PageHeader } from 'antd';

import { UserInfo } from './types';
import UserData from './UserData';

interface UserCardProps {
  userInfo: UserInfo;
}

const UserCard: FC<UserCardProps> = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <List.Item key={userInfo.id} onClick={toggle} className='user-list-item'>
        <List.Item.Meta
          avatar={<Avatar src={`https://joeschmoe.io/api/v1/${userInfo.id}`} />}
          title={userInfo.name}
        />
      </List.Item>
      {isOpen && (
        <>
          <PageHeader title="User's info" />
          <Button type='primary' className='user-posts-btn'>
            <Link to={`users/${userInfo.id}/posts`}>Go to user's posts</Link>
          </Button>
          <UserData isOpen={isOpen} userInfo={userInfo} />
        </>
      )}
    </>
  );
};

export default UserCard;
