import { FC, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Card, Button, Modal, Input, Spin } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { RootState } from '../../../app/store/configureStore';
import { deletePost, updatePosts } from './postsSlice';

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post: FC<PostProps> = ({ userId, id, title, body }) => {
  const postInfo = { userId, id, title, body };
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [post, setPost] = useState(postInfo);

  const { confirm } = Modal;

  const handleOnDelete = () => {
    confirm({
      title: 'Are you sure you want to delete this post?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone!',
      okText: 'Confirm',
      okType: 'danger',
      okButtonProps: { className: 'confirm-btn' },
      cancelButtonProps: { className: 'cancel-btn' },
      onOk: () => dispatch(deletePost(id)),
    });
  };

  const handleOnSave = () => {
    dispatch(updatePosts(id, post, handleOnDiscard));
    setIsEdit(!isEdit);
  };

  const handleOnDiscard = () => {
    setPost(postInfo);
    setIsEdit(!isEdit);
  };

  const handleOnChange = (name: string, value: string) => {
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
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
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleOnChange(event.target.name, event.target.value)
              }
              className='edit-post-input'
            />
          }
        >
          <Input
            name='body'
            defaultValue={post.body}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleOnChange(event.target.name, event.target.value)
            }
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
