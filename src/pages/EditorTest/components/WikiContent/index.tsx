import { useCallback, useRef } from 'react';
import { message as Toast } from 'antd';
import MenuBar from '../MenuBar';
import { EditorContent, useEditor } from '../MenuBar/core';
import { safeJSONParse } from '../MenuBar/helpers/json';
// 自定义节点扩展
// import { Attachment } from '../MenuBar/extensions/attachment';

// import { BackgroundColor } from '../MenuBar/extensions/background-color';
// import { Blockquote } from '../MenuBar/extensions/blockquote';
// import { Bold } from '../MenuBar/extensions/bold';
// import { BulletList } from '../MenuBar/extensions/bullet-list';
// import { Callout } from '../MenuBar/extensions/callout';
// import { Clipboard } from '../MenuBar/extensions/clipboard';
// import { Code, CodeMarkPlugin } from '../MenuBar/extensions/code';
// import { CodeBlock } from '../MenuBar/extensions/code-block';
// import { Color } from '../MenuBar/extensions/color';
// import { ColorHighlighter } from '../MenuBar/extensions/color-highlighter';
// import { Column } from '../MenuBar/extensions/column';
// import { Columns } from '../MenuBar/extensions/columns';
// import { Countdown } from '../MenuBar/extensions/countdown';


// 基础扩展
// import { Document } from '../MenuBar/extensions/document';
// import { DocumentChildren } from '../MenuBar/extensions/document-children';
// import { DocumentReference } from '../MenuBar/extensions/document-reference';
// import { Dragable } from '../MenuBar/extensions/dragable';
// import { Image } from '../MenuBar/extensions/image';
// import { Mention } from '../MenuBar/extensions/mention';
// import { Paste } from '../MenuBar/extensions/paste';
// import { Status } from '../MenuBar/extensions/status';
// import { Title } from '../MenuBar/extensions/title';

// import { Dropcursor } from '../MenuBar/extensions/dropcursor';
// import { Emoji } from '../MenuBar/extensions/emoji';
// import { EventEmitter } from '../MenuBar/extensions/event-emitter';
// import { Excalidraw } from '../MenuBar/extensions/excalidraw';
// import { Flow } from '../MenuBar/extensions/flow';
// import { Focus } from '../MenuBar/extensions/focus';
// import { FontSize } from '../MenuBar/extensions/font-size';
// import { Gapcursor } from '../MenuBar/extensions/gapcursor';
// import { HardBreak } from '../MenuBar/extensions/hard-break';
// import { Heading } from '../MenuBar/extensions/heading';
// import { HorizontalRule } from '../MenuBar/extensions/horizontal-rule';
// import { HTMLMarks } from '../MenuBar/extensions/html-marks';
// import { Iframe } from '../MenuBar/extensions/iframe';
// import { Indent } from '../MenuBar/extensions/indent';
// import { Italic } from '../MenuBar/extensions/italic';
// import { Katex } from '../MenuBar/extensions/katex';
// import { Link } from '../MenuBar/extensions/link';
// import { ListItem } from '../MenuBar/extensions/listItem';
// import { Loading } from '../MenuBar/extensions/loading';
// import { Mind } from '../MenuBar/extensions/mind';
// import { OrderedList } from '../MenuBar/extensions/ordered-list';
// import { Paragraph } from '../MenuBar/extensions/paragraph';
// import { Placeholder } from '../MenuBar/extensions/placeholder';
// import { QuickInsert } from '../MenuBar/extensions/quick-insert';
// import { SearchNReplace } from '../MenuBar/extensions/search';
// import { SelectionExtension } from '../MenuBar/extensions/selection';
// import { Strike } from '../MenuBar/extensions/strike';
// import { Subscript } from '../MenuBar/extensions/subscript';
// import { Superscript } from '../MenuBar/extensions/superscript';
// import { Table } from '../MenuBar/extensions/table';
// import { TableCell } from '../MenuBar/extensions/table-cell';
// import { TableHeader } from '../MenuBar/extensions/table-header';
// import { TableOfContents } from '../MenuBar/extensions/table-of-contents';
// import { TableRow } from '../MenuBar/extensions/table-row';
// import { TaskItem } from '../MenuBar/extensions/task-item';
// import { TaskList } from '../MenuBar/extensions/task-list';
// import { Text } from '../MenuBar/extensions/text';
// import { TextAlign } from '../MenuBar/extensions/text-align';
// import { TextStyle } from '../MenuBar/extensions/text-style';
// import { TrailingNode } from '../MenuBar/extensions/trailing-node';
// import { Underline } from '../MenuBar/extensions/underline';


