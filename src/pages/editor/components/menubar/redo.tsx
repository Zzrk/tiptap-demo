import { SwapRightOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const Redo: React.FC<{ editor: Editor }> = ({ editor }) => {
  const redo = useCallback(() => editor.chain().focus().redo().run(), [editor]);

  return (
    <Tooltip title="重做" className="shrink-0">
      <Button
        className="flex justify-center items-center"
        onClick={redo}
        icon={<SwapRightOutlined />}
        type="text"
      />
    </Tooltip>
  );
};
