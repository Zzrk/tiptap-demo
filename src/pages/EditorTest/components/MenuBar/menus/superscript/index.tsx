import { Button, Tooltip } from 'antd';
import { RiseOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
// import { Superscript as SuperscriptExtension } from 'tiptap/core/extensions/superscript';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../../hooks/use-active';

export const Superscript: React.FC<{ editor: any }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isSuperscriptActive = useActive(editor, 'superscript');

  const toggleSuperscript = useCallback(() => editor.chain().focus().toggleSuperscript().run(), [editor]);

  return (
    <Tooltip title="上标">
      <Button
        className={isSuperscriptActive ? 'bg-gray-200' : ''}
        type="text"
        icon={<RiseOutlined />}
        onClick={toggleSuperscript}
        disabled={false}
      />
    </Tooltip>
  );
};
