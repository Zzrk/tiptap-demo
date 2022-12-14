import { Space, Typography } from 'antd';
import { NodeViewWrapper } from '@tiptap/react';
import cls from 'classnames';
import ReactCountdown from 'react-countdown';

// import styles from './index.module.scss';
import './index.less'

const { Text, Title } = Typography;

const renderer = (props) => {
  const { completed, formatted } = props;
  const { days, hours, minutes, seconds } = formatted;

  if (completed) {
    return <Title level={4}>已结束</Title>;
  } else {
    return (
      <Space align="baseline">
        <Title level={2}>{days}</Title>
        <Text style={{ transform: `translateY(-2px)` }}>
          / 天
        </Text>
        <Title level={3}>
          {hours}:{minutes}:{seconds}
        </Title>
      </Space>
    );
  }
};

export const CountdownWrapper = ({ editor, node }) => {
  const { title, date } = node.attrs;

  return (
    <NodeViewWrapper>
      <div className={cls("wrap", 'render-wrapper')}>
        <Text>{title}</Text>
        <ReactCountdown date={date} renderer={renderer}></ReactCountdown>
      </div>
    </NodeViewWrapper>
  );
};
