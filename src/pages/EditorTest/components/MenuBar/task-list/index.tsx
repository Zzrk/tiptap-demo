import { Button, Tooltip } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { TaskList as TaskListExtension } from 'tiptap/core/extensions/task-list';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';

export const TaskList: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isTaskListActive = useActive(editor, 'taskList');

  const toggleTaskList = useCallback(() => editor.chain().focus().toggleTaskList().run(), [editor]);

  return (
    <Tooltip title="任务列表">
      <Button
        className={isTaskListActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<CheckSquareOutlined />}
        onClick={toggleTaskList}
        disabled={false}
      />
    </Tooltip>
  );
};
