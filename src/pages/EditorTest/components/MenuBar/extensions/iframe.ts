// import { IUser } from '../domains/lib';
import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { IframeWrapper } from '../wrappers/iframe';
import { getDatasetAttribute } from '../prose-utils';

enum UserStatus {
  normal = "normal",
  locked = "locked"
}

interface IUser {
  id: string;
  name: string;
  password?: string;
  avatar?: string;
  email?: string;
  status: UserStatus;
  isSystemAdmin?: boolean;
}
export interface IIframeAttrs {
  width?: number | string;
  height?: number;
  url?: string;
  defaultShowPicker?: boolean;
  createUser?: IUser['id'];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframe: {
      setIframe: (attrs: IIframeAttrs) => ReturnType;
    };
  }
}

export const Iframe = Node.create({
  name: 'iframe',
  content: '',
  marks: '',
  group: 'block',
  selectable: true,
  atom: true,
  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'iframe',
      },
    };
  },

  addAttributes() {
    return {
      width: {
        default: '100%',
        parseHTML: getDatasetAttribute('width'),
      },
      height: {
        default: 66,
        parseHTML: getDatasetAttribute('height'),
      },
      url: {
        default: null,
        parseHTML: getDatasetAttribute('url'),
      },
      defaultShowPicker: {
        default: false,
      },
      createUser: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['iframe', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      setIframe:
        (options) =>
        ({ tr, commands, chain, editor }) => {
          // @ts-ignore
          if (tr.selection?.node?.type?.name == this.name) {
            return commands.updateAttributes(this.name, options);
          }

          const attrs = options || { url: '' };
          const { selection } = editor.state;

          return chain()
            .insertContent({
              type: this.name,
              attrs,
            })
            .run();
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^\$iframe\$$/,
        type: this.type,
        getAttributes: () => {
          return { width: '100%' };
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(IframeWrapper);
  },
});
