import { LinkOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react'
import { useActive } from '@/tiptap/hooks/use-active';

export const Link: React.FC<{ editor: Editor }> = ({ editor }) => {
  const isLinkActive = useActive(editor, 'link');

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    // cancelled
    if (url === null) return
    // empty
    if (url === '') return editor.chain().focus().extendMarkRange('link').unsetLink().run()
    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <Tooltip title="插入链接">
      <Button
        className={'flex justify-center items-center' + (isLinkActive ? ' bg-gray-200' : '')}
        type="text"
        icon={<LinkOutlined />}
        onClick={isLinkActive ? () => editor.chain().focus().unsetLink().run() : setLink}
      />
    </Tooltip>
  );
};
