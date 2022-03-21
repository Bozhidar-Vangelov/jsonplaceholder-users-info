import { useState } from 'react';

import { List, Avatar, Input, Form, Button, Checkbox } from 'antd';

const User: any = ({ user }: any) => {
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
      <List.Item key={user.id} onClick={toggle}>
        <List.Item.Meta
          avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
          title={user.name}
        />
      </List.Item>
      <Form
        name='basic'
        wrapperCol={{ span: 5 }}
        labelCol={{ span: 2 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
        className={isOpen ? '' : 'hidden'}
        id={user.id}
      >
        <Form.Item
          label='Name'
          name='name'
          initialValue={user.name}
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input id={`name-${user.id}`} />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input id={`password-${user.id}`} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default User;
