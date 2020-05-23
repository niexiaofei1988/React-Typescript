import React from 'react';

import { Tabs } from 'antd';
import MonacoEditor from './MonacoEditor';
import MyLayout from '../../layout';

import DiffEditorDemo from './Demo/DiffEditorDemo';

import data from './txt/js.txt';

import './index.less';

const { TabPane } = Tabs;

function EditorIndex() {
  return (
    <MyLayout>
      <Tabs className="full-height-card-wrapper">
        <TabPane tab="普通编辑器" key="normal">
          {/* <MonacoEditor height="100%" value={data} /> */}
        </TabPane>
        <TabPane tab="比对编辑器" key="diff">
          <DiffEditorDemo />
        </TabPane>
      </Tabs>
    </MyLayout>
  );
}

export default EditorIndex;
