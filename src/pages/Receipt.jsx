import { useEffect } from "react";
import { useReward } from "react-rewards";
import { Ticket, Tickets, ArrowDownToLine } from "lucide-react";
import {
  get12HrTime,
  getPassengerArray,
  getLocaleDate,
} from "../config/helper";

const data = {
  id: 1,
  pnr: "1725186949149",
  status: "booked",
  class: "SL",
  category: "general",
  total_cost: 445,
  booked: "2024-09-01T10:35:49.000Z",
  cancelled: null,
  train: {
    number: 12701,
    name: "Hussain Sagar Express",
  },
  schedule: {
    from_station_name: "Chhatrapati Shivaji Maharaj Terminus (Mumbai)",
    from_station_code: "CSMT",
    to_station_name: "Nampally (Hyderabad)",
    to_station_code: "HYB",
    departure: "21:50",
    arrival: "12:05",
  },
  passengers: {
    p1_name: "Nooruddin Kamruddin Shaikh",
    p1_age: 24,
    p1_gender: "M",
    p1_status: "CNF/SL/80/SIDE UPPER",
    p2_name: "Nooruddin Kamruddin Shaikh",
    p2_age: 24,
    p2_gender: "M",
    p2_status: "CNF/SL/79/SIDE LOWER",
  },
};

const Receipt = () => {
  const { reward } = useReward("rewardId", "confetti");
  const passengers = getPassengerArray(data.passengers);

  useEffect(() => {
    reward();
  }, []);
  return (
    <>
      <div className="absolute top-72 left-1/2">
        <span id="rewardId" />
      </div>

      <div id="ticketContainer" className="print-only">
        <div className="text-emerald-500">
          <div className=" flex justify-center">
            <Tickets size={100} style={{ transform: "rotate(-30deg)" }} />
          </div>
          <h1 className="text-2xl lg:text-5xl font-bold text-center my-5">
            Ticket Confirmed!
          </h1>
        </div>

        <div className="bg-base-200 m-5 py-2 px-3 lg:px-5">
          <div className="text-base lg:text-xl">
            <h1 className="text-center">
              <span className="font-semibold">PNR: </span>
              <span>{data.pnr}</span>
            </h1>

            <div className="flex justify-between flex-col lg:flex-row mt-2">
              <p>Booked On: {getLocaleDate(data.booked)}</p>
              <p>
                Cancelled On:{" "}
                {data.cancelled ? getLocaleDate(data.cancelled) : "N/A"}
              </p>
            </div>
            <div className="flex justify-between flex-col lg:flex-row">
              <p>
                Status:{" "}
                <span className="text-emerald-400">
                  {data.status[0].toUpperCase() + data.status.slice(1)}
                </span>
              </p>
              <p>Cost: ₹ {data.total_cost}</p>
            </div>
          </div>
        </div>

        <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl">
          <div className="text-center">
            <h1>
              {data.train.name} ({data.train.number})
            </h1>
          </div>
          <div className="flex justify-between">
            <p>Departure</p>
            <p>Arrival</p>
          </div>
          <div className="flex justify-between">
            <p className="flex gap-2">
              <span className="hidden lg:block">
                {data.schedule.from_station_name} -
              </span>
              {data.schedule.from_station_code}
            </p>
            <p className="flex gap-2">
              <span className="hidden lg:block">
                {data.schedule.to_station_name} -
              </span>
              {data.schedule.to_station_code}
            </p>
          </div>
          <div className="flex justify-between">
            <span>
              {data.schedule.departure} ({get12HrTime(data.schedule.departure)})
            </span>
            <span>
              {data.schedule.arrival} ({get12HrTime(data.schedule.arrival)})
            </span>
          </div>
        </div>

        <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl">
          {passengers.map((p, i) => {
            return (
              <div
                key={p[3]}
                className="flex flex-col lg:flex-row justify-between my-2"
              >
                <div>
                  {i + 1}
                  {") "}
                  {p[0]} | {p[1]} | {p[2]}
                </div>
                <div className="font-semibold">{p[3]}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center mt-5 mb-24 gap-2 no-print">
        <button className="btn btn-neutral" onClick={() => window.print()}>
          <ArrowDownToLine />
          Download Ticket
        </button>
        <button className="btn btn-neutral">
          <Ticket />
          See Bookings
        </button>
      </div>
    </>
  );
};

export default Receipt;
