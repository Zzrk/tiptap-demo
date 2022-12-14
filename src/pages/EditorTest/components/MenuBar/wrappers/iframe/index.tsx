import { Typography } from 'antd';
import { NodeViewWrapper } from '@tiptap/react';
import cls from 'classnames';
import { Resizeable } from '../../components/resizeable';
import { useCallback } from 'react';
import { getEditorContainerDOMSize } from '../../prose-utils';

// import styles from './index.module.scss';
import './index.less'

const { Text } = Typography;

export const IframeWrapper = ({ editor, node, updateAttributes }) => {
  const isEditable = editor.isEditable;
  const { url, width, height } = node.attrs;
  const { width: maxWidth } = getEditorContainerDOMSize(editor);

  const onResize = useCallback(
    (size) => {
      updateAttributes({ width: size.width, height: size.height });
    },
    [updateAttributes]
  );

  return (
    <NodeViewWrapper>
      <Resizeable width={width} maxWidth={maxWidth} height={height} isEditable={isEditable} onChangeEnd={onResize}>
        <div className={cls("wrap", 'render-wrapper')}>
          {url ? (
            <div className={"innerWrap"} style={{ pointerEvents: !isEditable ? 'auto' : 'none' }}>
              <iframe src={url}></iframe>
            </div>
          ) : (
            <div className={"emptyWrap"}>
              <Text>请设置外链地址</Text>
            </div>
          )}
        </div>
      </Resizeable>
    </NodeViewWrapper>
  );
};
