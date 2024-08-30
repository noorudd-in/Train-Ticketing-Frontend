import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLoggedIn: false,
  booking: {
    train_name: null,
    train_number: null,
    departure: null,
    from_station_name: null,
    from_station_code: null,
    from_schedule_id: null,
    arrival: null,
    to_station_name: null,
    to_station_code: null,
    to_schedule_id: null,
    class: null,
    category: null,
  },
  passenger: [],
  setIsLoggedIn: (data) => set({ isLoggedIn: data }),
  setBooking: (data) => set({ booking: data }),
  setPassenger: (data) => set({ passenger: data }),
  removeBooking: () =>
    set({
      booking: {
        train_name: null,
        train_number: null,
        from_station_name: null,
        from_station_code: null,
        from_schedule_id: null,
        to_station_name: null,
        to_station_code: null,
        to_schedule_id: null,
        class: null,
        category: null,
      },
    }),
  removePassenger: () => set({ passenger: [] }),
}));
