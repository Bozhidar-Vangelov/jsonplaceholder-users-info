import { FC, FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { updateUsers } from './usersListSlice';
import { UserInfo } from './types';
import { updateUser } from '../userInfo/userInfoSlice';

interface UserProps {
  userInfo: UserInfo;
  isOpen: boolean;
}

const UserData: FC<UserProps> = ({ userInfo, isOpen }) => {
  const [userData, setUserData] = useState(userInfo);
  const [isChanged, setIsChanged] = useState(false);

  const dispatch = useDispatch();

  const onFinish = (values: {}) => {
    console.log('Success:', values);

    dispatch(updateUsers(userInfo.id, userData));
    dispatch(updateUser(userInfo.id, userData));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleOnChange = (event: any) => {
    let name: string = event.target.name;
    let value: string = event.target.value;
    setIsChanged(true);

    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (name: string, value: string) => {
    setIsChanged(true);

    setUserData((prevState) => ({
      ...prevState,
      address: {
        ...prevState['address'],
        [name]: value,
      },
    }));
  };

  const handleAddressGeoChange = (name: string, value: string) => {
    setIsChanged(true);

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
    setIsChanged(true);

    const companyName = name.split('-')[1];

    setUserData((prevState) => ({
      ...prevState,
      company: {
        ...prevState['company'],
        [companyName]: value,
      },
    }));
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
        <Input
          id={`lat-${userInfo.id}`}
          name='lat'
          onChange={(event: any) =>
            handleAddressGeoChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item label='Lng' name='lng' initialValue={userInfo.address.geo.lng}>
        <Input
          id={`lng-${userInfo.id}`}
          name='lng'
          onChange={(event: any) =>
            handleAddressGeoChange(event.target.name, event.target.value)
          }
        />
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
          onChange={(event: any) =>
            handleAddressChange(event.target.name, event.target.value)
          }
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
          onChange={(event: any) =>
            handleAddressChange(event.target.name, event.target.value)
          }
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
          onChange={(event: any) =>
            handleAddressChange(event.target.name, event.target.value)
          }
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
          onChange={(event: any) =>
            handleAddressChange(event.target.name, event.target.value)
          }
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
          onChange={(event: any) =>
            handleCompanyChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item
        label='Company Catch Phrase'
        name='company-catchPhrase'
        initialValue={userInfo.company.catchPhrase}
      >
        <Input
          id={`company-catchPhrase-${userInfo.id}`}
          name='company-catchPhrase'
          onChange={(event: any) =>
            handleCompanyChange(event.target.name, event.target.value)
          }
        />
      </Form.Item>
      <Form.Item
        label='Company Business'
        name='company-bs'
        initialValue={userInfo.company.bs}
      >
        <Input
          id={`company-business-${userInfo.id}`}
          name='company-bs'
          onChange={(event: any) =>
            handleCompanyChange(event.target.name, event.target.value)
          }
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
