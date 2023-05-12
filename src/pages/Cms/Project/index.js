import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, message, Popconfirm ,Switch,Image } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, } from 'umi';
import dayjs from "dayjs"
import { PageContainer } from '@ant-design/pro-components';
import StandardTable from '@/components/StandardTable';
import GlobalModal from '@/components/GlobalModal'
import UpdateForm from './UpdateForm';

import * as service_project from '@/services/cms/project';

const RoleManage = () => {
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
      title: '项目名称',
      dataIndex: 'name',
    },
    {
      title: '项目图片',
      dataIndex: 'icon',
      hideInSearch: true,
      render: (text, record) => <Image width={20} height={20} src={text} />
    },
    {
      title: '排序',
      dataIndex: 'sort',
      hideInSearch: true,
    },
    {
      title: '是否开启问卷',
      dataIndex: 'openQuestionnaire',
      render: (text, record) => <Switch checked={Boolean(record.openQuestionnaire)} onChange={() => handleSwitchQuestion(record)} checkedChildren="是" unCheckedChildren="否" />,
      valueEnum: {
        0: '否',
        1: '是',
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
        <a onClick={() => { handleUpdateModalVisible(true); setStepFormValues(record); }}>编辑</a>
      ),
    },
  ];

   const handleUpdate = async fields => {
     const hide = message.loading({ content: '操作中', key: 'loading' });
     const res = await dispatch({
       type: 'global/service',
       service: fields.id ? service_project.update : service_project.add,
       payload: {
         id: fields.id,
         icon: fields.icon,
         name: fields.name,
         sort: fields.sort,
         introduce: fields.introduce,
         imgs:fields.imgs
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
  const handleSwitchQuestion = async record => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_project.update,
      payload: {
        id: record.id,
        openQuestionnaire: Number(record.openQuestionnaire) ? 0 : 1
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
  const handleSwitchChange = async record => {
    const hide = message.loading({ content: '操作中', key: 'loading' });
    const res = await dispatch({
      type: 'global/service',
      service: service_project.update,
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
        toolBarRender={() => [
          <Button key='add' type="primary" onClick={() => { handleUpdateModalVisible(true); setStepFormValues({}) }}>
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={({ current, ...params }) => {
          // console.log(params)//查询参数，pageNum用current特殊处理
          return service_project.query({ ...params, pageNum: current })
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

export default RoleManage;
