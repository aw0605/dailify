import { create } from "zustand";
import {
  getMonthlyEvents,
  setMonthlyEvent,
  editMonthlyEvent,
  deleteMonthlyEvent,
} from "@/lib/supabase/monthly";
import { v4 as uuidv4 } from "uuid";

import { MonthlyEvent, MonthlyFormValuesProps } from "@/types/monthly";

interface MonthlyStore {
  events: MonthlyEvent[];
  loading: boolean;
  fetchMonthlyEvents: (uid: string) => Promise<void>;
  addEvent: (event: MonthlyFormValuesProps & { uid: string }) => Promise<void>;
  updateEvent: (event: MonthlyEvent) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

const filterAndSortEvents = (events: MonthlyEvent[]) => {
  const today = new Date();
  const endOfMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
    23,
    59,
    59,
  );

  return events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= endOfMonth;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const useMonthlyStore = create<MonthlyStore>((set) => ({
  events: [],
  loading: false,

  fetchMonthlyEvents: async (uid) => {
    set({ loading: true });
    const data = await getMonthlyEvents(uid);
    set({ events: data, loading: false });
  },

  addEvent: async (event) => {
    try {
      await setMonthlyEvent(event);
      const tempEvent = { id: uuidv4(), ...event };
      set((state) => ({
        events: filterAndSortEvents([...state.events, tempEvent]),
      }));
    } catch (error) {
      console.error("이벤트 추가 실패:", error);
    }
  },

  updateEvent: async (updatedEvent) => {
    try {
      await editMonthlyEvent(updatedEvent);
      set((state) => ({
        events: filterAndSortEvents(
          state.events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event,
          ),
        ),
      }));
    } catch (error) {
      console.error("이벤트 수정 실패:", error);
    }
  },

  deleteEvent: async (id) => {
    try {
      await deleteMonthlyEvent(id);
      set((state) => ({
        events: filterAndSortEvents(
          state.events.filter((event) => event.id !== id),
        ),
      }));
    } catch (error) {
      console.error("이벤트 삭제 실패:", error);
    }
  },
}));

export default useMonthlyStore;
