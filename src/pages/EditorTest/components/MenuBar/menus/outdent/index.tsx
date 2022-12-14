import { MenuFoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../../core';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../../hooks/use-active';

export const Outdent: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);

  const outdent = useCallback(() => {
    editor.chain().focus().outdent().run();
  }, [editor]);

  return (
    <Tooltip title="减少缩进">
      <Button
        onClick={outdent}
        icon={<MenuFoldOutlined />}
        type="text"
        disabled={false}
      />
    </Tooltip>
  );
};
