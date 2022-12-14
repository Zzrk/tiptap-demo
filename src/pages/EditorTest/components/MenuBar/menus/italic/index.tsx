import { ItalicOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../../core';
// import { Italic as ItalicExtension } from 'tiptap/core/extensions/italic';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../../hooks/use-active';

export const Italic: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isItalicActive = useActive(editor, 'italic');

  const toggleItalic = useCallback(() => editor.chain().focus().toggleItalic().run(), [editor]);

  return (
    <Tooltip title="斜体">
      <Button
        className={isItalicActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<ItalicOutlined />}
        onClick={toggleItalic}
      />
    </Tooltip>
  );
};
