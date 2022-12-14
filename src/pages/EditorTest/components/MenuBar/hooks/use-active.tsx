import { Editor } from '../core';
import { useToggle } from 'ahooks';
import React, { useEffect } from 'react';

export const useActive = (editor: Editor, ...args) => {
  const [active, { set: toggleActive }] = useToggle(false);

  useEffect(() => {
    const listener = () => {
      // eslint-disable-next-line prefer-spread
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
