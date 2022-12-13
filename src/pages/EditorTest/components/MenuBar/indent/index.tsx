import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';

export const Indent: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);

  const indent = useCallback(() => {
    editor.chain().focus().indent().run();
  }, [editor]);

  return (
    <Tooltip title="增加缩进">
      <Button
        onClick={indent}
        icon={<MenuUnfoldOutlined />}
        type="text"
        disabled={false}
      />
    </Tooltip>
  );
};
