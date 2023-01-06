import { Button, Tooltip } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const BulletList: React.FC<{ editor: Editor }> = ({ editor }) => {
  const toggleBulletList = useCallback(
    () => editor.chain().focus().toggleBulletList().run(),
    [editor]
  );

  return (
    <Tooltip title="无序列表" className="shrink-0">
      <Button
        className={
          'flex justify-center items-center' +
          (editor.isActive('bulletList') ? ' bg-gray-200' : '')
        }
        type="text"
        icon={<UnorderedListOutlined />}
        onClick={toggleBulletList}
        disabled={false}
      />
    </Tooltip>
  );
};
