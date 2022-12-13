import { useEffect, useState } from 'react'
import { Dropdown, Modal, Input, Space, Avatar } from "antd"
import { CaretDownFilled, PlusOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import editorStore from '@/src/renderer/store/editorStore'
import { useObserver } from 'mobx-react';
import { useLocalStorageState } from 'ahooks';
import { openNotification } from '@/components/CToast';

import to from 'await-to-js'

const WikiNav = () => {
    const [userId] = useLocalStorageState<string | undefined>('userId');
    const [menuItems, setMenuItems] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileName, setFileName] = useState('')

    useEffect(() => {
        setMenuItems(editorStore.wikiNames.map(wikiName => ({
            label: wikiName,
            key: wikiName,
            icon: <Avatar shape="square">{wikiName.slice(0, 2)}</Avatar>
        })))
    }, [editorStore.wikiNames])

    useEffect(() => {
        getFileByDir()
    }, [editorStore.curWikiName])

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
        if (!fileName) {
            return openNotification({ type: 'fail', message: '知识库名称不能为空' })
        } else if (fileList.includes(fileName)) {
            return openNotification({ type: 'fail', message: '知识库名称重复' })
        }
        window.__CTP_IPC__.ipcPostSend("create:files", {
            userId,
            wikiName: editorStore.curWikiName,
            fileName
          })
        setFileList([...fileList, fileName])
        setIsModalOpen(false)
        setFileName('')
        openNotification({ type: 'success', message: '创建成功' })
    }

    /**
     * Author: zhaorongkai
     * Date: 2022-12-12
     * Todo: 取消对话框
    **/
    const handleCancel = () => {
        setIsModalOpen(false)
        setFileName('')
    }

    /**
     * Author: zhaorongkai
     * Date: 2022-12-12
     * Todo: 根据wikiName获取对应文件夹下的json文件
    **/
    const getFileByDir = async () => {
        const [err, res] = await to(window.__CTP_IPC__.invoke("get:filesByWikiName", {
            userId,
            wikiName: editorStore.curWikiName
        }))
        if (err) {
            console.log(err)
            return
        }
        setFileList(res.map(fileName => fileName?.split('.')[0] || ''))
    }

    /**
     * Author: zhaorongkai
     * Date: 2022-12-12
     * Todo: 下拉框点击事件
    **/
    const handleMenuClick: MenuProps['onClick'] = (e) => {
        editorStore.setCurWikiName(e.key)
        editorStore.setCurFileName('')
    };

    return useObserver(() => (
        <div>
            <Dropdown className='cursor-pointer mt-5' trigger={['click']} menu={{ items: menuItems, onClick: handleMenuClick }}>
                <div className='flex justify-between items-center px-3 py-1 hover:bg-[#f5f5f5]'>
                    <Space>
                        <Avatar size={48} shape="square" className='bg-orange-500'>{editorStore.curWikiName.slice(0, 2)}</Avatar>
                        {editorStore.curWikiName}
                    </Space>
                    <CaretDownFilled />
                </div>
            </Dropdown>
            <div className='flex justify-between items-center px-3 py-4 text-xs'>
                <span>文档集</span>
                <PlusOutlined onClick={() => setIsModalOpen(true)} className='cursor-pointer'/>
            </div>
            <div>
                {
                    fileList.length ? fileList.map(fileName => (
                        <div onClick={() => editorStore.setCurFileName(fileName)} key={fileName} style={editorStore.curFileName === fileName ? {backgroundColor: '#f5f5f5'} : {}} className='pl-6 h-8 leading-8 cursor-pointer hover:bg-[#f5f5f5]'>{fileName?.split('.')[0] || ''}</div>
                    )) : <div className='text-xs text-center text-gray-500 cursor-not-allowed'>暂无数据</div>
                }
            </div>
            <Modal bodyStyle={{ paddingInline: 60 }} title="创建空白文件" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="请输入文件名称" value={fileName} onChange={e => setFileName(e.target.value)}></Input>
            </Modal>
        </div>
    ))
}

export default WikiNav