import { FontColorsOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ColorPicker } from '../color-picker';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { useAttributes } from '@/tiptap/hooks/use-attributes';

type Color = { color: string };

const FlexStyle = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
} as React.CSSProperties;

export const TextColor: React.FC<{ editor: Editor }> = ({ editor }) => {
  const color = useAttributes<Color, Color['color']>(
    editor,
    'textStyle',
    { color: null },
    (attrs) => attrs.color
  );

  const setColor = useCallback(
    (color) => {
      color
        ? editor.chain().focus().setColor(color).run()
        : editor.chain().focus().unsetColor().run();
    },
    [editor]
  );

  return (
    <ColorPicker title="文本色" onSetColor={setColor} disabled={false}>
      <Tooltip title="文本色">
        <Button
          className="flex justify-center items-center"
          type={'text'}
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
          disabled={false}
        />
      </Tooltip>
    </ColorPicker>
  );
};
