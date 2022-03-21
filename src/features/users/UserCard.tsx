import { FC, useState } from 'react';
import { List, Avatar, Form, Button } from 'antd';

import { UsersInfo } from './types';
import UserData from './UserData';

interface UserProps {
  userInfo: UsersInfo;
}

const UserCard: FC<UserProps> = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
        <UserData userInfo={userInfo} />

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
