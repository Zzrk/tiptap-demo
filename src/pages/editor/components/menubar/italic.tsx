import { ItalicOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Editor } from '@tiptap/react';

export const Italic: React.FC<{ editor: Editor }> = ({ editor }) => {
  return (
    <Tooltip title="斜体">
      <Button
        className={'flex justify-center items-center' + (editor.isActive('italic') ? ' bg-gray-200' : '')}
        type="text"
        icon={<ItalicOutlined />}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
    </Tooltip>
  );
};
