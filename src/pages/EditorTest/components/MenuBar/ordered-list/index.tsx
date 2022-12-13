import { Button, Tooltip } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { OrderedList as OrderedListExtension } from 'tiptap/core/extensions/ordered-list';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';

export const OrderedList: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isOrderedListActive = useActive(editor, 'orderedList');

  const toggleOrderedList = useCallback(() => editor.chain().focus().toggleOrderedList().run(), [editor]);

  return (
    <Tooltip title="有序列表">
      <Button
        className={isOrderedListActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<OrderedListOutlined />}
        onClick={toggleOrderedList}
        disabled={false}
      />
    </Tooltip>
  );
};
