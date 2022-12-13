import { StrikethroughOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { Strike as StrikeExtension } from 'tiptap/core/extensions/strike';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';

export const Strike: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isStrikeActive = useActive(editor, 'strike');

  const toggleStrike = useCallback(() => editor.chain().focus().toggleStrike().run(), [editor]);

  return (
    <Tooltip title="删除线">
      <Button
        className={isStrikeActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<StrikethroughOutlined />}
        onClick={toggleStrike}
        disabled={false}
      />
    </Tooltip>
  );
};
