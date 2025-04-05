import { create } from "zustand";
import { deleteDdayEvent, getMyData, setDdayEvent } from "@/lib/supabase/my";

import { DdayEvent } from "@/types/dday";
import { StatProps } from "@/types/dashboard";

interface MyStoreState {
  ddayEvents: DdayEvent[];
  totalStat: StatProps;
  fetchMyData: (uid: string) => Promise<void>;
  addEvent: (event: Omit<DdayEvent, "id"> & { uid: string }) => void;
  deleteEvent: (id: string) => void;
}

const useMyStore = create<MyStoreState>((set, get) => ({
  ddayEvents: [],
  totalStat: { total: 0, completed: 0, incompleted: 0, rate: 0 },

  fetchMyData: async (uid) => {
    const data = await getMyData(uid);
    set({
      ddayEvents: data.ddayEvents,
      totalStat: data.totalStat,
    });
  },

  addEvent: async (event) => {
    try {
      const newEvent = await setDdayEvent(event);
      set((state) => ({
        ddayEvents: [...state.ddayEvents, { id: newEvent.id, ...event }].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ),
      }));
    } catch (error) {
      console.error("D-day 이벤트 추가 실패:", error);
    }
  },

  deleteEvent: async (id) => {
    try {
      await deleteDdayEvent(id);
      set((state) => ({
        ddayEvents: state.ddayEvents.filter((event) => event.id !== id),
      }));
    } catch (error) {
      console.error("D-day 이벤트 삭제 실패:", error);
    }
  },
}));

export default useMyStore;
