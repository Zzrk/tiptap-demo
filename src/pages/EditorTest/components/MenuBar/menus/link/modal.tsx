import { Form, Modal, Input } from 'antd';
import { useToggle } from 'ahooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Editor } from '../../core';
import { isValidURL } from '../../prose-utils';

import { cancelSubject, OPEN_LINK_SETTING_MODAL, subject } from '../_event';

type IProps = { editor: Editor };

export const LinkSettingModal: React.FC<IProps> = ({ editor }) => {
  const [$form] = Form.useForm();
  const [initialState, setInitialState] = useState({ text: '', href: '', from: -1, to: -1 });
  const [visible, { set: toggleVisible }] = useToggle(false);

  const handleCancel = useCallback(() => toggleVisible(false), [toggleVisible]);

  const handleOk = useCallback(() => {
    $form.validateFields().then((values) => {
      if (!values.text) {
        values.text = values.href;
      }

      const { from, to } = initialState;
      const { view } = editor;
      const schema = view.state.schema;
      const node = schema.text(values.text, [schema.marks.link.create({ href: values.href })]);

      view.dispatch(view.state.tr.deleteRange(from, to));
      view.dispatch(view.state.tr.insert(from, node));
      view.dispatch(view.state.tr.scrollIntoView());
      toggleVisible(false);
    });
  }, [initialState, editor, toggleVisible]);

  useEffect(() => {
    const handler = (data) => {
      toggleVisible(true);
      data && setInitialState(data);
    };

    subject(editor, OPEN_LINK_SETTING_MODAL, handler);

    return () => {
      cancelSubject(editor, OPEN_LINK_SETTING_MODAL, handler);
    };
  }, [editor, toggleVisible]);

  return (
    <Modal
      title="编辑链接"
      style={{ maxWidth: '96vw' }}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered
    >
      <Form form={$form} initialValues={initialState}  labelAlign="left">
        <Form.Item name="text" label="文本"><Input placeholder="请输入文本" /></Form.Item>
        <Form.Item
          name="href"
          label="链接"
          rules={[{ validator: (_, value) => isValidURL(value) ? Promise.resolve() : Promise.reject(new Error('请输入有效链接')) }]}
        >
          <Input placeholder="请输入外链地址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
