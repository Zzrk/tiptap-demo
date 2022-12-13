import { EditOutlined, CompassOutlined, DisconnectOutlined } from '@ant-design/icons';
import { Button, Space, Divider, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { BubbleMenu } from '../bubble-menu';
import { Link } from '../extensions/link';
import { useAttributes } from '../use-attributes';
import { findMarkPosition, isMarkActive } from '../prose-utils';

import { triggerOpenLinkSettingModal } from '../_event';

export const LinkBubbleMenu = ({ editor }) => {
  const { href, target } = useAttributes(editor, Link.name, { href: '', target: '' });
  const [text, setText] = useState();
  const [from, setFrom] = useState(-1);
  const [to, setTo] = useState(-1);

  const shouldShow = useCallback(() => editor.isActive(Link.name), [editor]);

  const visitLink = useCallback(() => {
    window.open(href, target);
  }, [href, target]);

  const openEditLinkModal = useCallback(() => {
    triggerOpenLinkSettingModal(editor, { href, text, from, to });
  }, [editor, href, text, from, to]);

  const unsetLink = useCallback(() => editor.chain().extendMarkRange(Link.name).unsetLink().run(), [editor]);

  useEffect(() => {
    const listener = () => {
      const isLinkActive = editor.isActive(Link.name);

      if (!isLinkActive) return;

      const { state } = editor;
      const isInLink = isMarkActive(state.schema.marks.link)(state);

      if (!isInLink) return;

      const { $head, from, to } = editor.state.selection;
      const marks = $head.marks();

      let start;
      let end;

      if (marks.length) {
        const mark = marks[0];
        const node = $head.node($head.depth);
        const startPosOfThisLine = $head.pos - (($head.nodeBefore && $head.nodeBefore.nodeSize) || 0);
        const endPosOfThisLine = $head.nodeAfter
          ? startPosOfThisLine + $head.nodeAfter.nodeSize
          : $head.pos - $head.parentOffset + node.content.size;

        const { start: startPos, end: endPos } = findMarkPosition(state, mark, startPosOfThisLine, endPosOfThisLine);
        start = startPos;
        end = endPos;
      } else {
        start = from;
        end = to;
      }

      const text = state.doc.textBetween(start, end);
      setText(text);
      setFrom(start);
      setTo(end);
    };

    editor.on('selectionUpdate', listener);

    return () => {
      editor.off('selectionUpdate', listener);
    };
  }, [editor]);

  return (
    <BubbleMenu
      className={'bubble-menu'}
      editor={editor}
      pluginKey="link-bubble-menu"
      shouldShow={shouldShow}
      tippyOptions={{ maxWidth: 'calc(100vw - 100px)' }}
    >
      <Space>
        <Tooltip title="访问链接">
          <Button size="small" type="text" icon={<CompassOutlined />} onClick={visitLink} />
        </Tooltip>

        <Tooltip title="编辑链接">
          <Button size="small" type="text" icon={<EditOutlined />} onClick={openEditLinkModal} />
        </Tooltip>

        <Divider />

        <Tooltip title="去除链接">
          <Button onClick={unsetLink} icon={<DisconnectOutlined />} type="text" size="small" />
        </Tooltip>
      </Space>
    </BubbleMenu>
  );
};
