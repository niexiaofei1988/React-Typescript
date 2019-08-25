import * as React from 'react';
import { Empty } from 'antd';
import MyLayout from '../../layout';

import './index.less';

function Welcome(props: any) {
  return (
    <MyLayout>
      <Empty
        className="welcome-wrapper"
        description="欢迎来到测试TS"
        image="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
      />
    </MyLayout>
  );
}

export default Welcome;
