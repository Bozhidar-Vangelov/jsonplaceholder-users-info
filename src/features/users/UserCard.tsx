import { FC, useState } from 'react';
import { List, Avatar, Form, Button } from 'antd';

import { UserInfo } from './types';
import UserData from './UserData';
import { updateUsers } from './usersListSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface UserCardProps {
  userInfo: UserInfo;
  allUsersInfo: UserInfo[];
}

const UserCard: FC<UserCardProps> = ({ userInfo, allUsersInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(userInfo);
  const [isChanged, setIsChanged] = useState(false);

  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const onFinish = (values: {}) => {
    console.log('Success:', values);

    const updatedUser = allUsersInfo.map((user) =>
      user.id !== userData.id ? user : userData
    );

    dispatch(updateUsers(userInfo.id, updatedUser));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnChange = (e: any) => {
    setIsChanged(true);

    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <List.Item key={userInfo.id} onClick={toggle}>
        <List.Item.Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title={userInfo.name}
        />
      </List.Item>
      <Form
        name='user'
        wrapperCol={{ span: 6 }}
        labelCol={{ span: 3 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className={isOpen ? '' : 'hidden'}
      >
        <UserData onChange={handleOnChange} userInfo={userInfo} />

        <Form.Item wrapperCol={{ offset: 2 }}>
          <Button
            disabled={isChanged ? false : true}
            type='primary'
            htmlType='submit'
          >
            Save Changes
          </Button>
          <Button
            onClick={() => setIsChanged(false)}
            type='primary'
            danger
            htmlType='reset'
          >
            Reset
          </Button>
          <Link to={`posts/${userInfo.id}`}>
            <Button>Go to users' posts</Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserCard;
