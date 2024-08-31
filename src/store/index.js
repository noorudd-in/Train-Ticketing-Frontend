import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLoggedIn: false,
  user: {
    id: null,
    full_name: null,
    email: null,
    phone_number: null,
    role: null,
  },
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
    seats: null,
    cost: null,
  },
  passenger: [],
  setIsLoggedIn: (data) => set({ isLoggedIn: data }),
  setUser: (data) => set({ user: data }),
  setBooking: (data) => set({ booking: data }),
  setPassenger: (data) => set({ passenger: data }),
  removeUser: () =>
    set({
      user: {
        id: null,
        full_name: null,
        email: null,
        phone_number: null,
        role: null,
      },
    }),
  removeBooking: () =>
    set({
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
        seats: null,
        cost: null,
      },
    }),
  removePassenger: () => set({ passenger: [] }),
}));
