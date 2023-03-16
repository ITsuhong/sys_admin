import React, { useState } from 'react';
import { Form, Button, Input, Cascader,InputNumber } from 'antd';
import { ProForm } from '@ant-design/pro-components';

import { useSelector } from 'umi';

const FormItem = Form.Item;
const { TextArea } = Input
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const UpdateForm = ({
  handleUpdate,
  values
}) => {
  const submiting = useSelector(state => state.loading).effects['global/service']

  // console.log(moduleIds,'moduleIds')

  const [formVals, setFormVals] = useState({
    ...values
  });

  const [form] = Form.useForm();

  const renderFooter = () => {
    return (
      <FormItem wrapperCol={24}>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" loading={submiting} htmlType="submit">
            提交
          </Button>
        </div>
      </FormItem>
    );
  };
  return (
    <ProForm
      onFinish={fieldsValue => handleUpdate({ ...formVals, ...fieldsValue })}
      submitter={false}
      layout="horizontal"
      {...formLayout}
      form={form}
      initialValues={{
        hotWord: formVals.hotWord,
        sort: formVals.sort,
      }}
    >
      <FormItem
        name="hotWord"
        label="关键词"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Input placeholder="请输入" maxLength={50} allowClear style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        name="sort"
        label="排序权重"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} precision={0} placeholder="请输入" />
      </FormItem>
      {renderFooter()}
    </ProForm>
  );
};

export default UpdateForm;
