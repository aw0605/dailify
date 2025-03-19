import { useEffect, useState } from "react";
import useCalendarStore from "@/zustand/useCalendarStore";
import "react-calendar/dist/Calendar.css";
import { StyledCalendar } from "@/styles/calendars/MonthlyCalendarStyles";

function CalendarComponent({ isWeekly = false }: { isWeekly?: boolean }) {
  const { selectedDate, setSelectedDate, selectedWeek } = useCalendarStore();
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
          setSelectedDate(date, isWeekly);
        }
      }}
      prev2Label={null}
      next2Label={null}
      showNeighboringMonth={isWeekly ? true : false}
      maxDate={new Date()}
      activeStartDate={currentMonth}
      tileClassName={({ date }) => {
        if (!isWeekly || !selectedWeek) return "";
        const { start, end } = selectedWeek;
        if (date >= start && date <= end) {
          const day = date.getDay();
          if (day === 1) return "active-week start";
          if (day === 0) return "active-week end";
          return "active-week";
        }
        return "";
      }}
      onActiveStartDateChange={({ activeStartDate }) => {
        if (activeStartDate) {
          setCurrentMonth(activeStartDate);
        }
      }}
      $isWeekly={isWeekly}
    />
  );
}

export default CalendarComponent;
