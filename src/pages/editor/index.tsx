import MenuBar from './components/menubar';
import { EditorContent, useEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import TextStyle from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Color from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Youtube from '@tiptap/extension-youtube'
import { FontSize } from '@/tiptap/extensions/font-size'
import { Indent } from '@/tiptap/extensions/indent';
import { BackgroundColor } from '@/tiptap/extensions/background-color';
import './semi.min.css'
import './styles/index.less'

export default () => {
  const editor = useEditor({
    extensions: [
      Document.extend({
        content: 'heading block*'
      }),
      StarterKit.configure({
        document: false,
      }),
      Underline,
      Superscript,
      Subscript,
      TextStyle,
      FontFamily,
      FontSize,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Indent,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'What’s the title?'
          }

          return 'Can you add some further context?'
        },
      }),
      Image.configure({
        allowBase64: true
      }),
      Color,
      BackgroundColor,
      Link,
      Youtube
    ],
    content: `
        <h1>
          It’ll always have a heading …
        </h1>
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
    <div className="w-screen h-screen flex flex-col">
      <MenuBar editor={editor} />
      <EditorContent className="w-full flex-1 border-y overflow-auto" editor={editor} />
    </div>
  );
};