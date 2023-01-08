import { SwapLeftOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const Undo: React.FC<{ editor: Editor }> = ({ editor }) => {
  const undo = useCallback(() => editor.chain().focus().undo().run(), [editor]);

  return (
    <Tooltip title="撤销" className="shrink-0">
      <Button
        className="flex justify-center items-center"
        onClick={undo}
        icon={<SwapLeftOutlined />}
        type="text"
      />
    </Tooltip>
  );
};
