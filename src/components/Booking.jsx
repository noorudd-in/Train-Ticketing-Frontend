import { useEffect, useState } from "react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Passengers from "./Passengers";

const Booking = () => {
  const [passengers, setPassengers] = useState([
    { name: "", age: "", gender: "" },
  ]);
  const { booking, passenger, setPassenger } = useAppStore();
  const navigate = useNavigate();

  const deletePassenger = (index) => {
    if (passengers.length <= 1) {
      return;
    }
    const newPassengers = [...passengers];
    newPassengers.splice(index, 1);
    setPassengers(newPassengers);
  };

  const addPassenger = () => {
    let len = passengers.length;
    if (len >= 6) {
      return;
    }
    let newPassengers = [...passengers, { name: "", age: "", gender: "" }];
    setPassengers(newPassengers);
  };

  const updatePassengerDetails = (no, type, input) => {
    const passengerDetails = [...passengers];
    passengerDetails[no][type] = input;
    setPassengers(passengerDetails);
  };

  const validatePassenger = (data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].name == "") {
        toast.error(`Passenger ${i + 1} name is required.`);
        return false;
      }
      if (data[i].age == "") {
        toast.error(`Passenger ${i + 1} age is required.`);
        return false;
      }
      if (data[i].gender == "") {
        toast.error(`Passenger ${i + 1} gender is required.`);
        return false;
      }
      if (Number(data[i].age) < 1 || Number(data[i].age) > 100) {
        toast.error(`Passenger ${i + 1} age must be between 1 to 100 years.`);
        return false;
      }
      if (booking.category == "ladies" && data[i].gender != "F") {
        toast.error("Only female passengers are allowed under Ladies category");
        return;
      }
      if (booking.category == "senior_citizen" && Number(data[i].age < 60)) {
        toast.error("Senior citizen age must be greater than 60 years.");
        return;
      }
    }
    return true;
  };

  const handleConfirm = () => {
    const res = validatePassenger(passengers);
    if (!res) {
      return;
    }
    let details = [];
    passengers.map((passenger, index) => {
      let p = {
        [`p${index + 1}_name`]: passenger.name,
        [`p${index + 1}_age`]: passenger.age,
        [`p${index + 1}_gender`]: passenger.gender,
      };
      details.push(p);
    });
    setPassenger(details);
  };

  useEffect(() => {
    if (!booking?.train_number) {
      navigate("/");
    }
    if (passenger[0]) {
      setPassengers(passenger);
    }
  }, []);

  return (
    <div className="mb-24">
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
        <div className="flex justify-center">
          <span className="badge text-lg font-semibold bg-sky-800 p-3">
            {booking?.class} /{" "}
            {booking?.category == "senior_citizen"
              ? "Senior Citizen"
              : booking?.category?.[0]?.toUpperCase() +
                booking?.category?.slice(1)}
          </span>
        </div>
      </div>

      {passengers.map((passenger, index) => {
        return (
          <Passengers
            key={index}
            no={index}
            data={passenger}
            deletePassenger={deletePassenger}
            onChange={updatePassengerDetails}
          />
        );
      })}

      {passengers.length <= 5 && (
        <div className="m-5">
          <button className="btn btn-neutral" onClick={addPassenger}>
            Add Passenger
          </button>
        </div>
      )}

      <div className="flex justify-center">
        <button className="btn btn-error mx-5" onClick={() => navigate("/")}>
          Back
        </button>
        <button className="btn btn-success" onClick={handleConfirm}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Booking;
