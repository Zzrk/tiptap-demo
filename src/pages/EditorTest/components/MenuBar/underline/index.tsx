import { UnderlineOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { Title } from 'tiptap/core/extensions/title';
// import { Underline as UnderlineExtension } from 'tiptap/core/extensions/underline';
import { useActive } from '../use-active';

export const Underline: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isUnderlineActive = useActive(editor, 'underline');

  const toggleUnderline = useCallback(() => editor.chain().focus().toggleUnderline().run(), [editor]);

  return (
    <Tooltip title="下划线">
      <Button
        className={isUnderlineActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<UnderlineOutlined />}
        onClick={toggleUnderline}
        disabled={false}
      />
    </Tooltip>
  );
};
