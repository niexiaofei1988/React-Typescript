import React, { useState, Fragment, useEffect } from 'react';
import { Select } from 'antd';

const { Option, OptGroup } = Select;

export interface TreeNodeItemProps {
  id?: string;
  pinyin?: string;
  title: string;
  children?: any[];
}

export interface SelectRegionProps {
  onChange?: Function;
  showPreview?: Boolean;
  value?: string[] | string;
  sourceData: any[];
}

function SelectRegion(props: SelectRegionProps) {
  const { value, onChange, sourceData = [], ...restProps } = props;
  const [stateValue, setStateValue] = useState<string[] | string>([]);

  useEffect(() => {
    if ('value' in props) {
      setStateValue(value);
    }
  }, [value]);

  function getOptions() {
    return sourceData.map((item) => (
      <OptGroup label={item.title} key={item.key} data-dataRef={item}>
        {item.children.map((child) => (
          <Option key={child.key} value={child.key} data-dataRef={item} data-pinyin={child.pinyin}>
            {/* {item.title}- */}
            {child.title}
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
        filterOption={(inputValue, option) => {
          const { props } = option;
          const { children, 'data-dataRef': dataRef } = props;
          return (
            (props['data-pinyin'] && props['data-pinyin'].match(new RegExp(inputValue, 'gi'))) ||
            ((typeof children === 'string' && children.match(inputValue)) ||
              (dataRef &&
                ((typeof dataRef.title === 'string' && dataRef.title.match(inputValue)) ||
                  (typeof dataRef.pinyin === 'string' &&
                    dataRef.pinyin.match(new RegExp(inputValue, 'gi'))))))
          );
        }}
        {...restProps}>
        {getOptions()}
      </Select>
    </Fragment>
  );
}

export default SelectRegion;
