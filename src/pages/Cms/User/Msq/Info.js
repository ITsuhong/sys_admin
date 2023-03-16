import { List } from 'antd';
import { useEffect, useState } from 'react'
import {
    CheckCircleTwoTone,
    CloseCircleOutlined
} from '@ant-design/icons';

import * as service_user from '@/services/cms/user';
import { values } from 'lodash';
const Info = ({ values }) => {
    const [data, setData] = useState([])
    useEffect(() => {
        (async () => {
            const res = await service_user.findSubjectList({ id: values.id })
            if (res.code === 200) {
                setData(res.data)
            }
        })()
    }, [])
    return (
        <List
            size="large"
            dataSource={data}
            renderItem={(item, index) => <List.Item>
                <div>
                    <div>
                        {index + 1}、{item.subject}{item.type == 0 ? '[单选]' : '[多选]'}
                    </div>
                    <div style={{ 'marginLeft': '24px' }}>
                        {item.options.split('&').map(children => {
                            return (
                           item.selectedOptions==children?<div style={{ 'display': 'flex' }}>
                                <CheckCircleTwoTone twoToneColor="#52c41a" /><div style={{ 'marginLeft': '4px', 'color': index == 1 ? '#52c41a' : '' }}>{children}</div>
                            </div>: <div style={{ 'display': 'flex' }}>
                            <CloseCircleOutlined /> <div style={{ 'marginLeft': '4px' }}>{children}</div>
                        </div>
                            )
                        })}
                    </div>
                </div>
            </List.Item>}
        >

        </List>
    )
}
export default Info