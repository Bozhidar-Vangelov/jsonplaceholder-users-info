import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Space, Card, Button, Modal, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { deletePost, updatePosts } from './postsSlice';

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post: FC<PostProps> = ({ userId, id, title, body }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [post, setPost] = useState({ userId, id, title, body });

  const { confirm } = Modal;

  const handleOnDelete = () => {
    confirm({
      title: 'Are you sure you want to delete this post?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone!',
      okText: 'Confirm',
      onOk() {
        return new Promise((resolve) => {
          resolve(dispatch(deletePost(id)));
        });
      },
    });
  };

  const handleOnSave = () => {
    dispatch(updatePosts(id, post));

    setIsEdit(!isEdit);
  };

  const handleOnDiscard = () => {
    setPost({ userId, id, title, body });
    setIsEdit(!isEdit);
  };

  const handleOnChange = (e: any) => {
    setPost((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Space className='post-container'>
      {isEdit ? (
        <Card
          className='post'
          title={
            <Input
              name='title'
              defaultValue={post.title}
              onChange={handleOnChange}
              className='edit-post-input'
            />
          }
        >
          <Input
            name='body'
            defaultValue={post.body}
            onChange={handleOnChange}
            className='edit-post-input'
          />
          <Space className='post-buttons'>
            <Button type='primary' onClick={handleOnSave}>
              Save changes
            </Button>
            <Button type='primary' danger onClick={handleOnDiscard}>
              Discard changes
            </Button>
          </Space>
        </Card>
      ) : (
        <Card title={post.title} className='post'>
          <p>{post.body}</p>
          <Space className='post-buttons'>
            <Button type='primary' onClick={() => setIsEdit(true)}>
              Edit post
            </Button>
            <Button type='primary' danger onClick={handleOnDelete}>
              Delete post
            </Button>
          </Space>
        </Card>
      )}
    </Space>
  );
};

export default Post;
