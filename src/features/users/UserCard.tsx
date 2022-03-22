import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Button } from 'antd';

import { UserInfo } from './types';
import UserData from './UserData';

interface UserCardProps {
  userInfo: UserInfo;
  allUsersInfo: UserInfo[];
}

const UserCard: FC<UserCardProps> = ({ userInfo, allUsersInfo }) => {
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
        <UserData
          isOpen={isOpen}
          userInfo={userInfo}
          allUsersInfo={allUsersInfo}
        />
        {isOpen ? (
          <Link to={`${userInfo.id}/posts`}>
            <Button>See Posts</Button>
          </Link>
        ) : (
          ''
        )}
      </List.Item>
    </>
  );
};

export default UserCard;
