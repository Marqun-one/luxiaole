import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs'

interface TimerProps {
  timerChange: (value: string) => void,
  pickerType: any
}

export default function Timer(props: TimerProps) {
    const hadnleOnChange: DatePickerProps['onChange'] = (dateValue, dateString) => {
      const {timerChange} = props;
      timerChange(dateString);
    };
  return (
    <div className='RecordTimer'><DatePicker onChange={hadnleOnChange} defaultValue={dayjs()} picker={props.pickerType}/></div>
  )
}
