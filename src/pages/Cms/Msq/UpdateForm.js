import React, { useState,useEffect } from 'react';
import { Form, Button, Input,Select } from 'antd';
import { ProForm } from '@ant-design/pro-components';

import { useSelector } from 'umi';
import * as service_common from '@/services/common';
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
  const [selectList,setList]=useState([])
  const [form] = Form.useForm();
  useEffect(() => {
    (async ()=>{
      const res=await service_common.findSelectList()
      if(res.code===200){
        setList([{id:'elementary',name:'初级问卷'},...res.data,])
      }
    })()
  }, [])
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
        projectId: formVals.projectId,
      }}
    >
      <FormItem
        name="projectId"
        label="所属项目"
        rules={[{ required: true, message: '请选择！' }]}
      >
        <Select
          allowClear
          showSearch
          optionFilterProp="children"
          placeholder="请选择"
          style={{ width: '100%' }}
          getPopupContainer={triggerNode => triggerNode.parentElement}
          options={selectList}
          fieldNames={{
            value:'id',
            label:'name'
          }}
        >
        </Select>
      </FormItem>
      {renderFooter()}
    </ProForm>
  );
};

export default UpdateForm;
