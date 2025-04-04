import { create } from "zustand";

interface CalendarState {
  selectedDate: Date | null;
  selectedWeek: { start: Date; end: Date } | null;
  selectedMonth: Date | null;
  setSelectedDate: (date: Date | null) => void;
  setSelectedMonth: (date: Date | null) => void;
  prevDay: () => void;
  nextDay: () => void;
  prevMonth: () => void;
  nextMonth: () => void;
}

const getMonday = (date: Date) => {
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
};

const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedDate: new Date(),
  selectedWeek: (() => {
    const today = new Date();
    const start = getMonday(today);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start, end };
  })(),
  selectedMonth: new Date(),
  setSelectedDate: (date) => {
    if (!date) return;

    const start = getMonday(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    set({ selectedDate: date, selectedWeek: { start, end } });
  },
  setSelectedMonth: (date) => {
    if (!date) return;
    set({ selectedMonth: new Date(date.getFullYear(), date.getMonth(), 1) });
  },
  prevDay: () => {
    const { selectedDate } = get();
    if (selectedDate) {
      const prevDate = new Date(selectedDate);
      prevDate.setDate(prevDate.getDate() - 1);

      set({ selectedDate: prevDate });
    }
  },
  nextDay: () => {
    const { selectedDate } = get();
    if (selectedDate) {
      const nextDate = new Date(selectedDate);
      nextDate.setDate(nextDate.getDate() + 1);

      set({ selectedDate: nextDate });
    }
  },
  prevMonth: () => {
    const { selectedMonth } = get();
    if (selectedMonth) {
      const prevMonth = new Date(selectedMonth);
      prevMonth.setMonth(prevMonth.getMonth() - 1);

      set({ selectedMonth: prevMonth });
    }
  },
  nextMonth: () => {
    const { selectedMonth } = get();
    if (selectedMonth) {
      const nextMonth = new Date(selectedMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      set({ selectedMonth: nextMonth });
    }
  },
}));

export default useCalendarStore;
