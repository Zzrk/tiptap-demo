import { Button, Tooltip } from 'antd';
import { LineOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '../../core';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../../hooks/use-active';

export const HorizontalRule: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);

  const setHorizontalRule = useCallback(() => editor.chain().focus().setHorizontalRule().run(), [editor]);

  return (
    <Tooltip title="插入分割线">
      <Button
        type="text"
        icon={<LineOutlined />}
        onClick={setHorizontalRule}
        disabled={false}
      />
    </Tooltip>
  );
};
