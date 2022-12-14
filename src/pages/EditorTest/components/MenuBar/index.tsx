import { Editor } from '../MenuBar/core'
import { Space, Divider } from "antd"
import { Align } from "./menus/align"
import { Redo } from "./menus/redo"
import { Undo } from "./menus/undo"
import { CleadrNodeAndMarks } from "./menus/clear-node-and-marks"
import { Bold } from "./menus/bold"
import { Italic } from "./menus/italic"
import { Underline } from "./menus/underline"
import { Strike } from "./menus/strike"
import { Code } from "./menus/code"
import { Superscript } from "./menus/superscript"
import { Subscript } from "./menus/subscript"
import { OrderedList } from "./menus/ordered-list"
import { BulletList } from "./menus/bullet-list"
import { TaskList } from "./menus/task-list"
import { Indent } from "./menus/indent"
import { Outdent } from "./menus/outdent"
import { Heading } from "./menus/heading"
import { FontSize } from "./menus/fontsize"
import { Blockquote } from "./menus/blockquote"
import { HorizontalRule } from "./menus/horizontal-rule"
import { Search } from './menus/search'
import { Link } from './menus/link'
import { Emoji } from './menus/emoji'
import { Insert } from './menus/insert'

const MenuBar: React.FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <Space className="w-full h-16 flex justify-between items-center overflow-auto my-4 mt-10">

      <Insert editor={editor}></Insert>

      <Divider type="vertical"></Divider>

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