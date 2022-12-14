import { Button, Tooltip } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '../../core';
// import { Link as LinkExtension } from 'tiptap/core/extensions/link';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../../hooks/use-active';

import { LinkBubbleMenu } from './bubble';
import { LinkSettingModal } from './modal';
import { createOrToggleLink } from './service';

export const Link: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isLinkActive = useActive(editor, 'link');

  const callLinkService = useCallback(() => createOrToggleLink(editor), [editor]);

  return (
    <>
      <Tooltip title="插入链接">
        <Button
          className={isLinkActive ? 'bg-gray-200' : ''}
          type="text"
          icon={<LinkOutlined />}
          onClick={callLinkService}
          disabled={false}
        />
      </Tooltip>
      <LinkBubbleMenu editor={editor} />
      <LinkSettingModal editor={editor} />
    </>
  );
};
