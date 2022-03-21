import { FC } from 'react';
import { Form, Input } from 'antd';

import { UsersInfo } from './types';

interface UserProps {
  userInfo: UsersInfo;
}

const UserData: FC<UserProps> = ({ userInfo }) => {
  return (
    <>
      <Form.Item label='Name' name='name' initialValue={userInfo.name}>
        <Input id={`name-${userInfo.id}`} name='name' />
      </Form.Item>
      <Form.Item
        label='Username'
        name='username'
        initialValue={userInfo.username}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input id={`username-${userInfo.id}`} name='username' />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        initialValue={userInfo.email}
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input id={`email-${userInfo.id}`} name='email' />
      </Form.Item>
      <Form.Item label='Lat' name='lat' initialValue={userInfo.address.geo.lat}>
        <Input id={`lat-${userInfo.id}`} name='lat' />
      </Form.Item>
      <Form.Item label='Lng' name='lng' initialValue={userInfo.address.geo.lng}>
        <Input id={`lng-${userInfo.id}`} name='lng' />
      </Form.Item>
      <Form.Item
        label='Street'
        name='street'
        initialValue={userInfo.address.street}
        rules={[{ required: true, message: 'Please input your street!' }]}
      >
        <Input id={`street-${userInfo.id}`} name='street' />
      </Form.Item>
      <Form.Item
        label='Suite'
        name='suite'
        initialValue={userInfo.address.suite}
        rules={[{ required: true, message: 'Please input your suite!' }]}
      >
        <Input id={`suite-${userInfo.id}`} name='suite' />
      </Form.Item>
      <Form.Item
        label='City'
        name='city'
        initialValue={userInfo.address.city}
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <Input id={`city-${userInfo.id}`} name='city' />
      </Form.Item>
      <Form.Item
        label='Zipcode'
        name='zipcode'
        initialValue={userInfo.address.zipcode}
      >
        <Input id={`zipcode-${userInfo.id}`} name='zipcode' />
      </Form.Item>
      <Form.Item label='Phone' name='phone' initialValue={userInfo.phone}>
        <Input id={`phone-${userInfo.id}`} name='phone' />
      </Form.Item>
      <Form.Item label='Website' name='website' initialValue={userInfo.website}>
        <Input id={`website-${userInfo.id}`} name='website' />
      </Form.Item>
      <Form.Item
        label='Company Name'
        name='company-name'
        initialValue={userInfo.company.name}
      >
        <Input id={`company-name-${userInfo.id}`} name='company-name' />
      </Form.Item>
      <Form.Item
        label='Company Business'
        name='company-business'
        initialValue={userInfo.company.bs}
      >
        <Input id={`company-business-${userInfo.id}`} name='company-business' />
      </Form.Item>
    </>
  );
};

export default UserData;
