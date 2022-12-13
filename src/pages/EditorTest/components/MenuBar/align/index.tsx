import React, { useCallback, useMemo } from "react"
import { Editor } from "@tiptap/core"
import { useActive } from "../use-active"
import { Dropdown, Tooltip, Button, Menu } from "antd"
import { AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, DashOutlined } from "@ant-design/icons"

export const Align: React.FC<{ editor: Editor }> = ({ editor }) => {
    const isAlignCenter = useActive(editor, { textAlign: 'center' });
    const isAlignLeft = useActive(editor, { textAlign: 'left' });
    const isAlignRight = useActive(editor, { textAlign: 'right' });

    const current = useMemo(() => {
        if (isAlignCenter) {
            return <AlignCenterOutlined />;
        }
        if (isAlignLeft) {
            return <AlignLeftOutlined />;
        }
        if (isAlignRight) {
            return <AlignRightOutlined />;
        }
        return <DashOutlined />;
    }, [isAlignCenter, isAlignLeft, isAlignRight]);

    const toggle = useCallback(
        (align) => {
            return () => editor.chain().focus().setTextAlign(align).run();
        },
        [editor]
    );

    const menu = (
        <Menu items={[
            {
                key: 'left',
                label: (
                    <Tooltip title="左对齐">
                        <Button onClick={toggle('left')} type="text" icon={<AlignLeftOutlined />}></Button>
                    </Tooltip>
                )
            },
            {
                key: 'center',
                label: (
                    <Tooltip title="居中">
                        <Button onClick={toggle('center')} type="text" icon={<AlignCenterOutlined />}></Button>
                    </Tooltip>
                )
            },
            {
                key: 'right',
                label: (
                    <Tooltip title="右对齐">
                        <Button onClick={toggle('right')} type="text" icon={<AlignRightOutlined />}></Button>
                    </Tooltip>
                )
            }
        ]}>
        </Menu>
    );

    return (
        <Dropdown
            trigger={["click"]}
            overlay={menu}
        >
            <Tooltip title="对齐方式">
                <Button type="text" icon={current}></Button>
            </Tooltip>
        </Dropdown>
    );
}