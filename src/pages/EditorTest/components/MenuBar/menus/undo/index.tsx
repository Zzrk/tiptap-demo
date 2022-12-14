import { SwapLeftOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../../core';

export const Undo: React.FC<{ editor: Editor }> = ({ editor }) => {
  const undo = useCallback(() => editor.chain().focus().undo().run(), [editor]);

  return (
    <Tooltip title="撤销">
      <Button onClick={undo} icon={<SwapLeftOutlined />} type="text" />
    </Tooltip>
  );
};
