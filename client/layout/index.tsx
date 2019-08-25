/**
 * @desc: 主布局
 */
import React, { Fragment } from 'react';
import Nav from './Nav';

export default function MyLayout({ children }) {
  return (
    <Fragment>
      <Nav />
      <div style={{ padding: 24, height: 'calc(100% - 63px)' }}>{children}</div>
    </Fragment>
  );
}
