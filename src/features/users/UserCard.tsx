import { FC, useState } from 'react';
import { List, Avatar, Form, Button } from 'antd';

import { UsersInfo } from './types';
import UserData from './UserData';
import { updateUsers } from './usersListSlice';
import { useDispatch } from 'react-redux';

interface UserCardProps {
  userInfo: UsersInfo;
  allUsersInfo: UsersInfo[];
}

const UserCard: FC<UserCardProps> = ({ userInfo, allUsersInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(userInfo);

  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const onFinish = (values: {}) => {
    console.log('Success:', values);

    const updateUser = allUsersInfo.map((user) =>
      user.id !== userData.id ? user : userData
    );

    dispatch(updateUsers(userInfo.id, updateUser));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnChange = (e: any) => {
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
          <Button type='primary' htmlType='submit'>
            Save Changes
          </Button>
          <Button type='primary' danger htmlType='reset'>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UserCard;
