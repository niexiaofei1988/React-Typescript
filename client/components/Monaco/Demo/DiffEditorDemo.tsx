import React from 'react';
import { Form, Switch, Select, Row, Col } from 'antd';
import DiffEditor from '../DiffEditor';

import lhs from '../txt/lhs.txt';
import rhs from '../txt/rhs.txt';

import { fontWeight, sizes, formItemLayout } from './config';
const { Item: FormItem } = Form;
const { Option } = Select;

function DiffEditorDemo({ form }) {
  const { getFieldDecorator, getFieldsValue } = form;
  return (
    <Row style={{ height: '100%' }}>
      <Col span={8}>
        <Form {...formItemLayout}>
          <FormItem label="对比方式: renderSideBySide">
            {getFieldDecorator('renderSideBySide', {
              initialValue: false,
              valueProps: 'checked',
            })(<Switch />)}
          </FormItem>
          <FormItem label="字体: fontWeight">
            {getFieldDecorator('fontWeight', {
              initialValue: '',
            })(
              <Select style={{ width: 100 }}>
                {fontWeight.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="大小: fontSize">
            {getFieldDecorator('fontSize', {
              initialValue: 12,
            })(
              <Select style={{ width: 100 }}>
                {sizes.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Form>
      </Col>
      <Col span={16} style={{ height: '100%' }}>
        <DiffEditor
          height="100%"
          value={lhs}
          modified={rhs}
          opts={getFieldsValue()}
          // renderSideBySide={getFieldValue('renderSideBySide')}
        />
      </Col>
    </Row>
  );
}

export default Form.create()(DiffEditorDemo);
