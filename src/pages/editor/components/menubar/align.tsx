import React, { useCallback, useMemo } from 'react';
import { Editor } from '@tiptap/react';
import { useActive } from '@/tiptap/hooks/use-active';
import { Dropdown, Tooltip, Button, Menu } from 'antd';
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const Align: React.FC<{ editor: Editor }> = ({ editor }) => {
  const isAlignCenter = useActive(editor, { textAlign: 'center' });
  const isAlignLeft = useActive(editor, { textAlign: 'left' });
  const isAlignRight = useActive(editor, { textAlign: 'right' });

  const current = useMemo(() => {
    if (isAlignCenter) {
      return <AlignCenterOutlined />;
    }
    if (isAlignLeft) {
      return <AlignLeftOutlined />;
    }
    if (isAlignRight) {
      return <AlignRightOutlined />;
    }
    return <MenuOutlined />;
  }, [isAlignCenter, isAlignLeft, isAlignRight]);

  const toggle = useCallback(
    (align) => {
      return () => editor.chain().focus().setTextAlign(align).run();
    },
    [editor]
  );

  const items: MenuProps['items'] = [
    {
      key: 'item',
      label: (
        <div className='flex justify-center items-center'>
          <Tooltip title="左对齐">
            <Button
              className='flex justify-center items-center'
              onClick={toggle('left')}
              type="text"
              icon={<AlignLeftOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title="居中">
            <Button
              className='flex justify-center items-center'
              onClick={toggle('center')}
              type="text"
              icon={<AlignCenterOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title="右对齐">
            <Button
              className='flex justify-center items-center'
              onClick={toggle('right')}
              type="text"
              icon={<AlignRightOutlined />}
            ></Button>
          </Tooltip>
          <Tooltip title="两端对齐">
            <Button
              className='flex justify-center items-center'
              onClick={toggle('justify')}
              type="text"
              icon={<MenuOutlined />}
            ></Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <Dropdown trigger={['click']} menu={{ items }} placement="bottom" className="shrink-0 p-0">
      <Tooltip title="对齐方式">
        <Button
          className="flex justify-center items-center"
          type="text"
          icon={current}
        ></Button>
      </Tooltip>
    </Dropdown>
  );
};
