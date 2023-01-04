import { BoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Editor } from '@tiptap/react'

export const Bold: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <Tooltip title="粗体">
      <Button
        className={'flex justify-center items-center' + (editor.isActive('bold') ? ' bg-gray-200' : '')}
        type="text"
        icon={<BoldOutlined />}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
    </Tooltip>
  );
};
