import React, { useState } from 'react';
import { Form, Button, Input, Radio ,InputNumber} from 'antd';
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
        subject: formVals.subject,
        type: formVals.type,
        options: formVals.options,
        sort: formVals.sort
      }}
    >
      <FormItem
        name="subject"
        label="题目"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Input placeholder="请输入" maxLength={50} allowClear style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        name="type"
        label="类型"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Radio.Group defaultValue={0}>
          <Radio value={0}>单选</Radio>
          <Radio value={1}>多选</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem
        name="options"
        label="选项"
        rules={[{ required: true, message: '请添加！' }]}
      >
        <EditTag />
      </FormItem>
     {
       formVals.id && <FormItem
       name="sort"
       label="排序权重"
       rules={[{ required: true, message: '请输入！' }]}
     >
       <InputNumber style={{ width: '100%' }} min={1} precision={0} placeholder="请输入" />
     </FormItem>
     }
      {renderFooter()}
    </ProForm>
  );
};

export default UpdateForm;
