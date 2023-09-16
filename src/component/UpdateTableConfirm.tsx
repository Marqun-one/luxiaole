import React, { useState } from 'react';
import { Button, Input, InputNumber, Modal, Space, message } from 'antd';
import { AcountListInfo } from './AcountTable';
import { sendPostRequest } from '../utils/AxiosUtil';
import { AcountItemUpdate } from '../common/publicConfig/Api';


interface UpdateTableConfirmProps {
    rowDetail: AcountListInfo,
    updateSource: () => void;
}
const UpdateTableConfirm = (props: UpdateTableConfirmProps) => {
  const {rowDetail, updateSource} = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(rowDetail.note);
  const [money, setMoney] = useState(rowDetail.money);

  const showModal = () => {
    setOpen(true);
  };

   const handleConfirm = async () => {
    setOpen(false);
    if(money === null) {
        messageApi.open({
          type: 'error',
          content: '输入非法,请重新输入!',
        });
        return;
      }
      const updateItem = {...rowDetail, note: note, money: money}
      await sendPostRequest(AcountItemUpdate, updateItem).then(response => {
        const repMsg = response.data;
        if(repMsg === 'success') {
          messageApi.open({
            type: 'success',
            content: '修改成功!',
          });
          updateSource();
          return;
        } 
        messageApi.open({
          type: 'error',
          content: '修改失败!',
        });
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
          <div>
      {contextHolder}
      </div>
      <Button onClick={showModal}>
        修改
      </Button>
      <Modal
        title="详情信息"
        open={open}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>日期: {rowDetail.date}</p>
        <p>类型: {rowDetail.type}</p>
        <Space.Compact>
        <p style={{width: 40, height: 30}}>金额: </p>
        <InputNumber style={{height: 30}}
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            onChange={(value: number | string | null) => {setMoney(value as number)}}
            defaultValue={String(rowDetail.money)}
          />
        </Space.Compact><br/>
        <Space.Compact>
        <p style={{width: 40, height: 30}}>备注: </p><Input defaultValue={rowDetail.note} style={{height: 30}} onChange={(value) => setNote(value.currentTarget.value)}/>
        </Space.Compact>

      </Modal>
    </>
  );
};


export default UpdateTableConfirm;