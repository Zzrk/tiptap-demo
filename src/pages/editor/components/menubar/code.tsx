import { CodeOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Editor } from '@tiptap/react';

export const Code: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <Tooltip title="行内代码">
      <Button
        className={'flex justify-center items-center' + (editor.isActive('code') ? ' bg-gray-200' : '')}
        type="text"
        icon={<CodeOutlined />}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={false}
      />
    </Tooltip>
  );
};
