import React, { Fragment } from 'react';
import { Card, Select, TreeSelect } from 'antd';

import data from '../../../data/china.json';

const { Option, OptGroup } = Select;
const { TreeNode } = TreeSelect;

interface TreeNodeItemProps {
  chineseName: string;
  id?: string;
  pinyin?: string;
  children?: { length: number };
}

function SelectRegion() {
  function getOptions() {
    return data.map((item) => (
      <OptGroup label={item.chineseName} key={item.id} data-dataRef={item}>
        {item.children.map((child) => (
          <Option key={child.id} value={child.id} data-dataRef={item} data-pinyin={child.pinyin}>
            {/* {item.chineseName}- */}
            {child.chineseName}
          </Option>
        ))}
      </OptGroup>
    ));
  }

  function loop(data: { length?: number; map?: any }) {
    return data.map((item: TreeNodeItemProps, idx: number) => {
      if (item.children && item.children.length) {
        return (
          <TreeNode
            key={`${item.chineseName}-${idx}`}
            value={item.chineseName}
            title={item.chineseName}
            dataRef={item}>
            {loop(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode key={`${item.chineseName}-${idx}`} title={item.chineseName} dataRef={item} />
      );
    });
  }
  return (
    <Fragment>
      <Card title='普通搜索'>
        此处: 1. 需要根据省份查询 2. 城市查询 3. 拼音查询 <br />
        <Select
          showSearch
          mode='multiple'
          showArrow={false}
          id='select-container'
          style={{ minWidth: 300 }}
          getPopupContainer={() => document.getElementById('select-container')}
          // labelInValue
          // menuItemSelectedIcon={<div>中</div>}
          filterOption={(inputValue, option) => {
            const { props } = option;
            const { children, 'data-dataRef': dataRef } = props;
            return (
              (props['data-pinyin'] && props['data-pinyin'].match(new RegExp(inputValue, 'gi'))) ||
              ((typeof children === 'string' && children.match(inputValue)) ||
                (dataRef &&
                  ((typeof dataRef.chineseName === 'string' &&
                    dataRef.chineseName.match(inputValue)) ||
                    (typeof dataRef.pinyin === 'string' &&
                      dataRef.pinyin.match(new RegExp(inputValue, 'gi'))))))
            );
          }}>
          {getOptions()}
        </Select>
      </Card>
      <Card title='树形'>
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
          placeholder='请选择地区'>
          {loop(data)}
        </TreeSelect>
      </Card>
    </Fragment>
  );
}

export default SelectRegion;
