import { Button, Tooltip } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { BulletList as BulletListExtension } from 'tiptap/core/extensions/bullet-list';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';

export const BulletList: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isBulletListActive = useActive(editor, 'bulletList');

  const toggleBulletList = useCallback(() => editor.chain().focus().toggleBulletList().run(), [editor]);

  return (
    <Tooltip title="无序列表">
      <Button
        className={isBulletListActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<UnorderedListOutlined />}
        onClick={toggleBulletList}
        disabled={false}
      />
    </Tooltip>
  );
};
