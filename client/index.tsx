import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Welcome from './pages/Welcome';

// 需要引入的 less 问题,
import 'antd/dist/antd.css';
import './global.less';

ReactDOM.render(<Welcome />, document.getElementById('root'));
