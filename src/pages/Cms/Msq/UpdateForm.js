import React, { useState } from 'react';
import { Form, Button, Input,Select } from 'antd';
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
        roleName: formVals.roleName,
        description: formVals.description,
        moduleIds: formVals.moduleIds
      }}
    >
      <FormItem
        name="select"
        label="所属项目"
        rules={[{ required: true, message: '请选择xx！' }]}
      >
        <Select
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="请选择"
          style={{ width: '100%' }}
          getPopupContainer={triggerNode => triggerNode.parentElement}
          options={[
            {
              value: 'jack',
              label: 'Jack',
            },
            {
              value: 'lucy',
              label: 'Lucy',
            },
          ]}
        >
        </Select>
      </FormItem>
      {renderFooter()}
    </ProForm>
  );
};

export default UpdateForm;
