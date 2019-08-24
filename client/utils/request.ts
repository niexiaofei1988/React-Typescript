import axios from 'axios';
import { message } from 'antd';
import 'nprogress/nprogress.css';

import NProgress from 'nprogress';

const msgDuration = 10 * 1000; // message 提示消失时间
axios.defaults.timeout = msgDuration; // 默认 5s 超时
axios.defaults.headers.post['Content-Type'] = 'application/json';

const axiosService = axios.create();

// 设置 request
axiosService.interceptors.request.use(
  function(config: {
    headers: { dt: number; 'X-Requested-With': string };
    validateStatus: (status: any) => boolean;
  }) {
    config.headers.dt = Date.now();
    config = {
      ...config,
      headers: {
        ...config.headers,
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
axiosService.interceptors.response.use(
  (response: { data: any; status?: any }) => {
    if (response.status === 401) {
      return Promise.reject(new Error('请重新登录'));
    }
    if (response.status !== 200) {
      showErrorMsg('未知错误，请重试');
      return Promise.reject(new Error('未知错误，请重试'));
    }
    if (!response.data.success) {
      showErrorMsg('请求失败');
      return Promise.reject(new Error('请求失败'));
    }
    const { data } = response;
    if (data.code !== 600) {
      const errorMsg = data.msg || '请求失败!';
      showErrorMsg(errorMsg);
      return Promise.reject(new Error(errorMsg));
    }
    NProgress.done();
    return data.data;
  },
  (error: { response: { status: number } }) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export const showErrorMsg = (msg: string) =>
  message.error({
    content: msg,
    duration: msgDuration,
  });

export default axiosService;
