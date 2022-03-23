import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Space, Card, Button, Modal } from 'antd';

import { deletePost } from './postsSlice';

interface PostProps {
  id: number;
  title: string;
  body: string;
}

const Post: FC<PostProps> = ({ id, title, body }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOnClick = (e: any) => {
    setShowModal((showModal) => !showModal);
  };

  const handleOnDelete = (e: any) => {
    dispatch(deletePost(id));

    setShowModal(false);
  };

  return (
    <Space>
      <Card title={title}>
        <p>{body}</p>
        <Button type='primary' danger onClick={handleOnClick}>
          Delete post
        </Button>
      </Card>
      <Modal
        title={'Are you sure you want to delete this post?'}
        visible={showModal}
        okText='Delete'
        okType='danger'
        onOk={handleOnDelete}
        onCancel={() => setShowModal(false)}
      >
        <p>This action cannot be undone!</p>
      </Modal>
    </Space>
  );
};

export default Post;
