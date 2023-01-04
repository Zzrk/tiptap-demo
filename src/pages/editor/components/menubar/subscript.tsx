import { Button, Tooltip } from 'antd';
import { FallOutlined } from '@ant-design/icons';
import React from 'react';
import { Editor } from '@tiptap/react';

export const Subscript: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <Tooltip title="下标">
      <Button
        className={'flex justify-center items-center' + (editor.isActive('subscript') ? ' bg-gray-200' : '')}
        type="text"
        icon={<FallOutlined />}
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        disabled={false}
      />
    </Tooltip>
  );
};
