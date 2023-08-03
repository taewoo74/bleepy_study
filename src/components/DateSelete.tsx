import DatePicker from 'react-datepicker';

interface DateSeleteType {
  startDate: Date;
  onChangeStartDate: (date: Date) => void;
  endDate: Date;
  onChangeEndDate: (date: Date) => void;
  datePickerFormat: string;
  state: boolean;
}

const DateSelete = ({
  startDate,
  onChangeStartDate,
  endDate,
  onChangeEndDate,
  datePickerFormat,
  state,
}: DateSeleteType) => {
  return (
    <>
      <DatePicker
        className="select_box"
        selected={startDate}
        onChange={(date: Date) => onChangeStartDate(date)}
        dateFormat={datePickerFormat}
        showMonthYearPicker={state}
      />

      <DatePicker
        className="select_box"
        selected={endDate}
        onChange={(date: Date) => onChangeEndDate(date)}
        dateFormat={datePickerFormat}
        showMonthYearPicker={state}
      />
    </>
  );
};

export default DateSelete;
