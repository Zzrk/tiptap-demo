import { MenuFoldOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const Outdent: React.FC<{ editor: Editor }> = ({ editor }) => {
  const outdent = useCallback(() => {
    editor.chain().focus().outdent().run();
  }, [editor]);

  return (
    <Tooltip title="减少缩进" className="shrink-0">
      <Button
        className="flex justify-center items-center"
        onClick={outdent}
        icon={<MenuFoldOutlined />}
        type="text"
        disabled={false}
      />
    </Tooltip>
  );
};
