import { Button, Tooltip } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const OrderedList: React.FC<{ editor: Editor }> = ({ editor }) => {
  const toggleOrderedList = useCallback(
    () => editor.chain().focus().toggleOrderedList().run(),
    [editor]
  );

  return (
    <Tooltip title="有序列表" className="shrink-0">
      <Button
        className={
          'flex justify-center items-center' +
          (editor.isActive('orderedList') ? ' bg-gray-200' : '')
        }
        type="text"
        icon={<OrderedListOutlined />}
        onClick={toggleOrderedList}
        disabled={false}
      />
    </Tooltip>
  );
};
