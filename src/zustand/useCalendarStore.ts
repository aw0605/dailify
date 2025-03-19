import { create } from "zustand";

interface CalendarState {
  selectedDate: Date | null;
  selectedWeek: { start: Date; end: Date } | null;
  setSelectedDate: (date: Date | null, isWeekly: boolean) => void;
  prevDay: () => void;
  nextDay: () => void;
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
  setSelectedDate: (date, isWeekly = false) => {
    if (!date) return;

    if (isWeekly) {
      const start = getMonday(date);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      set({ selectedDate: date, selectedWeek: { start, end } });
    } else {
      set({ selectedDate: date, selectedWeek: null });
    }
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
}));

export default useCalendarStore;
