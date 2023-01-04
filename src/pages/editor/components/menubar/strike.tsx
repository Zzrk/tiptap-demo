import { StrikethroughOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Editor } from '@tiptap/react';

export const Strike: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <Tooltip title="删除线">
      <Button
        className={'flex justify-center items-center' + (editor.isActive('strike') ? ' bg-gray-200' : '')}
        type="text"
        icon={<StrikethroughOutlined />}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={false}
      />
    </Tooltip>
  );
};
