import { Dropdown, Typography } from 'antd';
import { useToggle } from 'ahooks';
import React, { useCallback } from 'react';

import './style.less';

const { Text } = Typography;

const colors = [
  '#000000',
  '#262626',
  '#595959',
  '#8C8C8C',
  '#BFBFBF',
  '#D9D9D9',
  '#E9E9E9',
  '#F5F5F5',
  '#FAFAFA',
  '#FFFFFF',
  '#F5222D',
  '#FA541C',
  '#FA8C16',
  '#FADB14',
  '#52C41A',
  '#13C2C2',
  '#1890FF',
  '#2F54EB',
  '#722ED1',
  '#EB2F96',
  '#FFE8E6',
  '#FFECE0',
  '#FFEFD1',
  '#FCFCCA',
  '#E4F7D2',
  '#D3F5F0',
  '#D4EEFC',
  '#DEE8FC',
  '#EFE1FA',
  '#FAE1EB',
  '#FFA39E',
  '#FFBB96',
  '#FFD591',
  '#FFFB8F',
  '#B7EB8F',
  '#87E8DE',
  '#91D5FF',
  '#ADC6FF',
  '#D3ADF7',
  '#FFADD2',
  '#FF4D4F',
  '#FF7A45',
  '#FFA940',
  '#FFEC3D',
  '#73D13D',
  '#36CFC9',
  '#40A9FF',
  '#597EF7',
  '#9254DE',
  '#F759AB',
  '#CF1322',
  '#D4380D',
  '#D46B08',
  '#D4B106',
  '#389E0D',
  '#08979C',
  '#096DD9',
  '#1D39C4',
  '#531DAB',
  '#C41D7F',
  '#820014',
  '#871400',
  '#873800',
  '#614700',
  '#135200',
  '#00474F',
  '#003A8C',
  '#061178',
  '#22075E',
  '#780650',
];

export const ColorPicker: React.FC<{
  title?: string;
  onSetColor: (arg: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}> = ({ children, title = '颜色管理', onSetColor, disabled = false }) => {
  const [visible, { set: toggleVisible }] = useToggle(false);

  const content = useCallback(
    () =>
      !visible ? (
        <></>
      ) : (
        <div className="border border-[rgba(28,31,35,.2)] rounded shadow p-4 bg-white px-4 py-3 w-[250px]">
          <div
            className="flex cursor-pointer border border-transparent flex-nowrap hover:bg-[var(--semi-color-fill-1)]"
            onClick={() => onSetColor(null)}
          >
            <span className="relative block w-5 h-5 mr-2 ml-px border border-[#e8e8e8] rounded-sm after:absolute after:top-2 after:left-0 after:block after:w-[17px] after:h-0 after:content-none after:rotate-45 after:border-b-[2px] after:border-[#ff5151]"></span>
            <Text>无颜色</Text>
          </div>

          <div className="flex flex-wrap mt-2">
            {colors.map((color) => {
              return (
                <div
                  key={color}
                  id="colorItem"
                  onClick={() => onSetColor(color)}
                >
                  <span style={{ backgroundColor: color }}></span>
                </div>
              );
            })}
          </div>
        </div>
      ),
    [onSetColor, visible]
  );

  if (disabled) return <span className="inline-block">{children}</span>;

  return (
    <Dropdown
      open={visible}
      onOpenChange={toggleVisible}
      trigger={['click']}
      placement={'bottomLeft'}
      dropdownRender={content}
    >
      <span className="inline-block">{children}</span>
    </Dropdown>
  );
};
