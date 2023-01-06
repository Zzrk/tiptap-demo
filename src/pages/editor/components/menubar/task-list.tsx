import { Button, Tooltip } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';

export const TaskList: React.FC<{ editor: Editor }> = ({ editor }) => {
  const toggleTaskList = useCallback(
    () => editor.chain().focus().toggleTaskList().run(),
    [editor]
  );

  return (
    <Tooltip title="任务列表" className="shrink-0">
      <Button
        className={
          'flex justify-center items-center' +
          (editor.isActive('taskList') ? ' bg-gray-200' : '')
        }
        type="text"
        icon={<CheckSquareOutlined />}
        onClick={toggleTaskList}
        disabled={false}
      />
    </Tooltip>
  );
};
