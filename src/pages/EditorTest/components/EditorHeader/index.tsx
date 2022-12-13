/**
 * Author: zhaorongkai
 * Date: 2022-12-09
 * FileName: 编辑器头部
 **/
import React from 'react';

const EditorHeader = ({handleHeaderClick}) => {
  return (
    <div className="w-full flex justify-between	items-center bg-[#fff] px-10 py-4 font-semibold border-b-[1px] border-[rgba(28,31,35,.2)]">
      <div className='cursor-pointer' onClick={handleHeaderClick}>主页</div>
    </div>
  );
};

export default EditorHeader;
