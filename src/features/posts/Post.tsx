import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Card, Button, Modal } from 'antd';

import { RootState } from '../../app/store/configureStore';
import { deletePost } from './postsSlice';

interface PostProps {
  id: number;
  title: string;
  body: string;
}

const Post: FC<PostProps> = ({ id, title, body }) => {
  const { allPostsInfo } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOnClick = (e: any) => {
    setShowModal((showModal) => !showModal);

    // dispatch(deletePost(allPostsInfo));
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
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <p>This action cannot be undone!</p>
      </Modal>
    </Space>
  );
};

export default Post;
