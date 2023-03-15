import React, { useState } from 'react';
import { Form, Button, Input, Radio } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import { useSelector } from 'umi';
import EditTag from '@/components/EditTag';
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
        state: formVals.state
      }}
    >
      <FormItem
        name="roleName"
        label="题目"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Input placeholder="请输入" maxLength={50} allowClear style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        name="state"
        label="类型"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Radio.Group>
          <Radio value={1}>单选</Radio>
          <Radio value={2}>多选</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem
        name="tags"
        label="选项"
        rules={[{ required: true, message: '请添加！' }]}
      >
        <EditTag />
      </FormItem>
      {renderFooter()}
    </ProForm>
  );
};

export default UpdateForm;
