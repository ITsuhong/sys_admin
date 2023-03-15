import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm ,Switch } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, } from 'umi';
import dayjs from "dayjs"
import Info from './Info'
import StandardTable from '@/components/StandardTable';
import GlobalDrawer from '@/components/GlobalDrawer'


import * as service_demoTable from '@/services/demo/demoTable';

const Msq = () => {
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
      title: '用户问卷类型',
      dataIndex: 'number',
      hideInSearch:true
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      valueType: 'dateRange',
      render: (val, record) => record.createTime,
      hideInSearch:true,
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
        <a onClick={() => { handleInfoModalVisible(true); setStepFormValues(record); }}>查看</a>
      ),
    },
  ];

  const handleSwitchChange = async record => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_demoTable.update,
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
    <>
      <StandardTable
        search={false}
        actionRef={actionRef}
        request={({ current, ...params }) => {
          // console.log(params)//查询参数，pageNum用current特殊处理
          return service_demoTable.query({ ...params, pageNum: current })
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
        title="查看"
      >
       <Info/>
      </GlobalDrawer>
    </>
  );
};

export default Msq;