// markdown 支持
// import { htmlToProsemirror } from '../MenuBar/markdown/html-to-prosemirror';
// import { markdownToHTML, markdownToProsemirror } from '../MenuBar/markdown/markdown-to-prosemirror';
// import { prosemirrorToMarkdown } from '../MenuBar/markdown/prosemirror-to-markdown';

import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { FontSize } from '../MenuBar/extensions/font-size';
import { Indent } from '../MenuBar/extensions/indent';
import { SearchNReplace } from '../MenuBar/extensions/search';
import { Link } from '../MenuBar/extensions/link';
import { Emoji } from '../MenuBar/extensions/emoji';
import { TableOfContents } from '../MenuBar/extensions/table-of-contents';
import { Column } from '../MenuBar/extensions/column';
import { Columns } from '../MenuBar/extensions/columns';
import { Code, CodeMarkPlugin } from '../MenuBar/extensions/code';
import { CodeBlock } from '../MenuBar/extensions/code-block';

// import editorStore from '@/src/renderer/store/editorStore';
// import './index.less'
import '../MenuBar/styles/index.less';

const placeholders = [
  '输入 / 唤起更多',
  '使用 markdown 语法进行输入',
  '输入 @ 来提及他人',
  '输入 : 来插入表情',
  '你知道吗？输入 $katex 然后在输入一个 $ 就可以快速插入数学公式，其他节点操作类似哦',
];
const getCreateUserId = () =>
  safeJSONParse(window.localStorage.getItem('user')).id;

export default () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: '',
      },
    },
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'right', 'center'],
        defaultAlignment: 'left',
      }),
      Underline,
      TaskList,
      Superscript,
      Subscript,
      BulletList,
      OrderedList,
      ListItem,
      Heading,
      TextStyle,
      Blockquote,
      TaskItem.configure({
        nested: true,
      }),
      Indent,
      FontSize,
      SearchNReplace,
      Link,
      Emoji,
      TableOfContents,
      Column,
      Columns,
      Code,
      CodeMarkPlugin,
      CodeBlock

      // Paragraph,
      // Placeholder.configure({
      //   placeholder: ({ node, editor }) => {
      //     if (node.type.name === 'title') {
      //       return editor.isEditable ? '请输入标题' : '未命名文档';
      //     }

      //     if (!editor.isEditable) return;

      //     return placeholders[~~(Math.random() * placeholders.length)];
      //   },
      //   showOnlyCurrent: false,
      //   showOnlyWhenEditable: false,
      // }),
      // BackgroundColor,
      // Blockquote,
      // Bold,
      // BulletList,
      // Code,
      // CodeMarkPlugin,
      // CodeBlock,
      // Color,
      // ColorHighlighter,
      // Column,
      // Columns,
      // Dropcursor.configure({
      //   width: 2,
      //   class: 'dropcursor',
      //   color: 'skyblue',
      // }),
      // Excalidraw,
      // EventEmitter,
      // Focus,
      // FontSize,
      // Gapcursor,
      // HardBreak,
      // Heading,
      // HorizontalRule,
      // ...HTMLMarks,
      // Indent,
      // Italic,
      // Link,
      // ListItem,
      // Loading,
      // OrderedList,
      // Strike,
      // Subscript,
      // Superscript,
      // Table,
      // TableCell,
      // TableHeader,
      // TableRow,
      // Text,
      // TextAlign,
      // TextStyle,
      // TaskItem,
      // TaskList,
      // TrailingNode,
      // Underline,
      // Callout,
      // Countdown,
      // Emoji,
      // Flow.configure({
      //   getCreateUserId,
      // }),
      // Iframe,
      // Katex.configure({
      //   getCreateUserId,
      // }),
      // Mind.configure({
      //   getCreateUserId,
      // }),
      // QuickInsert,
      // SearchNReplace,
      // TableOfContents.configure({
      //   onHasOneBeforeInsert: () => {
      //     Toast.info('目录已存在');
      //   },
      // }),

      // Image,
      // SelectionExtension,
      // Paste.configure({
      //   htmlToProsemirror,
      //   markdownToHTML,
      //   markdownToProsemirror,
      //   prosemirrorToMarkdown,
      // }),
      // Attachment,
      // DocumentChildren,
      // DocumentReference,
      // Mention,
      // Status,
      // Clipboard.configure({
      //   prosemirrorToMarkdown,
      // }),
      // Title,
      // DocumentWithTitle,
      // Dragable,
    ],
    content: `
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
    display: none;
  }</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,
  });

  return (
    <div className="w-full h-full flex flex-col">
      <MenuBar editor={editor} />
      <EditorContent className="w-full flex-1 overflow-auto" editor={editor} />
    </div>
  );
};
