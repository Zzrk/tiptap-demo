import { useState } from "react";
import { Button, Card, Avatar, Empty, Modal, Input } from "antd"
import { openNotification } from '@/components/CToast';
import { useLocalStorageState } from 'ahooks';
import editorStore from "@/src/renderer/store/editorStore"
import to from 'await-to-js';
const { Meta } = Card

const EditorLibs = ({handleWikiClick}) => {
    const [userId] = useLocalStorageState<string | undefined>('userId');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wikiName, setWikiName] = useState('')

    /**
     * Author: zhaorongkai
     * Date: 2022-12-12
     * Todo: 打开对话框
    **/
    const showModal = () => {
        setIsModalOpen(true)
    }
    /**
     * Author: zhaorongkai
     * Date: 2022-12-12
     * Todo: 确认对话框
    **/
    const handleOk = async () => {
        if (!wikiName) {
            return openNotification({ type: 'fail', message: '知识库名称不能为空' })
        } else if (editorStore.wikiNames.includes(wikiName)) {
            return openNotification({ type: 'fail', message: '知识库名称重复' })
        }
        window.__CTP_IPC__.ipcSend("create:knowledgeBase", userId, wikiName)
        editorStore.addWikiName(wikiName)
        setIsModalOpen(false)
        setWikiName('')
    }
    /**
     * Author: zhaorongkai
     * Date: 2022-12-12
     * Todo: 取消对话框
    **/
    const handleCancel = () => {
        setIsModalOpen(false)
        setWikiName('')
    }

    return <div className="bg-white flex-1 px-40">
        <div className="flex justify-between items-center h-20">
            <span className="text-2xl font-bold">快捷访问</span>
            <Button onClick={showModal}>创建知识库</Button>
        </div>
        <div className="flex flex-wrap justify-between gap-y-10">
            {
                editorStore.wikiNames.length ? editorStore.wikiNames.map(wikiName => (
                    <Card onClick={() => handleWikiClick(wikiName)} key={wikiName} className="w-64" hoverable>
                        <Meta className="flex flex-col" title={wikiName} avatar={
                            <Avatar shape="square" className="bg-orange-500 mb-2">{wikiName.slice(0, 2)}</Avatar>
                        }></Meta>
                    </Card>
                )) : (
                    <Empty>创建的知识库会出现在此处</Empty>
                )
            }
        </div>
        <Modal bodyStyle={{ paddingInline: 60 }} title="创建知识库" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Input placeholder="请输入知识库名称" value={wikiName} onChange={e => setWikiName(e.target.value)}></Input>
        </Modal>
    </div>
}

export default EditorLibs