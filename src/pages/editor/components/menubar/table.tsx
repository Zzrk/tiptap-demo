import { TableOutlined } from '@ant-design/icons';
import { Button, Tooltip, Modal, Input, Form } from 'antd';
import { Editor, BubbleMenu } from '@tiptap/react';

const { confirm } = Modal;

export const Table: React.FC<{ editor: Editor }> = ({ editor }) => {
  const [form] = Form.useForm();

  const showConfirm = () => {
    confirm({
      title: '插入表格',
      icon: null,
      onOk: async () => {
        try {
          const { rows, cols } = await form.validateFields();
          editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run()
        } catch (errorInfo) {
          return Promise.reject(errorInfo)
        }
      },
      content: (
        <Form
          form={form}
          labelCol={{ span: 6 }}
          className="pt-5"
          initialValues={{ rows: 3, cols: 3 }}
        >
          <Form.Item
            label="Rows"
            name="rows"
            rules={[{ required: true, message: 'Please input table rows!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cols"
            name="cols"
            rules={[{ required: true, message: 'Please input table cols!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      )
    })
  }

  return (
    <>
      <Tooltip title="插入表格" className="shrink-0">
        <Button
          className="flex justify-center items-center"
          onClick={showConfirm}
          icon={<TableOutlined />}
          type="text"
          disabled={false}
        />
      </Tooltip>
      {/* <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          Strike
        </button>
      </BubbleMenu> */}
    </>
  );
};
