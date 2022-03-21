import { FC, useState } from 'react';
import { List, Avatar, Form, Button } from 'antd';

import { UsersInfo } from './types';
import UserData from './UserData';
import { updateUsers } from './usersListSlice';
import { useDispatch } from 'react-redux';

interface UserCardProps {
  userInfo: UsersInfo;
  allUsers: {};
}

const UserCard: FC<UserCardProps> = ({ userInfo, allUsers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(userInfo);

  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const onFinish = (values: {}) => {
    console.log('Success:', values);

    dispatch(updateUsers(userInfo.id, allUsers));

    console.log(allUsers);
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
        wrapperCol={{ span: 5 }}
        labelCol={{ span: 2 }}
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
