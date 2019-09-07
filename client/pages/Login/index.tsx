import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { loginService } from './service';

import './index.less';

const { Item: FormItem } = Form;
const { Password } = Input;
const itemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function Login({ form }) {
  const { getFieldDecorator } = form;
  function onSubmitLogin() {
    form.validateFields((err, values) => {
      if (err) return;
      loginService(values);
    });
  }
  return (
    <div className="login_wrapper">
      <Form layout="vertical" {...itemLayout}>
        <FormItem label="用户名">
          {getFieldDecorator('userName', {
            initialValue: '1',
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
            ],
          })(<Input placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem label="用户名">
          {getFieldDecorator('password', {
            initialValue: '1',
            rules: [
              {
                required: true,
                message: '密码不能为空!',
              },
            ],
          })(<Password placeholder="请输入密码" />)}
        </FormItem>
        <Button type="primary" onClick={onSubmitLogin}>
          登录
        </Button>
      </Form>
    </div>
  );
}

export default Form.create()(Login);
