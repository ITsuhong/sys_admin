import React, { useState } from 'react';
import { Form, Button, Input, Select, InputNumber } from 'antd';
import { ProForm ,ProFormDependency} from '@ant-design/pro-components';
import GlobalUpload from '@/components/GlobalUpload';
import BraftEditor from '@/components/BraftEditor';
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
        name="logo1"
        label="轮播图"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'advertis/imgs' }} maxCount={1} />
      </FormItem>
      <FormItem
        name="sort"
        label="排序"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <InputNumber style={{ width: '100%' }} min={1} precision={0} placeholder="请输入" />
      </FormItem>
      <FormItem
        name="select"
        label="位置"
        rules={[{ required: true, message: '请选择！' }]}
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
              value: '0',
              label: '商城',
            },
            {
              value: '1',
              label: '首页',
            },
          ]}
        >
        </Select>
      </FormItem>
      <FormItem
        name="type"
        label="关联类型"
        rules={[{ required: true, message: '请选择！' }]}
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
              value: '0',
              label: '图文详情',
            },
            {
              value: '1',
              label: '案例详情',
            },
            {
              value: '2',
              label: '出海流程',
            },
            {
              value: '3',
              label: '公司介绍',
            },
            {
              value: '4',
              label: '关于我们',
            }
          ]}
        >
        </Select>
      </FormItem>
      <ProFormDependency name={['type']}>
        {({type})=>{
        return  type==0 && <FormItem
          name="content1"
          label="图文详情"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <BraftEditor />
        </FormItem>
        }}

      </ProFormDependency>
     <ProFormDependency  name={['type']}>
      {({type})=>{
       return type==1 &&  <FormItem
        name="select"
        label="关联对象名称"
        rules={[{ required: true, message: '请选择！' }]}
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
      }}

     </ProFormDependency>
     
      {renderFooter()}
    </ProForm>
  );
};

export default UpdateForm;
