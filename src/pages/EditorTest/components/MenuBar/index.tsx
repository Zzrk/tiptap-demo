import { Editor } from '../MenuBar/core'
import { Space, Divider } from "antd"
import { Align } from "./align"
import { Redo } from "./redo"
import { Undo } from "./undo"
import { CleadrNodeAndMarks } from "./clear-node-and-marks"
import { Bold } from "./bold"
import { Italic } from "./italic"
import { Underline } from "./underline"
import { Strike } from "./strike"
import { Code } from "./code"
import { Superscript } from "./superscript"
import { Subscript } from "./subscript"
import { OrderedList } from "./ordered-list"
import { BulletList } from "./bullet-list"
import { TaskList } from "./task-list"
import { Indent } from "./indent"
import { Outdent } from "./outdent"
import { Heading } from "./heading"
import { FontSize } from "./fontsize"
import { Blockquote } from "./blockquote"
import { HorizontalRule } from "./horizontal-rule"
import { Search } from './search'
import { Link } from './link'
import { Emoji } from './emoji'

const MenuBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <Space className="w-full h-16 flex justify-between items-center overflow-auto my-4 mt-10">
      <Undo editor={editor}></Undo>
      <Redo editor={editor}></Redo>
      <CleadrNodeAndMarks editor={editor}></CleadrNodeAndMarks>
      <Divider type="vertical"></Divider>
      <Heading editor={editor}></Heading>
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
      <Divider type="vertical"></Divider>
      <Emoji editor={editor}></Emoji>
      <Blockquote editor={editor}></Blockquote>
      <Link editor={editor}></Link>
      <HorizontalRule editor={editor}></HorizontalRule>
      <Search editor={editor}></Search>
    </Space>
  )
}

export default MenuBar