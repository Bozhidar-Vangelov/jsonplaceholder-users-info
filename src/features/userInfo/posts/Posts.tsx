import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Empty,
  Spin,
  Button,
  Modal,
  Form,
  Input,
  Space,
  notification,
} from 'antd';

import { RootState } from '../../../app/store/configureStore';
import { fetchPosts, createPost } from './postsSlice';
import Post from './Post';

interface NewPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [form] = Form.useForm();
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const { loading, error, allPostsInfo } = useSelector(
    (state: RootState) => state.posts
  );

  const userPosts = allPostsInfo.filter(
    (post) => post.userId === Number(userId)
  );

  useEffect(() => {
    if (userPosts.length) {
      return;
    }

    dispatch(fetchPosts());
  }, [userPosts, dispatch]);

  if (error) {
    console.log(error);
    return <Empty description='Failed to load data'></Empty>;
  }

  if (loading) {
    return <Spin size='large' />;
  }

  const handleOnCreate = () => {
    setConfirmLoading(!confirmLoading);

    form
      .validateFields()
      .then(async ({ title, body }) => {
        const newPost: NewPost = {
          userId: Number(userId),
          id: allPostsInfo.length + 1,
          title,
          body,
        };
        form.resetFields();
        await dispatch(createPost(newPost));
        setConfirmLoading(!confirmLoading);
      })
      .then(() => {
        notification.success({
          message: 'Post successfully created!',
          placement: 'bottomRight',
          className: 'notification',
        });
      })
      .then(() => setShowCreateModal(false))
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <>
      <Button
        className='create-post-btn'
        onClick={() => setShowCreateModal(true)}
      >
        Create Post
      </Button>
      <Modal
        visible={showCreateModal}
        title='Create Post'
        okText='Confirm'
        okButtonProps={{ className: 'confirm-btn' }}
        cancelButtonProps={{ className: 'cancel-btn' }}
        onOk={handleOnCreate}
        onCancel={() => setShowCreateModal(false)}
        confirmLoading={confirmLoading}
      >
        <Form form={form} id='create-post'>
          <Form.Item
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: 'Please input the title of post!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Body'
            name='body'
            rules={[
              {
                required: true,
                message: 'Please input the body of post!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Space className='posts'>
        {userPosts.map((post) => (
          <Post
            key={post.id}
            userId={post.userId}
            id={post.id}
            body={post.body}
            title={post.title}
          />
        ))}
      </Space>
    </>
  );
};

export default Posts;
