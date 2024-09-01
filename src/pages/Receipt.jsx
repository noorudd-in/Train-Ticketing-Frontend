import { useEffect } from "react";
import { useReward } from "react-rewards";
import { Ticket, Tickets, ArrowDownToLine } from "lucide-react";
import {
  get12HrTime,
  getPassengerArray,
  getLocaleDate,
} from "../config/helper";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";

const Receipt = () => {
  const { reward } = useReward("rewardId", "confetti");
  const { isLoggedIn, ticket } = useAppStore();
  const passengers = ticket?.passengers
    ? getPassengerArray(ticket?.passengers)
    : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    if (!ticket.pnr) {
      navigate("/");
      return;
    }
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
              <span>{ticket.pnr}</span>
            </h1>

            <div className="flex justify-between flex-col lg:flex-row mt-2">
              <p>Booked On: {getLocaleDate(ticket.booked)}</p>
              <p>
                Cancelled On:{" "}
                {ticket.cancelled ? getLocaleDate(ticket.cancelled) : "N/A"}
              </p>
            </div>
            <div className="flex justify-between flex-col lg:flex-row">
              <p>
                Status:{" "}
                <span className="text-emerald-400">
                  {ticket?.status?.[0]?.toUpperCase() +
                    ticket?.status?.slice(1)}
                </span>
              </p>
              <p>Cost: ₹ {ticket.total_cost}</p>
            </div>
          </div>
        </div>

        <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl">
          <div className="text-center">
            <h1>
              {ticket?.train?.name} ({ticket?.train?.number})
            </h1>
          </div>
          <div className="flex justify-between">
            <p>Departure</p>
            <p>Arrival</p>
          </div>
          <div className="flex justify-between">
            <p className="flex gap-2">
              <span className="hidden lg:block">
                {ticket?.schedule?.from_station_name} -
              </span>
              {ticket?.schedule?.from_station_code}
            </p>
            <p className="flex gap-2">
              <span className="hidden lg:block">
                {ticket?.schedule?.to_station_name} -
              </span>
              {ticket?.schedule?.to_station_code}
            </p>
          </div>
          <div className="flex justify-between">
            <span>
              {ticket?.schedule?.departure} (
              {get12HrTime(ticket?.schedule?.departure)})
            </span>
            <span>
              {ticket?.schedule?.arrival} (
              {get12HrTime(ticket?.schedule?.arrival)})
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
