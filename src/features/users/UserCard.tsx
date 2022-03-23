import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button } from 'antd';

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
      <List.Item key={userInfo.id} onClick={toggle}>
        <List.Item.Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title={userInfo.name}
        />
      </List.Item>
      {isOpen && (
        <>
          <UserData isOpen={isOpen} userInfo={userInfo} />
          <Link to={`users/${userInfo.id}/posts`}>
            <Button>See Posts</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default UserCard;
