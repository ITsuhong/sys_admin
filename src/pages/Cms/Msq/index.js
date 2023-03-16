import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm ,Switch } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, } from 'umi';
import dayjs from "dayjs"
import { PageContainer } from '@ant-design/pro-components';
import StandardTable from '@/components/StandardTable';
import GlobalModal from '@/components/GlobalModal'
import GlobalDrawer from '@/components/GlobalDrawer'
import UpdateForm from './UpdateForm';
import Info from './Subject/index'

import * as service_msq from '@/services/cms/msq';
import * as service_common from '@/services/common';

const RoleManage = () => {
  const dispatch = useDispatch()
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
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
      title: '所属项目',
      dataIndex: 'projectId',
      render:(_,record)=><div>{record.id=='elementary'?'初级问卷':record.projectName}</div>,
      request:async()=>{
        const res=await service_common.findSelectList()
        return res.data
      },
      fieldProps: () => ({
        fieldNames: { value: "id",label: "name" },
      }),
    },
    {
      title: '题目数量',
      dataIndex: 'subjectNum',
      hideInSearch: true,
    },
   {
    title: '问卷完成量',
    dataIndex: 'finishNum',
    hideInSearch: true,
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
        <Space>
          <a onClick={() => { handleUpdateModalVisible(true); setStepFormValues(record); }}>编辑</a>
          <a onClick={() => { handleInfoModalVisible(true); setStepFormValues(record); }}>题目管理</a>
          <Popconfirm title="确定删除?" onConfirm={() => handleDeleteRecord(record)} okText="确定" cancelText="取消">
            <a style={{ color: '#f50' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

   const handleUpdate = async fields => {
     const hide = message.loading({ content: '操作中', key: 'loading' });
     const res = await dispatch({
       type: 'global/service',
       service: fields.id ? service_msq.update : service_msq.add,
       payload: {
         id: fields.id,
         projectId: fields.projectId,
       }
     })
     hide();
     if (res?.code == 200) {
       message.success({ content: '操作成功', key: 'success' });
       handleUpdateModalVisible(false);
       actionRef.current?.reload();
     } else {
       message.error({ content: res.msg, key: 'error' });
     }
   };

  const handleDeleteRecord = async record => {
    const hide = message.loading({ content: '正在删除', key: 'delete' });
    const res = await dispatch({
      type: 'global/service',
      service: service_msq.remove,
      payload: { id: record.id }
    })
    hide();
    if (res?.code == 200) {
      message.success({ content: '删除成功', key: 'success' });
      actionRef.current?.reload();
    } else {
      message.error({ content: res.msg, key: 'error' });
    }
  };

  return (
    <PageContainer>
      <StandardTable
        actionRef={actionRef}
        toolBarRender={() => [
          <Button key='add' type="primary" onClick={() => { handleUpdateModalVisible(true); setStepFormValues({}) }}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={({ current, ...params }) => {
          // console.log(params)//查询参数，pageNum用current特殊处理
          return service_msq.query({ ...params, pageNum: current })
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
        title="题目管理"
      >
        <Info  values={stepFormValues}/>
      </GlobalDrawer>
      <GlobalModal
        open={updateModalVisible}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({});
        }}
        title={stepFormValues.id ? '编辑' : '新增'}
      >
        <UpdateForm
          values={stepFormValues}
          handleUpdate={handleUpdate}
        />
      </GlobalModal>
    </PageContainer>
  );
};

export default RoleManage;
