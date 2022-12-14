import { Button, Tooltip } from 'antd';
import { FallOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
// import { Subscript as SubscriptExtension } from 'tiptap/core/extensions/subscript';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../../hooks/use-active';

export const Subscript: React.FC<{ editor: any }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isSubscriptActive = useActive(editor, 'subscript');

  const toggleSubscript = useCallback(() => editor.chain().focus().toggleSubscript().run(), [editor]);

  return (
    <Tooltip title="下标">
      <Button
        className={isSubscriptActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<FallOutlined />}
        onClick={toggleSubscript}
        disabled={false}
      />
    </Tooltip>
  );
};
