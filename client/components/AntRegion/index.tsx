import React, { useState, Fragment } from 'react';
import { Select } from 'antd';

import data from '../../../data/china.json';

const { Option, OptGroup } = Select;

export interface TreeNodeItemProps {
  id?: string;
  pinyin?: string;
  chineseName: string;
  children?: any[];
}

export interface AntRegionProps {
  onChange?: Function;
  showPreview?: Boolean;
  value?: string[] | string;
}

function AntRegion(props: AntRegionProps) {
  const { value, onChange, showPreview = true, ...restProps } = props;
  const [stateValue, setStateValue] = useState<string[] | string>([]);

  useState(() => {
    if ('value' in props) {
      setStateValue(value);
    }
  }, [value]);

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

  function onChangeHandler(value: React.SetStateAction<string[] | string>, option: any) {
    if (onChange) {
      onChange(value, option);
      return;
    }
    setStateValue(value);
  }

  return (
    <Fragment>
      <Select
        showSearch
        mode="multiple"
        showArrow={false}
        value={stateValue}
        style={{ minWidth: 300 }}
        onChange={onChangeHandler}
        // getPopupContainer={() => document.getElementById('select-container')}
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
        }}
        {...restProps}>
        {getOptions()}
      </Select>
      {showPreview && <div>预览</div>}
    </Fragment>
  );
}

export default AntRegion;
