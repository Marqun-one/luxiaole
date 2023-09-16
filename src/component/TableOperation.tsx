import type { DatePickerProps } from 'antd';
import { DatePicker, Button, message } from 'antd';
import dayjs from 'dayjs'
import { AcountListInfo } from './AcountTable';
import { sendPostRequest } from '../utils/AxiosUtil';
import { AcountItemDelete } from '../common/publicConfig/Api';
import UpdateTableConfirm from './UpdateTableConfirm';

interface TableOperationProps {
    rowDetail: AcountListInfo,
    updateSource: () => void;
}

export default function TableOperation(props: TableOperationProps) {
    const [messageApi, contextHolder] = message.useMessage();
    const { rowDetail, updateSource } = props;
    const handleDelete = () => {
        sendPostRequest(AcountItemDelete, rowDetail).then(value => {
            updateSource();
            messageApi.open({
                type: 'success',
                content: '删除成功!',
              });
        })
    }
    return (
        // <div className='RecordTimer'><DatePicker onChange={hadnleOnChange} defaultValue={dayjs()} picker={props.pickerType}/></div>
        <div>
            {contextHolder}
            <Button onClick={handleDelete}>删除</Button>
            {/* <Button>修改</Button> */}
            <UpdateTableConfirm rowDetail={rowDetail} updateSource={updateSource}/>
        </div>
    )
}