import React, { useEffect, useState } from "react";
import useCalendarStore from "@/zustand/useCalendarStore";
import "react-calendar/dist/Calendar.css";
import { StyledCalendar } from "@/styles/calendars/MonthlyCalendarStyles";

function CalendarComponent() {
  const { selectedDate, setSelectedDate } = useCalendarStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  return (
    <StyledCalendar
      locale="en"
      value={selectedDate}
      onChange={(date) => {
        if (date instanceof Date) {
          setSelectedDate(date);
        }
      }}
      prev2Label={null}
      next2Label={null}
      showNeighboringMonth={false}
      maxDate={new Date()}
      activeStartDate={currentMonth}
      onActiveStartDateChange={({ activeStartDate }) => {
        if (activeStartDate) {
          setCurrentMonth(activeStartDate);
        }
      }}
    />
  );
}

export default CalendarComponent;
