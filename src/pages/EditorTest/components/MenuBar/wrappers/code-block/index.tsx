import { CopyOutlined } from '@ant-design/icons';
import { Button, Select, Tooltip } from 'antd';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import cls from 'classnames';
import { copy } from '../../helpers/copy';
import React, { useRef } from 'react';

// import styles from './index.module.scss';
import './index.less'

export const CodeBlockWrapper = ({ editor, node: { attrs }, updateAttributes, extension }) => {
  const isEditable = editor.isEditable;
  const isPrint = editor?.options?.editorProps?.print;
  const { language: defaultLanguage } = attrs;
  const $container = useRef<HTMLPreElement>();

  return (
    <NodeViewWrapper className={cls("wrap", !isPrint && "maxHeight", 'render-wrapper')}>
      <div className={"handleWrap"}>
        <Select
          size="small"
          defaultValue={defaultLanguage || 'null'}
          onChange={(value) => updateAttributes({ language: value })}
          className={"selectorWrap"}
          disabled={!isEditable}
          // filter
        >
          <Select.Option value="null">auto</Select.Option>
          {extension.options.lowlight.listLanguages().map((lang, index) => (
            <Select.Option key={index} value={lang}>
              {lang}
            </Select.Option>
          ))}
        </Select>
        <Tooltip title="复制">
          <Button
            size="small"
            type="text"
            icon={<CopyOutlined />}
            onClick={() => copy($container.current.innerText)}
          />
        </Tooltip>
      </div>
      <pre ref={$container}>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};
