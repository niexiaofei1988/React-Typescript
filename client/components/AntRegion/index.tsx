import React, { Fragment, useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';

import treeData from '../../../data/all_china_tree.json';

import MonacoEditor from '../Monaco/MonacoEditor';
import SelectRegion from './SelectRegion';
import TreeRegion from './TreeRegion';

// import selectData from '../../../data/china.json';
// import data from '../../../data/utils';

const { Paragraph } = Typography;

// 1 级好搞, 3级也好搞, 2级怎么搞 ? 如果是更多级, 搞一个递归 ?
function getDataByTreeData(treeData: any[], level: number = 2) {
  if (level === 1) return treeData.map(({ children, ...rest }) => rest);
  if (level === 3) return treeData;
  return treeData.map((item) => {
    return {
      ...item,
      children: item.children.map(({ children, ...rest }) => rest),
    };
  });
}

const data = getDataByTreeData(treeData);
const newLocal = { labels: [], values: [], data: [] };

function AntRegion() {
  const [previewValue, setPreviewValue] = useState([]);
  const [previewResult, setPreviewResult] = useState(newLocal);

  function onChangeHandler(values, labels) {
    const data = values.map((item, idx) => ({ key: item, label: labels[idx] }));
    setPreviewResult({ values, labels, data });
  }

  function onSelectChangeHandler(value) {
    // const { props } = option;
    // console.log(value, option);
    setPreviewValue(value);
  }

  return (
    <Fragment>
      <h5>修改于: 08-28 :03:30</h5>
      <Card bordered={false} title="普通搜索">
        此处: 1. 需要根据省份查询 2. 城市查询 3. 拼音查询 <br />
        <Row gutter={24}>
          <Col span={12}>
            <SelectRegion sourceData={data} value={previewValue} onChange={onSelectChangeHandler} />
          </Col>
          <Col span={12}>
            <Paragraph copyable>{previewValue.join(', ')}</Paragraph>
            {/* <MonacoEditor
              readOnly
              height={500}
              language="json"
              hideCursorInOverviewRuler
              value={JSON.stringify({ data: previewValue }, null, 2)}
            /> */}
          </Col>
        </Row>
      </Card>
      <Card bordered={false} title="树形选择">
        {/* <pre>{JSON.stringify(treeData, null, 2)}</pre> */}
        <Row gutter={24}>
          <Col span={12}>
            <TreeRegion onChange={onChangeHandler} sourceData={data} />
          </Col>
          <Col span={12}>
            <Paragraph copyable>{previewResult.labels.join(', ')}</Paragraph>
            {/* <MonacoEditor
              readOnly
              height={500}
              language="json"
              hideCursorInOverviewRuler
              value={JSON.stringify(previewResult, null, 2)}
            /> */}
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
}

export default AntRegion;
