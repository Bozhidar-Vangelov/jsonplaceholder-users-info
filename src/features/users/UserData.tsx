import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Space, notification } from 'antd';
import { isEqual } from 'lodash';

import { updateUsers } from './usersListSlice';
import { UserInfo } from './types';
import { updateUser } from '../userInfo/userInfoSlice';

interface UserProps {
  userInfo: UserInfo;
  isOpen: boolean;
}

const UserData: FC<UserProps> = ({ userInfo, isOpen }) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(userInfo);

  const onFinish = async (values: {}) => {
    console.log('Success:', values);

    await dispatch(updateUsers(userInfo.id, userData));
    await dispatch(updateUser(userInfo.id, userData));

    notification.success({
      message: "User's data successfully saved!",
      placement: 'bottomRight',
      className: 'notification-success',
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);

    notification.error({
      message: "Failed to save user's data!",
      placement: 'bottomRight',
      className: 'notification-error',
    });
  };

  const handleOnChange = (event: any) => {
    const name: string = event.target.name;
    const value: string = event.target.value;

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (name: string, value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      address: {
        ...prevState['address'],
        [name]: value,
      },
    }));
  };

  const handleAddressGeoChange = (name: string, value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      address: {
        ...prevState['address'],
        geo: {
          ...prevState['address']['geo'],
          [name]: value,
        },
      },
    }));
  };

  const handleCompanyChange = (name: string, value: string) => {
    const companyName = name.split('-')[1];

    setUserData((prevState) => ({
      ...prevState,
      company: {
        ...prevState['company'],
        [companyName]: value,
      },
    }));
  };

  const resetFormData = () => {
    setUserData(userInfo);
  };

  return (
    <Form
      name='user'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      hidden={!isOpen}
      className={'user-data'}
    >
      <Form.Item label='Name'>
        <Input name='name' value={userData.name} onChange={handleOnChange} />
      </Form.Item>
      <Form.Item
        label='Username'
        name='username'
        initialValue={userData.username}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input value={userData.username} onChange={handleOnChange} />
      </Form.Item>
      <Form.Item
        label='Email'
        name='email'
        initialValue={userData.email}
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input name='email' value={userData.email} onChange={handleOnChange} />
      </Form.Item>
      <Form.Item label='Lat'>
        <Input
          name='lat'
          value={userData.address.geo.lat}
          onChange={(event: any) =>
            handleAddressGeoChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item label='Lng'>
        <Input
          name='lng'
          value={userData.address.geo.lng}
          onChange={(event: any) =>
            handleAddressGeoChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item
        label='Street'
        name='street'
        initialValue={userData.address.street}
        rules={[{ required: true, message: 'Please input your street!' }]}
      >
        <Input
          name='street'
          value={userData.address.street}
          onChange={(event: any) =>
            handleAddressChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item
        label='Suite'
        name='suite'
        initialValue={userData.address.suite}
        rules={[{ required: true, message: 'Please input your suite!' }]}
      >
        <Input
          name='suite'
          value={userData.address.suite}
          onChange={(event: any) =>
            handleAddressChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item
        label='City'
        name='city'
        initialValue={userData.address.city}
        rules={[{ required: true, message: 'Please input your city!' }]}
      >
        <Input
          name='city'
          value={userData.address.city}
          onChange={(event: any) =>
            handleAddressChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item label='Zipcode'>
        <Input
          name='zipcode'
          value={userData.address.zipcode}
          onChange={(event: any) =>
            handleAddressChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item label='Phone'>
        <Input name='phone' value={userData.phone} onChange={handleOnChange} />
      </Form.Item>
      <Form.Item label='Website'>
        <Input
          name='website'
          value={userData.website}
          onChange={handleOnChange}
        />
      </Form.Item>
      <Form.Item label='Company Name'>
        <Input
          name='company-name'
          value={userData.company.name}
          onChange={(event: any) =>
            handleCompanyChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item label='Company Catch Phrase'>
        <Input
          name='company-catchPhrase'
          value={userData.company.catchPhrase}
          onChange={(event: any) =>
            handleCompanyChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item label='Company Business'>
        <Input
          name='company-bs'
          value={userData.company.bs}
          onChange={(event: any) =>
            handleCompanyChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Space className='user-data-buttons'>
        <Button
          type='primary'
          disabled={isEqual(userInfo, userData)}
          htmlType='submit'
          className='save-changes'
        >
          Save Changes
        </Button>
        <Button type='primary' danger onClick={resetFormData}>
          Reset
        </Button>
      </Space>
    </Form>
  );
};

export default UserData;
