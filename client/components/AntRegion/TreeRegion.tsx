/**
 * 1. 需要对hotCities 进行过滤, 循环次数过多
 * 2. 不能对 TreeSelect 所有的API进行支持,只可封装自己内部需要或者需要对外的API
 * 3. 自定义对 form 的支持
 * 4. 继承 TreeSelect 的 ts 支持
 * 5. 支持拼音
 */

import React from 'react';
import { TreeSelect } from 'antd';
import { TreeRegionProps } from './interface';

const { SHOW_PARENT } = TreeSelect;

// const loop = (data) =>
//   data.map((item) => {
//     if (item.children && item.children.length) {
//       return (
//         <TreeNode key={`${item.pid}-${item.key}`} title={item.title}>
//           {loop(item.children)}
//         </TreeNode>
//       );
//     }
//     return <TreeNode key={item.key} title={item.title} />;
//   });

function TreeRegion(props: TreeRegionProps) {
  const { sourceData, wrapperClass, ...rest } = props;
  const tProps = {
    treeData: sourceData,
    showSearch: true,
    // labelInValue: true,
    placeholder: '请选择地区',
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    searchPlaceholder: '请选择地区',
    style: {
      width: '100%',
    },
    dropdownStyle: {
      overflow: 'auto',
      maxHeight: 400,
    },
    filterTreeNode(inputValue, treeNode) {
      const { props } = treeNode;
      const { pinyin = '', title = '' } = props;
      return !!pinyin.match(new RegExp(inputValue, 'gi')) || title.includes(inputValue);
    },
    ...rest,
  };
  return (
    <div id="tree_region_wrapper" className={wrapperClass}>
      <TreeSelect
        getPopupContainer={() => document.getElementById('tree_region_wrapper')}
        {...tProps}
      />
      {/* {loop(treeData)} */}
      {/* </TreeSelect> */}
    </div>
  );
}

export default TreeRegion;
