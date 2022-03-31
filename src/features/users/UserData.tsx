import { FC, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Space } from 'antd';
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

  const onFinish = () => {
    //updates both allUsersInfo and userInfo in store, as the API is not saving the data
    dispatch(updateUsers(userInfo.id, userData));
    dispatch(updateUser(userInfo.id, userData));
  };

  const handleOnChange = (name: string, value: string) => {
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
    <Space className='user-info-card'>
      <Space className='user-info-card-main'>
        <img
          src={`https://joeschmoe.io/api/v1/${userInfo.id}`}
          alt={userInfo.name}
          className='user-info-card-main-img'
        />
        <p className='user-info-card-main-name'>{userInfo.name}</p>
        <Space className='user-info-card-main-btns-container'>
          <Button className='user-info-card-main-btns'>
            Go back to all users
          </Button>
          <Button className='user-info-card-main-btns'>See User's posts</Button>
        </Space>
      </Space>
      <Form
        layout='vertical'
        name='user'
        onFinish={onFinish}
        hidden={!isOpen}
        className='user-info-form'
      >
        <Space className='user-info-form-items-container'>
          <Space direction='vertical' className='user-info-form-items'>
            <h2>Personal</h2>
            <Form.Item label='Name'>
              <Input
                name='name'
                value={userData.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(event.target.name, event.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              label='Username'
              name='username'
              initialValue={userData.username}
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input
                value={userData.username}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(event.target.name, event.target.value)
                }
              />
            </Form.Item>
            <Space>
              <Form.Item
                label='Email'
                name='email'
                initialValue={userData.email}
                rules={[
                  { required: true, message: 'Please input your email!' },
                ]}
              >
                <Input
                  name='email'
                  value={userData.email}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(event.target.name, event.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label='Phone'>
                <Input
                  name='phone'
                  value={userData.phone}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOnChange(event.target.name, event.target.value)
                  }
                />
              </Form.Item>
            </Space>
            <Form.Item label='Website'>
              <Input
                name='website'
                value={userData.website}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(event.target.name, event.target.value)
                }
              />
            </Form.Item>
          </Space>
          <Space direction='vertical' className='user-info-form-items'>
            <h2>Address</h2>
            <Form.Item
              label='City'
              name='city'
              initialValue={userData.address.city}
              rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <Input
                name='city'
                value={userData.address.city}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleAddressChange(event.target.name, event.target.value)
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
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
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
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleAddressChange(event.target.name, event.target.value)
                }
              />
            </Form.Item>
            <Space>
              <Form.Item label='Latitude'>
                <Input
                  name='lat'
                  value={userData.address.geo.lat}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleAddressGeoChange(
                      event.target.name,
                      event.target.value
                    )
                  }
                />
              </Form.Item>
              <Form.Item label='Longitude'>
                <Input
                  name='lng'
                  value={userData.address.geo.lng}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleAddressGeoChange(
                      event.target.name,
                      event.target.value
                    )
                  }
                />
              </Form.Item>
              <Form.Item label='Zipcode'>
                <Input
                  name='zipcode'
                  value={userData.address.zipcode}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleAddressChange(event.target.name, event.target.value)
                  }
                />
              </Form.Item>
            </Space>
          </Space>
          <Space direction='vertical' className='user-info-form-items'>
            <h2>Company</h2>
            <Form.Item label='Name'>
              <Input
                name='company-name'
                value={userData.company.name}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCompanyChange(event.target.name, event.target.value)
                }
              />
            </Form.Item>
            <Form.Item label='Catch Phrase'>
              <Input
                name='company-catchPhrase'
                value={userData.company.catchPhrase}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCompanyChange(event.target.name, event.target.value)
                }
              />
            </Form.Item>
            <Form.Item label='Business'>
              <Input
                name='company-bs'
                value={userData.company.bs}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleCompanyChange(event.target.name, event.target.value)
                }
              />
            </Form.Item>
          </Space>
        </Space>
        <Space className='user-info-form-btns-container'>
          <Button
            type='primary'
            disabled={isEqual(userInfo, userData)}
            htmlType='submit'
            className='user-info-form-btn-save'
          >
            Save Changes
          </Button>
          <Button
            type='primary'
            danger
            onClick={resetFormData}
            className='user-info-form-btn-reset'
          >
            Reset
          </Button>
        </Space>
      </Form>
    </Space>
  );
};

export default UserData;
