import { ChangeEvent, ChangeEventHandler, FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Space, Card, Button, Modal, Input } from 'antd';

import { deletePost } from './postsSlice';

interface PostProps {
  id: number;
  title: string;
  body: string;
}

const Post: FC<PostProps> = ({ id, title, body }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleOnDelete = () => {
    dispatch(deletePost(id));

    setShowModal(false);
  };

  const handleOnEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleOntTitleChange = (e: any) => {
    title = e.target.value;
    console.log(title);
  };

  const handleOnBodyChange = (e: any) => {
    body = e.target.value;
  };

  return (
    <Space>
      {isEdit ? (
        <Card
          title={<Input defaultValue={title} onChange={handleOntTitleChange} />}
        >
          <Input defaultValue={body} onChange={handleOnBodyChange} />
          <Button type='primary' onClick={handleOnEdit}>
            Save changes
          </Button>
          <Button type='primary' danger onClick={() => setIsEdit(false)}>
            Discard changes
          </Button>
        </Card>
      ) : (
        <Card title={title}>
          <p>{body}</p>
          <Button type='primary' danger onClick={() => setShowModal(true)}>
            Delete post
          </Button>
          <Button type='primary' onClick={() => setIsEdit(true)}>
            Edit post
          </Button>
        </Card>
      )}
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
