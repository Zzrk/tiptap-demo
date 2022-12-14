import { Dropdown, Menu, Popover } from 'antd';
import { GridSelect } from '../components/grid-select';
import {
  PaperClipOutlined,
  BulbOutlined,
  CodeOutlined,
  HourglassOutlined,
  FileOutlined,
  PartitionOutlined,
  FileImageOutlined,
  LayoutOutlined,
  LinkOutlined,
  FunctionOutlined,
  ShareAltOutlined,
  TagOutlined ,
  TableOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { createKeysLocalStorageLRUCache } from '../helpers/lru-cache';
import { Editor } from '../core';

import { createCountdown } from './countdown/service';

export type ITitle = {
  title: string;
};

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

type IBaseCommand = {
  isBlock?: boolean;
  icon: React.ReactNode;
  label: string;
  user?: IUser;
};

type IAction = (editor: Editor, user?: IUser) => void;

export type ILabelRenderCommand = IBaseCommand & {
  action: IAction;
};

type ICustomRenderCommand = IBaseCommand & {
  custom: (editor: Editor, runCommand: (arg: { label: string; action: IAction }) => any) => React.ReactNode;
};

export type ICommand = ITitle | ILabelRenderCommand | ICustomRenderCommand;

export const insertMenuLRUCache = createKeysLocalStorageLRUCache('TIPTAP_INSERT_MENU', 3);

export const COMMANDS: ICommand[] = [
  {
    title: '通用',
  },
  {
    icon: <ProfileOutlined />,
    label: '目录',
    action: (editor) => editor.chain().focus().setTableOfContents().run(),
  },
  // {
  //   isBlock: true,
  //   icon: <TableOutlined />,
  //   label: '表格',
  //   custom: (editor, runCommand) => (
  //     <Popover
  //       key="custom-table"
  //       showArrow
  //       placement="rightTop"
  //       zIndex={10000}
  //       content={
  //         <div style={{ padding: 0 }}>
  //           <GridSelect
  //             onSelect={({ rows, cols }) => {
  //               return runCommand({
  //                 label: '表格',
  //                 action: () => {
  //                   editor.chain().focus().run();
  //                   editor.chain().insertTable({ rows, cols, withHeaderRow: true }).focus().run();
  //                 },
  //               })();
  //             }}
  //           />
  //         </div>
  //       }
  //     >
  //       <Menu.Item>
  //         <TableOutlined />
  //         表格
  //       </Menu.Item>
  //     </Popover>
  //   ),
  // },
  {
    isBlock: true,
    icon: <LayoutOutlined />,
    label: '布局',
    custom: (editor, runCommand) => (
      <Popover
        key="custom-columns"
        showArrow
        placement="rightTop"
        zIndex={10000}
        content={
          <div style={{ padding: 0 }}>
            <GridSelect
              rows={1}
              cols={5}
              onSelect={({ cols }) => {
                return runCommand({
                  label: '布局',
                  action: () => {
                    editor.chain().focus().run();
                    editor.chain().insertColumns({ cols }).focus().run();
                  },
                })();
              }}
            />
          </div>
        }
      >
        <Menu.Item icon={<LayoutOutlined />}>
          布局
        </Menu.Item>
      </Popover>
    ),
  },
  {
    isBlock: true,
    icon: <CodeOutlined />,
    label: '代码块',
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
  // {
  //   isBlock: true,
  //   icon: <FileImageOutlined />,
  //   label: '图片',
  //   action: (editor) => editor.chain().focus().setEmptyImage({ width: '100%' }).run(),
  // },
  // {
  //   isBlock: true,
  //   icon: <PaperClipOutlined />,
  //   label: '附件',
  //   action: (editor) => editor.chain().focus().setAttachment().run(),
  // },
  {
    isBlock: true,
    icon: <HourglassOutlined />,
    label: '倒计时',
    action: (editor) => createCountdown(editor),
  },
  // {
  //   isBlock: true,
  //   icon: <LinkOutlined />,
  //   label: '外链',
  //   action: (editor, user) =>
  //     editor.chain().focus().setIframe({ url: '', defaultShowPicker: true, createUser: user.id }).run(),
  // },
  // {
  //   title: '卡片',
  // },
  // {
  //   isBlock: true,
  //   icon: <PartitionOutlined />,
  //   label: '流程图',
  //   action: (editor, user) => {
  //     editor.chain().focus().setFlow({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
  //   },
  // },
  // {
  //   isBlock: true,
  //   icon: <ShareAltOutlined />,
  //   label: '思维导图',
  //   action: (editor, user) => {
  //     editor.chain().focus().setMind({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
  //   },
  // },
  // {
  //   isBlock: true,
  //   icon: <ShareAltOutlined />,
  //   label: '绘图',
  //   action: (editor, user) => {
  //     editor.chain().focus().setExcalidraw({ width: '100%', defaultShowPicker: true, createUser: user.id }).run();
  //   },
  // },
  // {
  //   isBlock: true,
  //   icon: <FunctionOutlined />,
  //   label: '数学公式',
  //   action: (editor, user) => editor.chain().focus().setKatex({ defaultShowPicker: true, createUser: user.id }).run(),
  // },
  // {
  //   icon: <TagOutlined />,
  //   label: '状态',
  //   action: (editor, user) => editor.chain().focus().setStatus({ defaultShowPicker: true, createUser: user.id }).run(),
  // },
  // {
  //   isBlock: true,
  //   icon: <BulbOutlined />,
  //   label: '高亮块',
  //   action: (editor) => editor.chain().focus().setCallout().run(),
  // },
  // {
  //   title: '内容引用',
  // },
  // {
  //   isBlock: true,
  //   icon: <FileOutlined />,
  //   label: '文档',
  //   action: (editor, user) =>
  //     editor.chain().focus().setDocumentReference({ defaultShowPicker: true, createUser: user.id }).run(),
  // },
  // {
  //   isBlock: true,
  //   icon: <FileOutlined />,
  //   label: '子文档',
  //   action: (editor) => editor.chain().focus().setDocumentChildren().run(),
  // },
];

export const QUICK_INSERT_COMMANDS = [
  ...COMMANDS.slice(0, 1),
  {
    icon: <TableOutlined />,
    label: '表格',
    action: (editor: Editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    isBlock: true,
    icon: <LayoutOutlined />,
    label: '布局',
    action: (editor) => editor.chain().focus().insertColumns({ cols: 2 }).run(),
  },
  ...COMMANDS.slice(4),
];

export const transformToCommands = (commands, data: string[]) => {
  return (data || [])
    .map((label) => {
      return commands.find((command) => {
        if ('title' in command) {
          return false;
        }

        return command.label === label;
      });
    })
    .filter(Boolean);
};
