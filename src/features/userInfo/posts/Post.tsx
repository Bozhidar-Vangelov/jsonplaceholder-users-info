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

  const handleOnEdit = () => {
    dispatch(updatePosts(id, post));

    console.log(post);

    setIsEdit(!isEdit);
  };

  const handleOnChange = (e: any) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Space>
      {isEdit ? (
        <Card
          title={
            <Input
              name='title'
              defaultValue={post.title}
              onChange={handleOnChange}
            />
          }
        >
          <Input
            name='body'
            defaultValue={post.body}
            onChange={handleOnChange}
          />
          <Button type='primary' onClick={handleOnEdit}>
            Save changes
          </Button>
          <Button type='primary' danger onClick={() => setIsEdit(false)}>
            Discard changes
          </Button>
        </Card>
      ) : (
        <Card title={post.title}>
          <p>{post.body}</p>
          <Button type='primary' danger onClick={handleOnDelete}>
            Delete post
          </Button>
          <Button type='primary' onClick={() => setIsEdit(true)}>
            Edit post
          </Button>
        </Card>
      )}
    </Space>
  );
};

export default Post;
