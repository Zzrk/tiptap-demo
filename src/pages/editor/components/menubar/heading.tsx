import { Select } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { Editor } from '@tiptap/react';

const containerStyle = { width: 90, marginRight: 10 };
const h1Style = { margin: 0, fontSize: '1.3em' };
const h2Style = { margin: 0, fontSize: '1.1em' };
const h3Style = { margin: 0, fontSize: '1.0em' };
const h4Style = { margin: 0, fontSize: '0.9em' };
const h5Style = { margin: 0, fontSize: '0.8em' };
const h6Style = { margin: 0, fontSize: '0.8em' };

export const Heading: React.FC<{ editor: Editor }> = ({ editor }) => {
  const current = useMemo(() => {
    if (editor.isActive('heading', { level: 1 })) return 1;
    if (editor.isActive('heading', { level: 2 })) return 2;
    if (editor.isActive('heading', { level: 3 })) return 3;
    if (editor.isActive('heading', { level: 4 })) return 4;
    if (editor.isActive('heading', { level: 5 })) return 5;
    if (editor.isActive('heading', { level: 6 })) return 6;
    return 'paragraph';
  }, [
    editor.isActive('heading', { level: 1 }),
    editor.isActive('heading', { level: 2 }),
    editor.isActive('heading', { level: 3 }),
    editor.isActive('heading', { level: 4 }),
    editor.isActive('heading', { level: 5 }),
    editor.isActive('heading', { level: 6 }),
  ])

  const toggle = useCallback(
    (level) => {
      if (level === 'paragraph') {
        editor.chain().focus().setParagraph().run();
      } else {
        editor.chain().focus().toggleHeading({ level }).run();
      }
    },
    [editor]
  );

  return (
    <Select disabled={false} value={current} onChange={toggle} style={containerStyle} className="shrink-0">
      <Select.Option value="paragraph">正文</Select.Option>
      <Select.Option value={1}>
        <h1 style={h1Style}>标题1</h1>
      </Select.Option>
      <Select.Option value={2}>
        <h2 style={h2Style}>标题2</h2>
      </Select.Option>
      <Select.Option value={3}>
        <h3 style={h3Style}>标题3</h3>
      </Select.Option>
      <Select.Option value={4}>
        <h4 style={h4Style}>标题4</h4>
      </Select.Option>
      <Select.Option value={5}>
        <h5 style={h5Style}>标题5</h5>
      </Select.Option>
      <Select.Option value={6}>
        <h6 style={h6Style}>标题6</h6>
      </Select.Option>
    </Select>
  );
};
