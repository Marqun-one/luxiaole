import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import type { BadgeProps, CalendarProps, RadioChangeEvent } from 'antd';
import { Badge, Calendar } from 'antd';
import { sendGetRequest, sendPostRequest } from '../../../utils/AxiosUtil';
import { AddStillOnDetail, DelStillOnDetail, StillOnDetail } from '../../../common/publicConfig/Api';
import { Button, Input, InputNumber, Modal, Space, message } from 'antd';
import { Radio } from 'antd';
import { async } from 'q';
import { resolve } from 'path';

export interface StillOnDetail {
  id?: number;
  year: number;
  month: number;
  day: number;
  info: string;
  status: string;
}

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  {
    label: '成功',
    value: 'success',
  },
  {
    label: '警告',
    value: 'warning',
  },
  {
    label: '失败',
    value: 'error',
  },
];

const getListData = (value: Dayjs, stillOnDetailList: StillOnDetail[]) => {
  const year = value.year();
  const month = value.month() + 1;
  const day = value.date();
  let res: { type: string; content: string }[] = []
  stillOnDetailList.forEach(item => {
    if (item.year === year && item.month === month && item.day === day) {
      res = [...res, { type: item.status, content: item.info }]
    }
  })
  return res;
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const defaultStillOnDetailList: StillOnDetail[] = [];

const TimeOut: React.FC = () => {
  const today = dayjs()
  const [renderInfoList, setRenderInfoList] = useState(defaultStillOnDetailList)
  const [messageApi, contextHolder] = message.useMessage();
  const [typeValue, setTypeValue] = useState('success');
  const [open, setOpen] = useState(false);
  const [curDate, setCurDate] = useState(today)
  const [info, setInfo] = useState('');
  useEffect(() => {
    sendGetRequest(StillOnDetail).then((value) => {
      setRenderInfoList(value.data);
    })
  }, []);

  const showModal = () => {
    setOpen(true);
  };

   const handleConfirm = async () => {
    setOpen(false);
    if (info === null || info === '' || info === undefined) {
      messageApi.open({
        type: 'error',
        content: '输入非法,请重新输入!',
      });
      return;
    }
    const stillOnDetailItem: StillOnDetail = {
      year: curDate.year(),
      month: curDate.month() + 1,
      day: curDate.date(),
      info: info,
      status: typeValue
    }
    console.log(stillOnDetailItem)
    setRenderInfoList([...renderInfoList, stillOnDetailItem])
      await sendPostRequest(AddStillOnDetail, stillOnDetailItem).then(response => {
        const repMsg = response.data;
        if(repMsg === 'success') {
          messageApi.open({
            type: 'success',
            content: '添加成功!',
          });
          return;
        } 
        messageApi.open({
          type: 'error',
          content: '添加失败!',
        });
      });

  };

  const handleCancel = () => {
    setOpen(false);
  };

  // 以月为单位进行渲染
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return (
      <div className="notes-month">
        <section>暂未实现</section>
      </div>
    )
  };

  const deleteItem = (value: { type: string; content: string;}, date: Dayjs) => {
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();
    const delPo: StillOnDetail = {
      year: year,
      month: month,
      day: day,
      info: value.content,
      status: value.type
    }
    sendPostRequest(DelStillOnDetail, delPo).then((req) => {
        setRenderInfoList(renderInfoList.filter(item => !(item.year === year 
          && item.month === month 
          && item.day === day 
          && item.status === value.type 
          && item.info === value.content)))
    })
  }

  // 以日为单位进行渲染
  const dateCellRender = (value: Dayjs, canDelete: boolean = false) => {
    const listData = getListData(value, renderInfoList);
    if(canDelete) {
      return (
        <ul className="events">
          {listData.map((item) => (
            <li key={item.content}>
              <Badge status={item.type as BadgeProps['status']} text={item.content} />
                <Button style={{marginLeft: '10%', marginBottom: '2px'}} onClick={ async ()=>deleteItem(item, value)}>删除</Button>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps['status']} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const handleTypeChange = (value: RadioChangeEvent) => {
    setTypeValue(value.target.value);
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (<div>
      <div>
      {contextHolder}
      </div>
      <Modal
        title="详情信息"
        open={open}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <p><b>日期:</b> {curDate.format('YYYY-MM-DD')}</p>
        <p><b>今天发生了什么:</b></p>
        {
          dateCellRender(curDate, true)
        }
        <p style={{width: 40, height: 30}}>新增: </p>
        <Space.Compact>
        <p style={{width: 40, height: 30}}>类型: </p>
        <Radio.Group options={options} onChange={handleTypeChange} value={typeValue} />
        </Space.Compact><br/>
        <p style={{width: 40, height: 30}}>内容: </p>
        <Input defaultValue={''} style={{height: 30}} onChange={(value) => setInfo(value.currentTarget.value)}/>

      </Modal>
    <Calendar cellRender={cellRender} onSelect={(date, info) => {
      if(date.year() === curDate.year() && date.month() === curDate.month()) {
        showModal()
      }
      setCurDate(date)
    }} />;
  </div>)
};

export default TimeOut;