// https://404.life/
import React, { useState } from 'react';

import useInterval from '../../hooks/useInterval';
import { getDate } from '../../utils/bootstrap';
import './index.less';

function NotFoundTime() {
  const [dateTime, setDateTime] = useState(getDate(Date.now()));
  const { time, date } = dateTime;

  useInterval(() => {
    setDateTime(getDate(Date.now()));
  }, 1000);

  return (
    <div className="not_found_time_wrapper">
      <p className="date">...404 error page...</p>
      <p className="time">{time}</p>
      <p className="text">{date}</p>
    </div>
  );
}

export default NotFoundTime;
