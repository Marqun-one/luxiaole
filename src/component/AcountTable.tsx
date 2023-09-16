import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { AcountInfo } from '../views/content/acount/RecordView';
import { sendGetRequest } from '../utils/AxiosUtil';
import { AcountItems } from '../common/publicConfig/Api';
import { TableDetail } from '../views/content/acount/ReviewAcountView';
import TableOperation from './TableOperation';

// interface DataType {
//   key: React.Key;
//   date: string;
//   type: string;
//   age: number;
//   address: string;
// }

// 表格属性
let columns: ColumnsType<AcountTableInfo> = [
  {
    title: '日期',
    dataIndex: 'date',
    filters: [],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: string | number | boolean, record) => {
      return record.date === value;
    },
    sorter: (a, b) => a.date.localeCompare(b.date),
    sortDirections: ['descend'],
  },
  {
    title: '类型',
    dataIndex: 'type',
    filters: [],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value: string | number | boolean, record) => {
      return record.type === value;
    },
  },
  {
    title: '金额',
    dataIndex: 'money',
  },
  {
    title: '备注',
    dataIndex: 'note'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
];

export interface AcountListInfo extends Omit<AcountInfo, 'type'> {
  type: string;
  fType: number;
}

interface AcountTableInfo extends AcountListInfo {
  key: number;
  operation: React.ReactElement
}
// 行信息
const data: AcountTableInfo[] = [];


interface AcountTableProps {
  tableDetail: TableDetail,
  countIncome: (value: string) => void,
  countSpend: (value: string) => void,
}
const AcountTable: React.FC<AcountTableProps> = (props: AcountTableProps) => {
  const [acountDetail, setAcountDetail] = useState(data);
  const [reload, doReload] = useState(false);
  const { tableDetail, countIncome, countSpend } = props;
  const deleteAcountDetail = () => {
    doReload(!reload);
  }
  const onChange: TableProps<AcountTableInfo>['onChange'] = (pagination, filters, sorter, extra) => {
    let income = 0;
    let spend = 0;
    extra.currentDataSource.forEach(value => {
      // 1是收入
      // 2是支出
      if (value.fType === 1) {
        income += value.money;
      } else {
        spend += value.money;
      }
    })
    countIncome(income.toFixed(2));
    countSpend(spend.toFixed(2));
  };
  useEffect(() => {
    sendGetRequest(AcountItems, tableDetail).then((value) => {
      const acountInfo: AcountListInfo[] = value.data;
      const acountDetailList: AcountTableInfo[] = acountInfo.map((item) => {
        return { ...item, key: item.id, operation: <TableOperation rowDetail={{
          id: item.id,
          date: item.date,
          money: item.money,
          note: item.note,
          type: item.type,
          fType: item.fType, 
        }} updateSource={deleteAcountDetail} /> };
      })
      // columns[0].filters = processToDateFilter(acountDetailList);
      columns[0].filters = Array.from(new Set(acountDetailList.map(item => item.date))).map(name => {
        const info = acountDetailList.find(item => item.date === name);
        return { value: info!.date, text: info!.date };
      });
      columns[1].filters = Array.from(new Set(acountDetailList.map(item => item.type))).map(name => {
        const info = acountDetailList.find(item => item.type === name);
        return { value: info!.type, text: info!.type }
      });
      let income = 0;
      let spend = 0;
      acountInfo.forEach(value => {
        // 1是收入
        // 2是支出
        if (value.fType === 1) {
          income += value.money;
        } else {
          spend += value.money;
        }
      })
      countIncome(income.toFixed(2));
      countSpend(spend.toFixed(2));
      setAcountDetail(acountDetailList);

    })
  }, [reload, tableDetail])
  return <Table columns={columns} dataSource={acountDetail} onChange={onChange} />;
}


export default AcountTable;