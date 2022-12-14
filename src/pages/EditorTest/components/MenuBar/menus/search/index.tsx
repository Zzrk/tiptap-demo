import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Input,
  Popover,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Editor } from '../../core';
import { useToggle } from 'ahooks';
import deepEqual from 'deep-equal';
import {
  ON_SEARCH_RESULTS,
  SearchNReplace,
} from '../../extensions/search';
import { IsOnMobile } from '../../hooks/use-on-mobile';

const { Text } = Typography;

const headerStyle: React.CSSProperties = {
  borderBottom: '1px solid var(--semi-color-border)',
};
const marginBottomStyle: React.CSSProperties = { marginBottom: 12 };

export const Search: React.FC<{ editor: Editor }> = ({ editor }) => {
  const isMobile = false
  const [visible, { set: toggleVisible }] = useToggle(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [replaceValue, setReplaceValue] = useState('');

  const openModalOnMobile = useCallback(() => {
    if (!isMobile) return;
    toggleVisible(true);
  }, [isMobile, toggleVisible]);

  useEffect(() => {
    if (!visible) {
      setSearchValue('');
      setReplaceValue('');
      setCurrentIndex(-1);
      setResults([]);

      editor.commands.setSearchTerm('');
      editor.commands.setReplaceTerm('');
    }
  }, [editor, visible]);

  useEffect(() => {
    if (!visible) return;
    if (editor && editor.commands && editor.commands.setSearchTerm) {
      editor.commands.setSearchTerm(searchValue);
    }
  }, [visible, searchValue, editor]);

  useEffect(() => {
    if (!visible) return;
    if (editor && editor.commands && editor.commands.setReplaceTerm) {
      editor.commands.setReplaceTerm(replaceValue);
    }
  }, [visible, replaceValue, editor]);

  useEffect(() => {
    if (!editor) return;

    const searchExtension = editor.extensionManager.extensions.find(
      (ext) => ext.name === SearchNReplace.name
    );

    if (!searchExtension) return;

    const listener = () => {
      if (!visible) return;

      const currentIndex = searchExtension
        ? searchExtension.storage.currentIndex
        : -1;
      const results = searchExtension ? searchExtension.storage.results : [];
      setCurrentIndex((preIndex) =>
        preIndex !== currentIndex ? currentIndex : preIndex
      );
      setResults((prevResults) =>
        deepEqual(prevResults, results) ? prevResults : results
      );
    };

    editor.eventEmitter && editor.eventEmitter.on(ON_SEARCH_RESULTS, listener);

    return () => {
      if (!searchExtension) return;
      editor.eventEmitter &&
        editor.eventEmitter.off(ON_SEARCH_RESULTS, listener);
    };
  }, [visible, editor]);

  const content = (
    <div style={{ padding: isMobile ? '24px 0' : 0 }}>
      <div style={marginBottomStyle}>
        <Text type="secondary">查找</Text>
        <Input
          autoFocus
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          suffix={results.length ? `${currentIndex + 1}/${results.length}` : ''}
        />
      </div>
      <div style={marginBottomStyle}>
        <Text type="secondary">替换为</Text>
        <Input value={replaceValue} onChange={e => setReplaceValue(e.target.value)} />
      </div>
      <div>
        <Space>
          <Button
            disabled={!results.length}
            onClick={editor.commands.replaceAll}
          >
            全部替换
          </Button>

          <Button disabled={!results.length} onClick={editor.commands.replace}>
            替换
          </Button>

          <Button
            disabled={!results.length}
            onClick={editor.commands.goToPrevSearchResult}
          >
            上一个
          </Button>

          <Button
            disabled={!results.length}
            onClick={editor.commands.goToNextSearchResult}
          >
            下一个
          </Button>
        </Space>
      </div>
    </div>
  );

  const btn = (
    <Tooltip title="查找替换">
      <Button
        type="text"
        icon={<FileSearchOutlined />}
        onMouseDown={openModalOnMobile}
      />
    </Tooltip>
  );

  return (
    <Popover
      showArrow
      zIndex={10000}
      trigger="click"
      placement="bottomRight"
      open={visible}
      onOpenChange={toggleVisible}
      content={content}
    >
      <span>{btn}</span>
    </Popover>
  );
};
