import DatePicker from 'react-datepicker';

interface DateSeleteType {
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
  datePickerFormat: string;
}

const DateSelete = ({
  startDate,
  onChangeStartDate,
  endDate,
  onChangeEndDate,
  datePickerFormat,
}: DateSeleteType) => {
  return (
    <>
      <DatePicker
        className="select_box"
        selected={startDate}
        onChange={(date: Date) => onChangeStartDate(date)}
        dateFormat={datePickerFormat}
      />

      <DatePicker
        className="select_box"
        selected={endDate}
        onChange={(date: Date) => onChangeEndDate(date)}
        dateFormat={datePickerFormat}
      />
    </>
  );
};

export default DateSelete;
