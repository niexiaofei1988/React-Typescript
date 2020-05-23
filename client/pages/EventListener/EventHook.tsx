// https://www.yuque.com/docs/share/6b67c236-4d1d-4879-b741-5db6ec5c29fb?# react 事件处理
import React, { useState, Fragment } from "react";
import { Button } from "antd";
import useListener from "../../hooks/useListener";

const getTargetPos = (target: HTMLElement) => {
  if (target) {
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = left + width / 2 - 50;
    const y = top + height;
    return { x, y };
  }
  return null;
};

const EventListenerHook = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [target, setTarget] = useState<HTMLElement>(null);

  const handler = (evt: { target: HTMLElement }) => {
    setTarget(evt.target);

    const targetPos = getTargetPos(evt.target);
    setPos(targetPos);
  };
  // @ts-ignore
  useListener("click", handler);
  console.log(pos);
  return (
    <Fragment>
      <Button>点我</Button>
      <Button>点我</Button>
      <Button>点我</Button>
      <Button>点我</Button>
      <Button>点我</Button>
      <Button>点我</Button>
      {target && (
        <div
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y,
            width: 100,
            height: 100,
            background: "red",
          }}
        />
      )}
    </Fragment>
  );
};

export default EventListenerHook;
