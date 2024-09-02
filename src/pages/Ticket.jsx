import { useEffect, useState } from "react";
import { cancelTicket, getTicket } from "../api/book";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowDownToLine,
  TicketCheck,
  TicketX,
  TicketSlash,
} from "lucide-react";
import {
  get12HrTime,
  getLocaleDate,
  getPassengerArray,
} from "../config/helper";

const Ticket = () => {
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate();
  const { pnr } = useParams();
  const token = localStorage.getItem("AccessToken");
  const userId = localStorage.getItem("UserId");

  const handleCancel = async () => {
    if (
      !window.confirm(
        "Are you sure you want to cancel the ticket? The action is irrevisble!"
      )
    ) {
      return;
    }
    toast.loading("Cancellation in progress");
    const headers = {
      authtoken: token,
    };
    const cancelledTicket = await cancelTicket(pnr, userId, headers);
    if (!cancelledTicket.success) {
      toast.dismiss();
      toast.error(cancelledTicket.message);
      return;
    }
    await getTicket(pnr, userId, headers).then((res) => {
      toast.dismiss();
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setTicket(res.data);
      setPassengers(getPassengerArray(res.data.passengers));
    });
  };

  useEffect(() => {
    setLoading(true);
    if (!token || !userId) {
      toast.error("Session Expired, Please login again.");
      navigate("/");
      return;
    }

    const headers = {
      authtoken: token,
    };
    getTicket(pnr, userId, headers).then((res) => {
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setTicket(res.data);
      setPassengers(getPassengerArray(res.data.passengers));
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading && (
        <div className="grid place-items-center mt-32 font-bold">
          <span className="loading loading-spinner loading-lg"></span>
          <h1 className="mt-5">
            Please wait while we fetch your ticket details.
          </h1>
        </div>
      )}

      {!loading && !ticket && (
        <>
          <h1 className="text-center text-lg lg:text-2xl font-bold mt-32">
            Invalid Ticket / PNR
          </h1>
        </>
      )}

      {!loading && ticket && (
        <div>
          <div
            className={
              ticket.status == "booked" ? "text-emerald-500" : "text-red-500"
            }
          >
            <div className=" flex justify-center">
              {ticket.status == "booked" ? (
                <TicketCheck size={100} />
              ) : (
                <TicketX size={100} />
              )}
            </div>
            <h1 className="text-2xl lg:text-5xl font-bold text-center my-5">
              {ticket.status == "booked" ? "Booked" : "Cancelled"}
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
                {ticket.status == "cancelled" && (
                  <p>Cancelled On: {getLocaleDate(ticket.cancelled)}</p>
                )}
              </div>
              <div className="flex justify-between flex-col lg:flex-row">
                <p>
                  Status:{" "}
                  <span
                    className={
                      ticket.status == "booked"
                        ? "text-emerald-400"
                        : "text-red-500"
                    }
                  >
                    {ticket?.status?.[0]?.toUpperCase() +
                      ticket?.status?.slice(1)}
                  </span>
                </p>
                <p>Cost: ₹ {ticket.total_cost}</p>
                {ticket.status == "cancelled" && (
                  <p>Refund Amount: ₹ {ticket.total_cost * 0.8}</p>
                )}
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
                {get12HrTime(ticket.schedule.departure)})
              </span>
              <span>
                {ticket?.schedule?.arrival} (
                {get12HrTime(ticket.schedule.arrival)})
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

          {ticket.status == "cancelled" && (
            <h1 className="text-center mx-5">
              A refund amount of ₹{ticket.total_cost * 0.8} will be credited to
              your bank account shortly.
            </h1>
          )}

          <div className="flex justify-center mt-5 mb-24 gap-2 no-print">
            <button className="btn btn-neutral" onClick={() => window.print()}>
              <ArrowDownToLine />
              Download Ticket
            </button>
            {ticket.status == "booked" && (
              <button className="btn btn-error" onClick={handleCancel}>
                <TicketSlash />
                Cancel Ticket
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Ticket;
