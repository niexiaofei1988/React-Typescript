import React from 'react';
import AntRegion from '../../components/AntRegion';
import MyLayout from '../../layout';

function SelectRegion() {
  // function loop(data: { length?: number; map?: any }) {
  //   return data.map((item: TreeNodeItemProps, idx: number) => {
  //     if (item.children && item.children.length) {
  //       return (
  //         <TreeNode
  //           key={`${item.chineseName}-${idx}`}
  //           value={item.chineseName}
  //           title={item.chineseName}
  //           dataRef={item}>
  //           {loop(item.children)}
  //         </TreeNode>
  //       );
  //     }
  //     return (
  //       <TreeNode key={`${item.chineseName}-${idx}`} title={item.chineseName} dataRef={item} />
  //     );
  //   });
  // }

  return (
    <MyLayout>
      <AntRegion />
      {/* <Card title="树形">
        bug: key值重复导致选择不准, 且不允许选择
        <br />
        <TreeSelect
          showSearch
          // multiple
          treeCheckable
          // allowClear
          // treeDefaultExpandAll
          style={{ width: 300 }}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="请选择地区">
          {loop(data)}
        </TreeSelect>
      </Card> */}
    </MyLayout>
  );
}

export default SelectRegion;
