import React from "react"

type DatePickerProps = {
  selectedDate: string
  onDateChange: (date: string) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
        Select Date
      </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
      />
    </div>
  )
}

export default DatePicker
