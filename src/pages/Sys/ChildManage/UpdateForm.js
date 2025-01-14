import React, {useState} from 'react';
import {Form, Button, Input, Radio} from 'antd';
import {ProForm} from '@ant-design/pro-components';

import {useSelector} from 'umi';

const FormItem = Form.Item;
const {TextArea} = Input
const formLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
};
const UpdateForm = ({
                        handleUpdate,
                        roleList,
                        values
                    }) => {
    const submiting = useSelector(state => state.loading).effects['global/service']
    const [formVals, setFormVals] = useState({
        id: values.id,
        name: values.name,
        account: values.account,
        roleId: values.role?.id
    });

    const [form] = Form.useForm();

    const renderFooter = () => {
        return (
            <FormItem wrapperCol={24}>
                <div style={{textAlign: 'center'}}>
                    <Button type="primary" loading={submiting} htmlType="submit">
                        提交
                    </Button>
                </div>
            </FormItem>
        );
    };
    return (
        <ProForm
            onFinish={fieldsValue => handleUpdate({...formVals, ...fieldsValue})}
            submitter={false}
            layout="horizontal"
            {...formLayout}
            form={form}
            initialValues={{
                name: formVals.name,
                account: formVals.account,
                roleId: formVals.roleId,
            }}
        >
            <FormItem
                name="account"
                label="登录账号"
                rules={[{required: true, message: '请输入登录账号！'}]}
            >
                <Input placeholder="请输入" maxLength={50} allowClear disabled={Boolean(values.id)}/>
            </FormItem>
            <FormItem
                name="name"
                label="昵称"
                rules={[{required: true, message: '请输入昵称！'}]}
            >
                <Input placeholder="请输入" maxLength={50} allowClear/>
            </FormItem>
            <FormItem
                name="roleId"
                label="角色"
                rules={[{required: true, message: '请选择角色！'}]}
            >
                <Radio.Group>
                    {roleList.map(item => <Radio key={item.id} value={item.id}>{item.name}</Radio>)}
                </Radio.Group>
            </FormItem>
            {renderFooter()}
        </ProForm>
    );
};

export default UpdateForm;
