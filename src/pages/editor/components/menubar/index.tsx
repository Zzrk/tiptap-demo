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
import { HorizontalRule } from './horizontal-rule'
import { Blockquote } from './blockquote'
import { UploadImage } from './upload-image'
import { TextColor } from './text-color'
import { BackgroundColor } from './background-color'
import { Link } from './link'
import { Youtube } from './youtube'

const MenuBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <Space className="px-10 py-2 my-5 border-y gap-1 flex items-center justify-center flex-wrap">
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
      <TextColor editor={editor}></TextColor>
      <BackgroundColor editor={editor}></BackgroundColor>

      <Divider type="vertical"></Divider>

      <Align editor={editor}></Align>

      <Divider type="vertical"></Divider>

      <BulletList editor={editor}></BulletList>
      <OrderedList editor={editor}></OrderedList>
      <TaskList editor={editor}></TaskList>
      <Indent editor={editor}></Indent>
      <Outdent editor={editor}></Outdent>

      <Divider type="vertical"></Divider>

      <Blockquote editor={editor}></Blockquote>
      <Link editor={editor}></Link>
      <HorizontalRule editor={editor}></HorizontalRule>
      <UploadImage editor={editor}></UploadImage>
      <Youtube editor={editor}></Youtube>
    </Space>
  )
}

export default MenuBar