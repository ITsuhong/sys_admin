import React, {useState} from 'react';
import {Button, Cascader, Form, Input} from 'antd';
import {ProForm} from '@ant-design/pro-components';

import {useSelector} from 'umi';

const FormItem = Form.Item;
const {TextArea} = Input
const formLayout = {
    labelCol: {span: 4}, wrapperCol: {span: 18},
};
const UpdateForm = ({
                        handleUpdate, moduleTreeList, values
                    }) => {
    const submiting = useSelector(state => state.loading).effects['global/service']

    //给Cascader造回显的数据，二维数组
    const modulesIds = () => {
        return values?.routes?.map(item => {
            return item.pid == 0 ? [] : [item.pid, item.id]
        }).filter(item => item.length > 0);


    }
    // console.log(moduleIds,'moduleIds')
    modulesIds()
    const [formVals, setFormVals] = useState({
        id: values.id, name: values.name, description: values.description, modulesIds: modulesIds(),
    });

    const [form] = Form.useForm();

    const renderFooter = () => {
        return (<FormItem wrapperCol={24}>
            <div style={{textAlign: 'center'}}>
                <Button type="primary" loading={submiting} htmlType="submit">
                    提交
                </Button>
            </div>
        </FormItem>);
    };
    return (<ProForm
        onFinish={fieldsValue => handleUpdate({...formVals, ...fieldsValue})}
        submitter={false}
        layout="horizontal"
        {...formLayout}
        form={form}
        initialValues={{
            name: formVals.name, description: formVals.description, modulesIds: formVals.modulesIds
        }}
    >
        <FormItem
            name="name"
            label="角色名称"
            rules={[{required: true, message: '请输入角色名称！'}]}
        >
            <Input placeholder="请输入" maxLength={50} allowClear/>
        </FormItem>
        <FormItem
            name="description"
            label="描述"
            rules={[{required: true, message: '请输入！'}]}
        >
            <TextArea placeholder="请输入" autoSize={{minRows: 2, maxRows: 6}} maxLength={500} allowClear
                      showCount/>
        </FormItem>
        <FormItem
            name="modulesIds"
            label="模块"
            rules={[{required: true, message: '请选择模块！'}]}
        >
            <Cascader
                showSearch
                expandTrigger="hover"
                fieldNames={{label: 'name', value: 'id'}}
                options={moduleTreeList}
                getPopupContainer={triggerNode => triggerNode.parentElement}
                placeholder="请选择"
                multiple
                maxTagCount="responsive"
            />
        </FormItem>

        {renderFooter()}
    </ProForm>);
};

export default UpdateForm;
