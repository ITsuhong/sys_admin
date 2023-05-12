import React, { useState ,useEffect} from 'react';
import { Form, Button, Input, Select, InputNumber } from 'antd';
import { ProForm ,ProFormDependency} from '@ant-design/pro-components';
import GlobalUpload from '@/components/GlobalUpload';
import BraftEditor from '@/components/BraftEditor';
import { useSelector } from 'umi';
import * as service_case from '@/services/cms/case';
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
  const [formVals, setFormVals] = useState({
    ...values
  });
  const [selectList,setList]=useState([])
  useEffect(()=>{
    (async ()=>{
      const res=await service_case.query({pageSize:99999})
      if(res.code==200){
        setList(res.data.list.filter(item=>item.state===1))
      }
    })()
  },[])
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
        img: formVals.img,
        sort: formVals.sort,
        relationType: formVals.relationType,
        richText:formVals.relationType==0?formVals.relationDetail:'',
        objId:formVals.relationType==1?formVals.relationDetail:''
      }}
    >
      <FormItem
        name="img"
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
        name="relationType"
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
              value: 0,
              label: '图文详情',
            },
            {
              value: 1,
              label: '案例详情',
            },
            {
              value: 2,
              label: '出海流程',
            },
            {
              value: 3,
              label: '公司介绍',
            },
            {
              value: 4,
              label: '关于我们',
            }
          ]}
        >
        </Select>
      </FormItem>
      <ProFormDependency name={['relationType']}>
        {({relationType})=>{
        return  relationType==0 && <FormItem
          name="richText"
          label="图文详情"
          rules={[{ required: true, message: '请输入内容！' }]}
        >
          <BraftEditor />
        </FormItem>
        }}

      </ProFormDependency>
     <ProFormDependency  name={['relationType']}>
      {({relationType})=>{
       return relationType==1 &&  <FormItem
        name="objId"
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
          options={selectList}
          fieldNames={{
            value:'id',
            label:'name'
          }}
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
