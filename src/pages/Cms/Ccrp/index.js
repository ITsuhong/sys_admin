import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm, Switch } from 'antd';
import React, { useState, useRef } from 'react';
import { useDispatch } from 'umi';
import dayjs from 'dayjs'
import { PageContainer } from '@ant-design/pro-components';
import StandardTable from '@/components/StandardTable';
import GlobalDrawer from '@/components/GlobalDrawer'
import Info from './Info';

import * as service_demoTable from '@/services/demo/demoTable';

const Ccrp = () => {
  const dispatch = useDispatch()
  const [infoModalVisible, handleInfoModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  let columns = [
    {
      dataIndex: 'id',
      valueType: 'indexBorder',
    },
    {
      title: '用户手机号',
      dataIndex: 'codeKey',
    },
    {
      title: '用户昵称',
      dataIndex: 'codeKey',
      search: false,
    },
    {
      title: '反馈内容',
      dataIndex: 'description',
      ellipsis: true,
      search: false,
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
        <a onClick={() => { handleInfoModalVisible(true); setStepFormValues(record); }}>查看</a>
      ),
    },
  ];


  return (
    <PageContainer>
      <StandardTable
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
        title="详情"
      >
        <Info values={stepFormValues} />
      </GlobalDrawer>
    </PageContainer>
  );
};

export default Ccrp;
