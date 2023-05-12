import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm ,Switch } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, } from 'umi';
import dayjs from "dayjs"
import { PageContainer } from '@ant-design/pro-components';
import StandardTable from '@/components/StandardTable';
import GlobalDrawer from '@/components/GlobalDrawer'
import Info from "./Msq/index"

import * as service_user from '@/services/cms/user';

const User = () => {
  const dispatch = useDispatch()
  const [stepFormValues, setStepFormValues] = useState({});
  const [infoModalVisible, handleInfoModalVisible] = useState(false);
  const actionRef = useRef();
  let columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      valueType: 'indexBorder',
    },
    {
      title: '用户手机号',
      dataIndex: 'account',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
    },
    {
      title: '状态',
      dataIndex: 'state',
      render: (text, record) => <Switch checked={Boolean(record.state)} onChange={() => handleSwitchChange(record)} checkedChildren="启用" unCheckedChildren="冻结" />,
      valueEnum: {
        0: '冻结',
        1: '启用',
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (val, record) => record.createTime,
      fieldProps: (form) => ({
        disabledDate: current => current > dayjs().endOf('day'),
        defaultPickerValue: [dayjs().subtract(1, 'month'), dayjs()],
        placeholder: ['开始时间', '结束时间'],
      }),
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => (
        <a onClick={() => { handleInfoModalVisible(true); setStepFormValues(record); }}>查看问卷</a>
      ),
    },
  ];

  const handleSwitchChange = async record => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_user.update,
      payload: {
        id: record.id,
        state: Number(record.state) ? 0 : 1
      }
    })
    hide()
    if (res?.code == 200) {
      message.success({ content: '操作成功', key: 'success' });
    } else {
      message.error({ content: res.msg, key: 'error' });
    }
    actionRef.current?.reload();
  }

  return (
    <PageContainer>
      <StandardTable
        actionRef={actionRef}
        request={({ current, ...params }) => {
          // console.log(params)//查询参数，pageNum用current特殊处理
          return service_user.query({ ...params, pageNum: current })
        }}
        postData={data => data.list}
        columns={columns}
      />
      <GlobalDrawer
        open={infoModalVisible}
        onCancel={() => {
          handleInfoModalVisible(false);
          setStepFormValues({});
        }}
        title="查看问卷"
      >
       <Info values={stepFormValues}/>
      </GlobalDrawer>
    </PageContainer>
  );
};

export default User;
