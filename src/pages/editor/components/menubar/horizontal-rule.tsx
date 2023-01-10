import { Button, Tooltip } from 'antd';
import { LineOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const HorizontalRule: React.FC<{ editor: Editor }> = ({ editor }) => {
  const setHorizontalRule = useCallback(
    () => editor.chain().focus().setHorizontalRule().run(),
    [editor]
  );

  return (
    <Tooltip title="插入分割线" className="shrink-0">
      <Button
        className="flex justify-center items-center"
        type="text"
        icon={<LineOutlined />}
        onClick={setHorizontalRule}
        disabled={false}
      />
    </Tooltip>
  );
};
