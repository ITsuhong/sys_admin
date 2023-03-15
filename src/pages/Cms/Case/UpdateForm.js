import React, { useState } from 'react';
import { Form, Button, Input, Select,InputNumber } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import GlobalUpload from '@/components/GlobalUpload';
import BraftEditor from '@/components/BraftEditor';
import { useSelector } from 'umi';

const FormItem = Form.Item;
const { Option } = Select
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
        name="roleName"
        label="案例名称"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Input placeholder="请输入" maxLength={50} allowClear style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        name="logo1"
        label="案例封面"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'case/cover' }} maxCount={1} />
      </FormItem>
     
      <FormItem
        name="logo1"
        label="案例图片"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'project/imgs' }} maxCount={1} />
      </FormItem>
      <FormItem
        name="content1"
        label="案例内容"
        rules={[{ required: true, message: '请输入内容！' }]}
      >
        <BraftEditor />
      </FormItem>
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
