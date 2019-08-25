import * as React from 'react';
import { Button } from 'antd';

function Chart(props: $FIXME) {
  console.log(props);
  function onTestHandler(evt) {
    console.log(evt, '>>>>>>>>>>>>>');
  }
  return (
    <div>
      <Button type="primary" onClick={onTestHandler}>
        Button
      </Button>
    </div>
  );
}

export default Chart;
