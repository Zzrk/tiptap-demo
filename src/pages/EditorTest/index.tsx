/**
 * Author: zhaorongkai
 * Date: 2022-12-09
 * FileName: 知识库Test
**/
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import EditorHeader from './components/EditorHeader';
import { TeamWorkIllustration } from './components/TeamWork/team-work';
import EditorLibs from './components/EditorLibs';
import EditorWiki from './components/EditorWiki';
import editorStore from '../../store/editorStore';
import { useLocalStorageState } from 'ahooks';
import to from 'await-to-js';
import './index.less'

const Editor = () => {
  const [userId] = useLocalStorageState<string | undefined>('userId');
  const [showEditorLibs, setShowEditorLibs] = useState(false)
  const [showEditorWiki, setShowEditorWiki] = useState(false)

  useEffect(() => {
    if (userId && !editorStore.wikiNames.length) {
      getKnowledgeBases(userId)
    }
  }, [])

  /**
   * Author: zhaorongkai
   * Date: 2022-12-12
   * Todo: 获取知识库
  **/
  const getKnowledgeBases = async (userId) => {
    const [err, res] = await to(window.__CTP_IPC__.invoke("get:knowledgeBase", userId))
    if (err) {
      console.log(err)
      return
    }
    for (const wikiName of res) {
      editorStore.addWikiName(wikiName)
    }
  }

  const handleHeaderClick = () => {
    if (showEditorWiki) {
      return setShowEditorWiki(false)
    }
    if (showEditorLibs) {
      return setShowEditorLibs(false)
    }
  }
  const handleWikiClick = (wikiName) => {
    setShowEditorWiki(true)
    editorStore.setCurWikiName(wikiName)
  }

  return (
    <div className='h-full flex flex-col'>
      <EditorHeader handleHeaderClick={handleHeaderClick}></EditorHeader>
      {
        showEditorLibs ? (
          showEditorWiki ? <EditorWiki userId={userId}></EditorWiki> :
            <EditorLibs handleWikiClick={handleWikiClick}></EditorLibs>
        ) :
          <div className='flex justify-center items-center bg-white flex-1 text-sm'>
            <div className='w-1/3'>
              <div className='text-4xl font-bold mb-4'>催化剂加 CatalystPlus</div>
              <div className='mb-2'>这是一款全新的知识管理工具····</div>
              <div className='text-gray-400 mb-4'>“注意：目前为测试版本，相关数据可能会有丢失风险。正式版正在开发中！</div>
              <Button type='primary' onClick={() => setShowEditorLibs(true)}>开始写作</Button>
            </div>
            <div className='w-1/2'>
              <TeamWorkIllustration></TeamWorkIllustration>
            </div>
          </div>
      }
    </div>
  );
};

export default Editor;
