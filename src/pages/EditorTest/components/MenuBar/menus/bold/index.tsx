import { BoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../../core'
// import { Bold as BoldExtension } from 'tiptap/core/extensions/bold';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../../hooks/use-active';

export const Bold: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isBoldActive = useActive(editor, 'bold');

  const toggleBold = useCallback(() => editor.chain().focus().toggleBold().run(), [editor]);

  return (
    <Tooltip title="粗体">
      <Button
        className={isBoldActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<BoldOutlined />}
        onClick={toggleBold}
      />
    </Tooltip>
  );
};
