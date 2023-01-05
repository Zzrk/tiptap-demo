import { Editor } from '@tiptap/react';
import { useToggle } from 'ahooks';
import { useEffect } from 'react';

export const useActive = (editor: Editor, ...args) => {
  const [active, { set: toggleActive }] = useToggle(false);

  useEffect(() => {
    const listener = () => {
      toggleActive(editor.isActive.apply(editor, args));
    };

    editor.on('selectionUpdate', listener);
    editor.on('transaction', listener);

    return () => {
      editor.off('selectionUpdate', listener);
      editor.off('transaction', listener);
    };
  }, [editor, args, toggleActive]);

  return active;
};
