import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm ,Switch } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, } from 'umi';
import dayjs from "dayjs"
import Info from './Info'
import StandardTable from '@/components/StandardTable';
import GlobalDrawer from '@/components/GlobalDrawer'


import * as service_user from '@/services/cms/user';

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
      dataIndex: 'typeName',
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


  return (
    <>
      <StandardTable
        search={false}
        actionRef={actionRef}
        request={({ current, ...params }) => {
          // console.log(params)//查询参数，pageNum用current特殊处理
          return service_user.findQuestionnaireList({ ...params, pageNum: current })
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
       <Info values={stepFormValues}/>
      </GlobalDrawer>
    </>
  );
};

export default Msq;
