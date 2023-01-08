import { Button, Tooltip } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const ClearNodeAndMarks: React.FC<{ editor: Editor }> = ({
  editor,
}) => {
  const clear = useCallback(() => {
    editor.chain().focus().unsetAllMarks().run();
    editor.chain().focus().clearNodes().run();
  }, [editor]);

  return (
    <Tooltip title="清除格式" className="shrink-0">
      <Button
        className="flex justify-center items-center"
        onClick={clear}
        icon={<ClearOutlined />}
        type="text"
      />
    </Tooltip>
  );
};
