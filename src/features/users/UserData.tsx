import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { updateUsers } from './usersListSlice';
import { UserInfo } from './types';
import { updateUser } from '../userInfo/userInfoSlice';

interface UserProps {
  userInfo: UserInfo;
  isOpen: boolean;
  allUsersInfo: UserInfo[];
}

const UserData: FC<UserProps> = ({ userInfo, isOpen, allUsersInfo }) => {
  const [userData, setUserData] = useState(userInfo);
  const [isChanged, setIsChanged] = useState(false);

  const dispatch = useDispatch();

  const onFinish = (values: {}) => {
    console.log('Success:', values);

    const updatedUser = allUsersInfo.map((user) =>
      user.id !== userData.id ? user : userData
    );

    dispatch(updateUsers(userInfo.id, updatedUser));
    dispatch(updateUser(userInfo.id, userData));
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
      <Form.Item label='Name' name='name' initialValue={userInfo.name}>
        <Input
          id={`name-${userInfo.id}`}
          name='name'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item
        label='Username'
        name='username'
        initialValue={userInfo.username}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          id={`username-${userInfo.id}`}
          name='username'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        initialValue={userInfo.email}
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input
          id={`email-${userInfo.id}`}
          name='email'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item label='Lat' name='lat' initialValue={userInfo.address.geo.lat}>
        <Input id={`lat-${userInfo.id}`} name='lat' onChange={handleOnChange} />
      </Form.Item>
      <Form.Item label='Lng' name='lng' initialValue={userInfo.address.geo.lng}>
        <Input id={`lng-${userInfo.id}`} name='lng' onChange={handleOnChange} />
      </Form.Item>
      <Form.Item
        label='Street'
        name='street'
        initialValue={userInfo.address.street}
        rules={[{ required: true, message: 'Please input your street!' }]}
      >
        <Input
          id={`street-${userInfo.id}`}
          name='street'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item
        label='Suite'
        name='suite'
        initialValue={userInfo.address.suite}
        rules={[{ required: true, message: 'Please input your suite!' }]}
      >
        <Input
          id={`suite-${userInfo.id}`}
          name='suite'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item
        label='City'
        name='city'
        initialValue={userInfo.address.city}
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <Input
          id={`city-${userInfo.id}`}
          name='city'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item
        label='Zipcode'
        name='zipcode'
        initialValue={userInfo.address.zipcode}
      >
        <Input
          id={`zipcode-${userInfo.id}`}
          name='zipcode'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item label='Phone' name='phone' initialValue={userInfo.phone}>
        <Input
          id={`phone-${userInfo.id}`}
          name='phone'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item label='Website' name='website' initialValue={userInfo.website}>
        <Input
          id={`website-${userInfo.id}`}
          name='website'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item
        label='Company Name'
        name='company-name'
        initialValue={userInfo.company.name}
      >
        <Input
          id={`company-name-${userInfo.id}`}
          name='company-name'
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item
        label='Company Business'
        name='company-business'
        initialValue={userInfo.company.bs}
      >
        <Input
          id={`company-business-${userInfo.id}`}
          name='company-business'
          onChange={handleOnChange}
        />
      </Form.Item>
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
      </Form.Item>
    </Form>
  );
};

export default UserData;
