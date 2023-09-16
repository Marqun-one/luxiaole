import React, { useState } from 'react'
import AcountTable from '../../../component/AcountTable'
import Timer from '../../../component/Timer'
import dayjs from 'dayjs';

const styleP : React.CSSProperties = {
  float: 'left',
  height: '50',
  marginRight: '1%',
  marginLeft: '10%',
  marginTop: 7,
  lineHeight: '100%'
}
const styleTag : React.CSSProperties = {
  float: 'left',
  height: '50',
  marginRight: '1%',
  marginTop: 7,
  lineHeight: '100%'
}
export interface TableDetail {
  year: string,
  month: string
}
export const defaultDetail: TableDetail = {
  year:'2023', 
  month: String(dayjs().month() + 1)
}
export default function ReviewAcountView() {
  const [date, setDate] = useState(defaultDetail);
  const [spend, setSpend] = useState('222');
  const [income, setIncome] = useState('222');
  return (
    <div>
      <div></div>
      <div style={{height: 50}}>
        <p style={styleP}>日期:</p> <Timer timerChange={(value) => {setDate({year: value.split('-')[0], month: value.split('-')[1]})}} pickerType={'month'} />
        <p style={styleP}>支出:</p><p className='AcountP' style={styleTag}>{spend}</p>
        <p style={styleP}>收入:</p><p className='AcountP' style={styleTag}>{income}</p>
      </div>
      <AcountTable tableDetail={date} countIncome={setIncome} countSpend={setSpend}/>
    </div>
  )
}
