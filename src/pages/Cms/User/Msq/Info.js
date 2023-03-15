import { List } from 'antd';
import {
    CheckCircleTwoTone,
    CloseCircleOutlined
} from '@ant-design/icons';
const Info = () => {
    const data = [
        1,2,3,4,5,6,7,8,9,10,11,12,13
    ];
    return (
        <List
            size="large"
            dataSource={data}
            pagination
            renderItem={(item, index) => <List.Item>
                <div>
                    <div>
                        {index + 1}、问卷题目问卷题目问卷题目问卷题目问卷题目问卷题目问卷题目问卷题目问卷题目问卷题目[多选]
                    </div>
                    <div style={{ 'marginLeft': '24px' }}>
                        <div style={{ 'display': 'flex' }}>
                            <CheckCircleTwoTone twoToneColor="#52c41a" /><div style={{'marginLeft':'4px','color':index==1?'#52c41a':''}}>选项1</div>
                        </div>
                        <div style={{ 'display': 'flex' }}>
                            <CloseCircleOutlined /> <div style={{'marginLeft':'4px'}}>选项2</div>
                        </div>
                        <div style={{ 'display': 'flex' }}>
                            <CloseCircleOutlined /> <div style={{'marginLeft':'4px'}}>选项3</div>
                        </div>
                    </div>
                </div>
            </List.Item>}
        >

        </List>
    )
}
export default Info