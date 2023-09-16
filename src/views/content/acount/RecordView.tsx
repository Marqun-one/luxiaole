import React, { useEffect, useState } from 'react';
import Timer from '../../../component/Timer';
import SelectCom, { SelectItems } from '../../../component/SelectCom';
import { InputNumber, Mentions, Button, message } from 'antd';
import { sendGetRequest, sendPostRequest } from '../../../utils/AxiosUtil';
import { insertItem, recordItems } from '../../../common/publicConfig/Api';
import dayjs from 'dayjs';
import { formatDate } from '../../../utils/Utils';
import { MessageInstance } from 'antd/es/message/interface';

export interface AcountInfo {
  id: number;
  type: number;
  date: string;
  money: number;
  note: string;
}
let options: SelectItems[] = [];


const handleConfirm = async (data: AcountInfo, messageApi: MessageInstance) => {
  const {type, money, date} = data;
  if(type === -1 || type === null || money === -1 || money === null || date === '' || date === null) {
    messageApi.open({
      type: 'error',
      content: '输入非法,请重新输入!',
    });
    return;
  }
  await sendPostRequest(insertItem, data).then(response => {
    const repMsg = response.data;
    if(repMsg === 'success') {
      messageApi.open({
        type: 'success',
        content: '创建成功!',
      });
      return;
    } 
    messageApi.open({
      type: 'error',
      content: '创建失败!',
    });
  });
}
export default function RecordView() {
  const [messageApi, contextHolder] = message.useMessage();
  let modifiedAcount: AcountInfo = {
    id: -1,
    type: -1,
    date: formatDate(dayjs()),
    money: -1,
    note: ""
  }
  const setType = (value: number) => modifiedAcount.type = value;
  const setDate = (value: string) => modifiedAcount.date = value;
  const setNote = (value: string) => modifiedAcount.note = value;
  const setMoney = (value: number) => modifiedAcount.money = value;
  const [items, setItems] = useState(options);
  useEffect(() => {
    sendGetRequest(recordItems).then((value) => {
      setItems(value.data);
    })
  }, []);
  return (
    <div style={{ color: 'black' }}>
      <div>
      {contextHolder}
      </div>
      <div style={{ overflow: 'auto' }}>
        <p style={{ float: 'left', marginRight: '1%', marginLeft: '10%', lineHeight: '250%' }}>日期:</p> <Timer timerChange={setDate} pickerType={'date'}/>
        <SelectCom options={items} title='type' style={{ float: 'left', marginLeft: '5%', lineHeight: '250%' }} updateCurType={setType} />
      </div>
      <div>
        <div style={{ float: 'left', overflow: 'auto', width: '100%' }}>
          <p style={{ float: 'left', marginLeft: '35%', lineHeight: 2.5 }}>金额:</p>
          <InputNumber style={{ width: '20%', float: 'left', marginLeft: '2%' }}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            onChange={(value: number | string | null) => {setMoney(value as number)}}
          />
        </div>
        <div style={{ float: 'left', overflow: 'auto', width: '100%' }}>
          <p style={{ float: 'left', marginLeft: '35%', lineHeight: 2.5 }}>备注:</p>
          <Mentions autoSize style={{ width: '20%', float: 'left', marginLeft: '2%' }} onChange={(value: string) => {setNote(value)}} />
        </div>
        <div style={{ float: 'left', overflow: 'auto', width: '100%' }}>
          <Button type="primary" style={{ float: 'left', marginLeft: '60%' }} onClick={() => {handleConfirm(modifiedAcount, messageApi)}}>确定</Button>
        </div>
      </div>
    </div>)
}
