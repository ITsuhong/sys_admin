import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm, Switch, Image } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, } from 'umi';
import dayjs from "dayjs"
import { PageContainer } from '@ant-design/pro-components';
import StandardTable from '@/components/StandardTable';
import GlobalModal from '@/components/GlobalModal'
import UpdateForm from './UpdateForm';

import * as service_case from '@/services/cms/case';
import * as service_common from '@/services/common';

const Case = () => {
  const dispatch = useDispatch()
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  let columns = [
    {
      dataIndex: 'id',
      hideInSearch: true,
      valueType: 'indexBorder',
    },
    {
      title: '案例名称',
      dataIndex: 'name',
    },
    {
      title: '案例封面',
      dataIndex: 'cover',
      hideInSearch: true,
      render: (text, record) => <Image width={20} height={20} src={text} />
    },
    
    {
      title: '所属项目',
      dataIndex: 'projectId',
      render:(_,record)=><div>{record.projectName}</div>,
      request:async()=>{
        const res=await service_common.findSelectList()
        return res.data
      },
      fieldProps: () => ({
        fieldNames: { value: "id",label: "name" },
      }),
    },
    {
      title: '是否推荐',
      dataIndex: 'recommend',
      render: (text, record) => <Switch checked={Boolean(record.recommend)} onChange={() => handleTypeChange(record)} checkedChildren="是" unCheckedChildren="否" />,
      valueEnum: {
        0: '未推荐',
        1: '已推荐',
      },
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
        <Space>
          <a onClick={() => { handleUpdateModalVisible(true); setStepFormValues(record); }}>编辑</a>
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
      service: fields.id ? service_case.update : service_case.add,
      payload: {
        id: fields.id,
        sort: fields.sort,
        name: fields.name,
        imgs: fields.imgs,
        content: fields.content,
        projectId: fields.projectId,
        cover:fields.cover
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
  const handleSwitchChange = async record => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_case.update,
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
   const handleTypeChange = async record => {
      const hide = message.loading({ content: '操作中', key: 'loading' });
      const res = await dispatch({
        type: 'global/service',
        service: service_case.update,
        payload: {
          id: record.id,
          recommend: Number(record.recommend) ? 0 : 1
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
  const handleDeleteRecord = async record => {
    const hide = message.loading({ content: '正在删除', key: 'delete' });
    const res = await dispatch({
      type: 'global/service',
      service: service_case.remove,
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
          return service_case.query({ ...params, pageNum: current })
        }}
        postData={data => data.list}
        columns={columns}
      />
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

export default Case;
