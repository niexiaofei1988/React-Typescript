// 利用 position: fixed 定位
import React from "react";

export interface DemoState {
  pageX: number;
  pageY: number;
  target: HTMLElement | null;
}

class Demo extends React.Component<any, DemoState> {
  state = {
    pageX: 0,
    pageY: 0,
    target: null,
  };

  getList = () => {
    const arr = Array.from(Array(5), (v, k) => k);
    const handleClick = (e) => {
      const target = e.target;
      const liLeft = target.offsetLeft;
      const liTop = target.offsetTop;
      const width = target.clientWidth;
      const height = target.clientHeight;
      const pageX = liLeft + width / 2 - 50; //下方显示div的宽度一半
      const pageY = liTop + height;
      this.setState({ pageX, pageY, target });
    };

    return arr.map((item, index) => (
      <li
        key={item}
        onClick={(e) => handleClick(e)}
        style={{ height: 30, margin: 20, textAlign: "center", background: "#ececec" }}
      >
        {index}
      </li>
    ));
  };

  render() {
    const { pageY, pageX, target } = this.state;

    const liList = this.getList();

    return (
      <ul>
        {liList}
        {target && (
          <div
            style={{
              position: "fixed",
              left: pageX,
              top: pageY,
              width: 100,
              height: 100,
              background: "red",
            }}
          />
        )}
      </ul>
    );
  }
}

export default Demo;
