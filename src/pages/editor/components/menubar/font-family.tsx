import { Select } from 'antd';
import React, { useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { useAttributes } from '@/tiptap/hooks/use-attributes';

export const FONT_FAMILIES = [
  {
    name: 'Inter',
    value: 'Inter',
  },
  {
    name: 'Comic Sans',
    value: 'Comic Sans MS, Comic Sans',
  },
  {
    name: 'serif',
    value: 'serif',
  },
  {
    name: 'monospace',
    value: 'monospace',
  },
  {
    name: 'cursive',
    value: 'cursive',
  },
];

export const FontFamily: React.FC<{ editor: Editor }> = ({ editor }) => {
  const currentFontFamily = useAttributes(
    editor,
    'textStyle',
    { fontFamily: 'Inter' },
    (attrs) => attrs.fontFamily
  );

  const toggle = useCallback(
    (val) => {
      editor
        .chain()
        .focus()
        .setFontFamily(val)
        .run();
    },
    [editor]
  );

  return (
    <Select disabled={false} value={currentFontFamily} onChange={toggle} style={{ width: 80, marginRight: 10 }} className="shrink-0">
      {FONT_FAMILIES.map((fontFamily) => (
        <Select.Option key={fontFamily.value} value={fontFamily.value}>
          {fontFamily.name}
        </Select.Option>
      ))}
    </Select>
  );
};
