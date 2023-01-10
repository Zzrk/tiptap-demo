import { Button, Tooltip } from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { useActive } from '@/tiptap/hooks/use-active';

export const Blockquote: React.FC<{ editor: Editor }> = ({ editor }) => {
  const isBlockquoteActive = useActive(editor, 'blockquote');

  const toggleBlockquote = useCallback(
    () => editor.chain().focus().toggleBlockquote().run(),
    [editor]
  );

  return (
    <Tooltip title="插入引用" className="shrink-0">
      <Button
        className={
          'flex justify-center items-center' +
          (isBlockquoteActive ? ' bg-gray-200' : '')
        }
        type="text"
        icon={<InfoOutlined />}
        onClick={toggleBlockquote}
        disabled={false}
      />
    </Tooltip>
  );
};
