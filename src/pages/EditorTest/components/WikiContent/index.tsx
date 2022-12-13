import { useCallback, useRef } from 'react';
// import editorStore from '@/src/renderer/store/editorStore';
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
import { EditorContent, useEditor } from '../MenuBar/core';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from '../MenuBar';
import { FontSize } from '../MenuBar/extensions/font-size';
import { Indent } from '../MenuBar/extensions/indent';
import { SearchNReplace } from '../MenuBar/extensions/search';
import { Link } from '../MenuBar/extensions/link';
import { Emoji } from '../MenuBar/extensions/emoji';
// import './index.less'
import '../MenuBar/styles/index.less';

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
      // History,
      // Document,
      // Paragraph,
      // Text,
      // BulletList,
      // ListItem
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
