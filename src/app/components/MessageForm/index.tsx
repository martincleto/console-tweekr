import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const { TextArea } = Input;

type MessageFormProps = {
  onSubmit: any;
};

const MessageForm: React.FC<MessageFormProps> = ({ onSubmit }) => {
  const MESSAGE_MAX_CHARS = 250;
  const [dirty, setDirty] = useState(false);
  const [form] = Form.useForm();

  return (
    <Form
      name="messageForm"
      initialValues={{ remember: true }}
      onFinish={onSubmit}
    >
      <Form.Item
        name="content"
        required
      >
        <TextArea
          showCount
          maxLength={MESSAGE_MAX_CHARS}
          onChange={evt => setDirty(!!evt.target.value.length)}
        />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        disabled={!dirty}
        onClick={() => form.resetFields()}
      >
        Post Message
      </Button>
    </Form>
  );
};

export default MessageForm;
