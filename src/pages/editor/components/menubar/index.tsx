import { Editor } from '@tiptap/react'
import { Space, Divider } from "antd"
import { Bold } from "./bold"
import { Italic } from "./italic"
import { Underline } from "./underline"
import { Strike } from "./strike"
import { Code } from "./code"
import { Superscript } from "./superscript"
import { Subscript } from "./subscript"

const MenuBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex justify-center border-b border-[rgba(28,31,35,.2)] my-5'>
      <Space className="max-w-full h-12 px-10 gap-1 flex items-center overflow-auto">
        <Bold editor={editor}></Bold>
        <Italic editor={editor}></Italic>
        <Underline editor={editor}></Underline>
        <Strike editor={editor}></Strike>
        <Code editor={editor}></Code>
        <Superscript editor={editor}></Superscript>
        <Subscript editor={editor}></Subscript>
      </Space>
    </div>
  )
}

export default MenuBar