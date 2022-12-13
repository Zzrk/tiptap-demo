import { FontColorsOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ColorPicker } from 'components/color-picker';
import React, { useCallback } from 'react';
import { Editor } from '../core';
// import { TextStyle } from 'tiptap/core/extensions/text-style';
// import { Title } from 'tiptap/core/extensions/title';
import { useActive } from '../use-active';
import { useAttributes } from '../use-attributes';

type Color = { color: string };

const FlexStyle = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
} as React.CSSProperties;

export const TextColor: React.FC<{ editor: Editor }> = ({ editor }) => {
  // const isTitleActive = useActive(editor, Title.name);
  const isTextStyleActive = useActive(editor, TextStyle.name);
  const color = useAttributes<Color, Color['color']>(editor, 'textStyle', { color: null }, (attrs) => attrs.color);

  const setColor = useCallback(
    (color) => {
      color ? editor.chain().focus().setColor(color).run() : editor.chain().focus().unsetColor().run();
    },
    [editor]
  );

  return (
    <ColorPicker title="文本色" onSetColor={setColor} disabled={isTitleActive}>
      <Tooltip content="文本色">
        <Button
          theme={isTextStyleActive ? 'light' : 'borderless'}
          type={'tertiary'}
          icon={
            <span style={FlexStyle}>
              <FontColorsOutlined style={{ fontSize: '0.85em' }} />
              <span
                style={{
                  width: 12,
                  height: 2,
                  backgroundColor: color,
                }}
              ></span>
            </span>
          }
          disabled={isTitleActive}
        />
      </Tooltip>
    </ColorPicker>
  );
};
