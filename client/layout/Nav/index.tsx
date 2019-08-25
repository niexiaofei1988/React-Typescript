import React from 'react';
import TweenOne from 'rc-tween-one';
import { Link } from 'react-router-dom';
import { Avatar } from 'antd';

import dataSource from './config';

import './index.less';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
    };
  }

  phoneClick = () => {
    const phoneOpen = !this.state.phoneOpen;
    this.setState({
      phoneOpen,
    });
  };

  render() {
    const { isMobile, ...props } = this.props;
    const { phoneOpen } = this.state;
    const { LinkMenu } = dataSource;
    const navData = LinkMenu.children;
    const navChildren = Object.keys(navData).map((key, i) => {
      return (
        <Link key={`${i}`} {...navData[key]}>
          {navData[key].children}
        </Link>
      );
    });
    const moment = phoneOpen === undefined ? 300 : null;
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...dataSource.wrapper}
        {...props}>
        <div
          {...dataSource.page}
          className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}>
          <TweenOne animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }} {...dataSource.logo}>
            <Avatar src={dataSource.logo.children} />
          </TweenOne>
          {isMobile && (
            <div
              {...dataSource.mobileMenu}
              onClick={() => {
                this.phoneClick();
              }}
            />
          )}
          <TweenOne
            {...LinkMenu}
            animation={
              isMobile
                ? {
                    height: 0,
                    duration: 300,
                    onComplete: (e) => {
                      if (this.state.phoneOpen) {
                        e.target.style.height = 'auto';
                      }
                    },
                    ease: 'easeInOutQuad',
                  }
                : null
            }
            moment={moment}
            reverse={!!phoneOpen}>
            {navChildren}
          </TweenOne>
        </div>
      </TweenOne>
    );
  }
}

export default Header;
