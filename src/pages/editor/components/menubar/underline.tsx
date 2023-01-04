import { UnderlineOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Editor } from '@tiptap/react';

export const Underline: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <Tooltip title="下划线">
      <Button
        className={'flex justify-center items-center' + (editor.isActive('underline') ? ' bg-gray-200' : '')}
        type="text"
        icon={<UnderlineOutlined />}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={false}
      />
    </Tooltip>
  );
};
