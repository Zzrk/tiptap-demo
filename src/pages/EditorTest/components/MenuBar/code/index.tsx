import { CodeOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { Code as InlineCode } from 'tiptap/core/extensions/code';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';

export const Code: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isCodeActive = useActive(editor, 'code');

  const toggleCode = useCallback(() => editor.chain().focus().toggleCode().run(), [editor]);

  return (
    <Tooltip title="行内代码">
      <Button
        className={isCodeActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<CodeOutlined />}
        onClick={toggleCode}
        disabled={false}
      />
    </Tooltip>
  );
};
