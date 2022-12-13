import { Button, Tooltip } from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { Blockquote as BlockquoteExtension } from 'tiptap/core/extensions/blockquote';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';

export const Blockquote: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isBlockquoteActive = useActive(editor, 'blockquote');

  const toggleBlockquote = useCallback(() => editor.chain().focus().toggleBlockquote().run(), [editor]);

  return (
    <Tooltip title="插入引用">
      <Button
        className={isBlockquoteActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<InfoOutlined />}
        onClick={toggleBlockquote}
        disabled={false}
      />
    </Tooltip>
  );
};
