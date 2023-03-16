import React, { useState } from 'react';
import { Form, Button, Input, Cascader,InputNumber } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import GlobalUpload from '@/components/GlobalUpload';
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
        icon: formVals.icon,
        imgs: formVals.imgs,
        introduce: formVals.introduce,
        sort: formVals.sort,
        name:formVals.name
      }}
    >
      <FormItem
        name="name"
        label="项目名称"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Input placeholder="请输入" maxLength={50} allowClear style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        name="icon"
        label="项目图标"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'project/logo' }} maxCount={1} />
      </FormItem>
      <FormItem
        name="sort"
        label="排序权重"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} precision={0} placeholder="请输入" />
      </FormItem>
      <FormItem
        name="imgs"
        label="项目图片"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'project/img' }} maxCount={9} />
      </FormItem>
      <FormItem
        name="introduce"
        label="项目介绍"
        rules={[{ required: true, message: '请输入文本！' }]}
      >
        <TextArea placeholder="请输入" autoSize={{ minRows: 2, maxRows: 6 }} maxLength={500} allowClear showCount />
      </FormItem>
      {renderFooter()}
    </ProForm>
  );
};

export default UpdateForm;
