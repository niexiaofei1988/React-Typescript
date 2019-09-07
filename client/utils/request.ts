import axios from 'axios';
import { notification, message } from 'antd';
import 'nprogress/nprogress.css';

import NProgress from 'nprogress';

const msgDuration = 5 * 1000; // message 提示消失时间
axios.defaults.timeout = msgDuration; // 默认 5s 超时
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const request = axios.create();

// 设置 request
request.interceptors.request.use(
  function(config: {
    headers: { 'X-Requested-With': string };
    validateStatus: (status: any) => boolean;
  }) {
    config = {
      ...config,
      headers: {
        ...config.headers,
        // 'Content-type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };

    config.validateStatus = function(status: number) {
      return status >= 200 && status < 300;
    };

    NProgress.start();
    return config;
  },
  function(error: any) {
    NProgress.done();
    return Promise.reject(error);
  }
);

// 统一设置请求返回值
request.interceptors.response.use(
  (response: { data: any; status?: number; errorMsg?: string }) => {
    NProgress.done();
    const { status, data, errorMsg = '未知错误, 请重试!' } = response;
    switch (true) {
      // Promise.reject(new Error(errorMsg));
      case status === 401:
        return showErrorNotification('请重新登录!');
      case status !== 200:
        showErrorNotification(errorMsg);
        return;
      case !response.data.success:
        showErrorNotification(errorMsg);
        return;
      default:
        showErrorNotification(errorMsg);
        return;
    }

    return data.data;
  },
  (error: { response: { status: number } }) => {
    NProgress.done();
    return Promise.reject();
  }
);

export const showErrorMessage = (msg: string) => message.error(msg);

export function showErrorNotification(msg: string) {
  notification.error({
    duration: 3,
    message: '请求失败',
    description: msg,
  });
}

export default request;
