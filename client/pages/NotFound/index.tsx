import * as React from 'react';
import NotFoundTime from '../../components/NotFoundTime';
import { Card } from 'antd';
import MyLayout from '../../layout';

export default function NotFound() {
  return (
    <MyLayout>
      <Card
        title="时间背景"
        bordered={false}
        bodyStyle={{ padding: 0, height: `calc(100vh - 55px)` }}>
        <NotFoundTime />
      </Card>
    </MyLayout>
  );
}
