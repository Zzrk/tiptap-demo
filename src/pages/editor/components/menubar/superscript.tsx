import { Button, Tooltip } from 'antd';
import { RiseOutlined } from '@ant-design/icons';
import React from 'react';
import { Editor } from '@tiptap/react';

export const Superscript: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <Tooltip title="上标">
      <Button
        className={'flex justify-center items-center' + (editor.isActive('superscript') ? ' bg-gray-200' : '')}
        type="text"
        icon={<RiseOutlined />}
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        disabled={false}
      />
    </Tooltip>
  );
};
