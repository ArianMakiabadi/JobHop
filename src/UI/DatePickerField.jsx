import DatePicker from "react-multi-date-picker";

function DatePickerField({ label, date, setDate }) {
  return (
    <div>
      <label className="mb-2  block text-secondary-700">{label}</label>
      <DatePicker
        containerClassName="w-full"
        inputClass="textField__input w-full"
        value={date}
        onChange={(date) => setDate(date)}
        format="DD/MM/YYYY"
        calendarPosition="top-center"
      />
    </div>
  );
}

export default DatePickerField;
