import React, { useState } from 'react';
import { Empty, Layout } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import WikiNav from '../WikiNav';
import WikiContent from '../WikiContent';
import editorStore from '@/src/renderer/store/editorStore';
import { useObserver } from 'mobx-react';

const { Sider, Content } = Layout;

const EditorWiki = ({userId}) => {
    const [collapsed, setCollapsed] = useState(false);

    return useObserver(() => (
        <Layout className='flex-1 bg-white'>
            <Sider className='relative' trigger={null} width={240} collapsedWidth={20} theme='light' collapsible collapsed={collapsed}>
                {
                    collapsed ? null : <WikiNav></WikiNav>
                }
                <div onClick={() => setCollapsed(!collapsed)} className='w-6 h-6 flex justify-center items-center absolute -right-3 top-6 text-[#3225e5] bg-gray-100 hover:bg-gray-200 hover:cursor-pointer'>
                    {
                        collapsed ? <RightOutlined /> : <LeftOutlined />
                    }
                </div>
            </Sider>
            <Layout>
                <Content className='bg-white ml-px flex justify-center items-center'>
                    {
                        editorStore.curFileName ? <WikiContent userId={userId}></WikiContent> : <Empty description='当前未选择文档'></Empty>
                    }
                </Content>
            </Layout>
        </Layout>
    ));
};

export default EditorWiki;