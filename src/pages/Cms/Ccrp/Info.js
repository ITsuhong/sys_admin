import React, { useState } from 'react';
import { Radio, Switch, Space, InputNumber, Image } from 'antd';
import { ProDescriptions } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import Field from '@ant-design/pro-field';

const Info = ({
  values
}) => {
  const [formVals, setFormVals] = useState({
    ...values
  });
  return (
    <ProDescriptions
      column={2}
      bordered
    >
      <ProDescriptions.Item label="用户手机号">
        <Field text="" />
      </ProDescriptions.Item>
      <ProDescriptions.Item label="用户昵称">
        <Field text="" />
      </ProDescriptions.Item>
      <ProDescriptions.Item label="反馈内容" span={2}>
        <Field text="这是一段文本" />
      </ProDescriptions.Item>
      <ProDescriptions.Item label="反馈图片">
        <Image.PreviewGroup>
          <Space wrap>
            {formVals.imgs?.split(',').map(item => <Image key={item} width={100} height={100} src={item} />)}
          </Space>
        </Image.PreviewGroup>
      </ProDescriptions.Item>

    </ProDescriptions>
  );
};

export default Info