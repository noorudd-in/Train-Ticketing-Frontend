import { useEffect, useState } from "react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const { booking } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!booking?.train_number) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-5">Add Passengers</h1>
      <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl rounded-lg">
        <div className="font-bold">
          {booking?.train_name} ({booking?.train_number})
        </div>
        <div className="flex justify-between">
          <span className="hidden lg:block">{booking?.from_station_name}</span>
          <span className="hidden lg:block">{booking?.to_station_name}</span>
        </div>
        <div className="flex justify-between">
          <span>
            {booking?.departure} | {booking?.from_station_code}
          </span>
          <span>
            {booking?.arrival} | {booking?.to_station_code}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Booking;
