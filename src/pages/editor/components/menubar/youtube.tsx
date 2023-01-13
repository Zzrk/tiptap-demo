import { ExclamationCircleFilled, YoutubeOutlined } from '@ant-design/icons';
import { Button, Tooltip, Modal, Input, Form } from 'antd';
import React, { useCallback, useState } from 'react';
import { Editor } from '@tiptap/react';

const { confirm } = Modal;

export const Youtube: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [form] = Form.useForm();

  const showConfirm = () => {
    confirm({
      title: '添加视频',
      icon: null,
      onOk: async () => {
        try {
          const { url: src, width, height } = await form.validateFields();
          editor.commands.setYoutubeVideo({ src, width, height });
          form.setFieldValue('url', '');
        } catch (errorInfo) {
          return Promise.reject(errorInfo)
        }
      },
      content: (
        <Form
          form={form}
          labelCol={{ span: 6 }}
          className="pt-5"
          initialValues={{ width: 640, height: 480 }}
        >
          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: 'Please input Youtube URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Width"
            name="width"
            rules={[{ required: true, message: 'Please input Youtube Width!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Height"
            name="height"
            rules={[{ required: true, message: 'Please input Youtube Height!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      )
    })
  }

  return (
    <>
      <Tooltip title="添加视频" className="shrink-0">
        <Button
          className="flex justify-center items-center"
          onClick={showConfirm}
          icon={<YoutubeOutlined />}
          type="text"
          disabled={false}
        />
      </Tooltip>
    </>
  );
};
