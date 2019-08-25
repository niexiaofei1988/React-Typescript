import * as React from 'react';
import { Empty } from 'antd';
// import EmptyProps from '~antd/lib/empty/index.d.ts';
import MyLayout from '../../layout';

import './index.less';

interface WelcomeProps {
  image?: string;
  description?: string;
}

function Welcome(props: WelcomeProps) {
  return (
    <MyLayout>
      <Empty
        className="welcome-wrapper"
        description="欢迎来到测试TS"
        image="https://source.unsplash.com/random/1200x800"
      />
    </MyLayout>
  );
}

export default Welcome;
