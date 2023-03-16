import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Select, InputNumber } from 'antd';
import { ProForm } from '@ant-design/pro-components';
import GlobalUpload from '@/components/GlobalUpload';
import BraftEditor from '@/components/BraftEditor';
import { useSelector } from 'umi';
import * as service_common from '@/services/common';
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
  const [selectList,setList]=useState([])
  // console.log(moduleIds,'moduleIds')
  useEffect(() => {
    (async ()=>{
      const res=await service_common.findSelectList()
      if(res.code===200){
        setList(res.data)
      }
    })()
  }, [])
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
        name: formVals.name,
        content: formVals.content,
        cover: formVals.cover,
        imgs: formVals.imgs,
        projectId: formVals.projectId,
        sort: formVals.sort,
      }}
    >
      <FormItem
        name="name"
        label="案例名称"
        rules={[{ required: true, message: '请输入！' }]}
      >
        <Input placeholder="请输入" maxLength={50} allowClear style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        name="cover"
        label="案例封面"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'case/cover' }} maxCount={1} />
      </FormItem>

      <FormItem
        name="imgs"
        label="案例图片"
        rules={[{ required: true, message: '请上传图片！' }]}
      >
        <GlobalUpload data={{ type: 'project/imgs' }} maxCount={9} />
      </FormItem>
      <FormItem
        name="content"
        label="案例内容"
        rules={[{ required: true, message: '请输入内容！' }]}
      >
        <BraftEditor />
      </FormItem>
      <FormItem
        name="projectId"
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
          options={selectList}
          fieldNames={
            {
              value:'id',
              label:'name'
            }
          }
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
