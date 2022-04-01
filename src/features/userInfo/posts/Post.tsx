import { FC, useState, ChangeEvent } from 'react';
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
      okButtonProps: { className: 'confirm-btn success-btn' },
      cancelButtonProps: { className: 'cancel-btn danger-btn' },
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
    <>
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
            className='edit-post-input edit-post-input-body'
          />
          <Space className='post-buttons'>
            <Button
              onClick={handleOnSave}
              className='post-button-success success-btn'
            >
              Save changes
            </Button>
            <Button
              danger
              onClick={handleOnDiscard}
              className='post-button-danger danger-btn'
            >
              Discard changes
            </Button>
          </Space>
        </Card>
      ) : (
        <Card title={post.title} className='post'>
          <p>{post.body}</p>
          <Space className='post-buttons'>
            <Button
              onClick={() => setIsEdit(true)}
              className='post-button-warning warning-btn'
            >
              Edit post
            </Button>
            <Button
              danger
              onClick={handleOnDelete}
              className='post-button-danger danger-btn'
            >
              Delete post
            </Button>
          </Space>
        </Card>
      )}
    </>
  );
};

export default Post;
