import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const Indent: React.FC<{ editor: Editor }> = ({ editor }) => {
  const indent = useCallback(() => {
    editor.chain().focus().indent().run();
  }, [editor]);

  return (
    <Tooltip title="增加缩进" className="shrink-0">
      <Button
        className="flex justify-center items-center"
        onClick={indent}
        icon={<MenuUnfoldOutlined />}
        type="text"
        disabled={false}
      />
    </Tooltip>
  );
};
