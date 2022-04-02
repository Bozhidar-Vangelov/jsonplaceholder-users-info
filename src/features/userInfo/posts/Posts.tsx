import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { Empty, Spin, Button, Modal, Form, Input, Space, Divider } from 'antd';

import { fetchPosts, createPost, postsSelector } from './postsSlice';
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

  const { loading, error, allPostsInfo, postLoading } =
    useSelector(postsSelector);

  const userPosts = allPostsInfo.filter(
    (post) => post.userId === Number(userId)
  );

  useEffect(() => {
    // do not refetch data, as the API is not saving it
    if (isEmpty(userPosts)) {
      dispatch(fetchPosts());
    }
  }, []);

  if (error && isEmpty(userPosts)) {
    return <Empty description='Failed to load data' />;
  }

  const handleOnCreate = () => {
    form.validateFields().then(({ title, body }) => {
      const newPost: NewPost = {
        userId: Number(userId),
        id: allPostsInfo.length + 1,
        title,
        body,
      };

      dispatch(createPost(newPost));

      setShowCreateModal(false);
      form.resetFields();
    });
  };

  return (
    <>
      <Space className='create-post-btn-container'>
        <Button
          className='create-post-btn success-btn'
          onClick={() => setShowCreateModal(true)}
        >
          Create Post
        </Button>
      </Space>
      <Spin size='large' spinning={loading}>
        <Divider className='divider' />
        <Modal
          visible={showCreateModal}
          title='Create Post'
          okText='Confirm'
          okButtonProps={{ className: 'confirm-btn success-btn' }}
          cancelButtonProps={{ className: 'cancel-btn danger-btn' }}
          onOk={handleOnCreate}
          onCancel={() => setShowCreateModal(false)}
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
        <Spin tip='Loading...' spinning={postLoading} wrapperClassName='posts'>
          {userPosts.map((post) => (
            <Post
              key={post.id}
              userId={post.userId}
              id={post.id}
              body={post.body}
              title={post.title}
            />
          ))}
        </Spin>
      </Spin>
    </>
  );
};

export default Posts;
