import { Button, Tooltip } from 'antd';
import { EmojiPicker } from '../../components/emoji-picker';
import { SmileOutlined  } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { Editor } from '../../core';

export const Emoji: React.FC<{ editor: Editor }> = ({ editor }) => {
  const setEmoji = useCallback(
    (emoji) => {
      const { selection } = editor.state;
      const { $anchor } = selection;
      return editor.chain().insertContentAt($anchor.pos, emoji).run();
    },
    [editor]
  );

  return (
    <EmojiPicker onSelectEmoji={setEmoji}>
      <span>
        <Tooltip title="插入表情">
          <Button type="text" icon={<SmileOutlined />} />
        </Tooltip>
      </span>
    </EmojiPicker>
  );
};
