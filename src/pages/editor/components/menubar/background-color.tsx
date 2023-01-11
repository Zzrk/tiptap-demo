import { BgColorsOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { ColorPicker } from '../color-picker';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { useAttributes } from '@/tiptap/hooks/use-attributes';

const FlexStyle: React.CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
};

export const BackgroundColor: React.FC<{ editor: Editor }> = ({ editor }) => {
  const backgroundColor = useAttributes(
    editor,
    'textStyle',
    { backgroundColor: null },
    (attrs) => attrs.backgroundColor
  );

  const setBackgroundColor = useCallback(
    (color) => {
      color
        ? editor.chain().focus().setBackgroundColor(color).run()
        : editor.chain().focus().unsetBackgroundColor().run();
    },
    [editor]
  );

  return (
    <ColorPicker
      title="背景色"
      onSetColor={setBackgroundColor}
      disabled={false}
    >
      <Tooltip title="背景色">
        <Button
          className="flex justify-center items-center"
          type={'text'}
          icon={
            <span style={FlexStyle}>
              <BgColorsOutlined />
              <span style={{ backgroundColor, width: 12, height: 2 }}></span>
            </span>
          }
          disabled={false}
        />
      </Tooltip>
    </ColorPicker>
  );
};
