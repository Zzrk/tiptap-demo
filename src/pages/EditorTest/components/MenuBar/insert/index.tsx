import { PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Tooltip } from 'antd';
// import { useUser } from 'data/user';
import { useToggle } from 'ahooks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Editor } from '../core';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';

import { COMMANDS, insertMenuLRUCache, transformToCommands } from '../commands';

const _CommandRender = ({ commands, editor, runCommand }) => {
  return (
    <Dropdown.Menu>
      {commands.map((command, index) => {
        return command.title ? (
          <Dropdown.Title key={'title' + index}>{command.title}</Dropdown.Title>
        ) : command.custom ? (
          command.custom(editor, runCommand)
        ) : (
          <Dropdown.Item key={index + '-' + command.label} onClick={runCommand(command)}>
            {command.icon}
            {command.label}
          </Dropdown.Item>
        );
      })}
    </Dropdown.Menu>
  );
};

const CommandRender = React.memo(_CommandRender, (prevProps, nextProps) => {
  return prevProps.commands.length === nextProps.commands.length;
});

export const Insert: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const { user } = useUser();
  const user = {};
  const [recentUsed, setRecentUsed] = useState([]);
  // const isTitleActive = useActive(editor, Title.name);
  const [visible, { set: toggleVisible }] = useToggle(false);

  const renderedCommands = useMemo(
    () =>
      (recentUsed.length ? [{ title: '最近使用' }, ...recentUsed, ...COMMANDS] : COMMANDS).filter((command) => {
        return command.label === '表格' || command.label === '布局' ? Boolean(command) : true;
      }),
    [recentUsed]
  );

  const runCommand = useCallback(
    (command) => {
      return () => {
        insertMenuLRUCache.put(command.label);
        setRecentUsed(transformToCommands(COMMANDS, insertMenuLRUCache.get() as string[]));

        command.action(editor, user);
        toggleVisible(false);
      };
    },
    [editor, toggleVisible, user]
  );

  useEffect(() => {
    if (!visible) return;
    insertMenuLRUCache.syncFromStorage();
    setRecentUsed(transformToCommands(COMMANDS, insertMenuLRUCache.get() as string[]));
  }, [visible]);

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomLeft"
      open={visible}
      onOpenChange={toggleVisible}
      // style={{
      //   minWidth: 132,
      //   maxHeight: 'calc(90vh - 120px)',
      //   overflowY: 'auto',
      // }}
      render={visible ? <CommandRender commands={renderedCommands} editor={editor} runCommand={runCommand} /> : null}
    >
      <div>
        <Tooltip title="插入">
          <Button type="text" icon={<PlusOutlined />} disabled={false} />
        </Tooltip>
      </div>
    </Dropdown>
  );
};
