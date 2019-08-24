import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import routes from './routes';
import './global.less';

render(
  <ConfigProvider locale={zhCN}>
    <Router>
      <Switch>
        {routes.map((item) => (
          <Route exact path={item.path} component={item.component} />
        ))}
      </Switch>
    </Router>
  </ConfigProvider>,
  document.getElementById('root')
);
