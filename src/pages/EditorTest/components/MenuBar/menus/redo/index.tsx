import { SwapRightOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '../../core';

export const Redo: React.FC<{ editor: Editor }> = ({ editor }) => {
  const redo = useCallback(() => editor.chain().focus().redo().run(), [editor]);

  return (
    <Tooltip title="重做">
      <Button onClick={redo} icon={<SwapRightOutlined />} type="text" />
    </Tooltip>
  );
};
