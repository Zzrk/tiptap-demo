import { Editor } from '@tiptap/react'
import { Space, Divider } from "antd"
import { Heading } from './heading'
import { FontFamily } from './font-family'
import { FontSize } from './font-size'
import { Bold } from "./bold"
import { Italic } from "./italic"
import { Underline } from "./underline"
import { Strike } from "./strike"
import { Code } from "./code"
import { Superscript } from "./superscript"
import { Subscript } from "./subscript"
import { BulletList } from './bullet-list'
import { OrderedList } from './ordered-list'
import { TaskList } from './task-list'
import { Indent } from './indent'
import { Outdent } from './outdent'
import { Undo } from './undo'
import { Redo } from './redo'
import { ClearNodeAndMarks } from './clear-node-and-marks'
import { Align } from './align'

const MenuBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className='flex justify-center my-5 border-y'>
      <Space className="max-w-full h-12 px-10 gap-1 flex items-center overflow-auto">
        <Undo editor={editor}></Undo>
        <Redo editor={editor}></Redo>
        <ClearNodeAndMarks editor={editor}></ClearNodeAndMarks>

        <Divider type="vertical"></Divider>

        <Heading editor={editor}></Heading>
        <FontFamily editor={editor}></FontFamily>
        <FontSize editor={editor}></FontSize>
        <Bold editor={editor}></Bold>
        <Italic editor={editor}></Italic>
        <Underline editor={editor}></Underline>
        <Strike editor={editor}></Strike>
        <Code editor={editor}></Code>
        <Superscript editor={editor}></Superscript>
        <Subscript editor={editor}></Subscript>

        <Divider type="vertical"></Divider>

        <Align editor={editor}></Align>

        <Divider type="vertical"></Divider>

        <BulletList editor={editor}></BulletList>
        <OrderedList editor={editor}></OrderedList>
        <TaskList editor={editor}></TaskList>
        <Indent editor={editor}></Indent>
        <Outdent editor={editor}></Outdent>
      </Space>
    </div>
  )
}

export default MenuBar