import { create } from "zustand";

interface CalendarState {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  prevDay: () => void;
  nextDay: () => void;
}

const useCalendarStore = create<CalendarState>((set, get) => ({
  selectedDate: new Date(),
  setSelectedDate: (date) => set({ selectedDate: date }),
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
