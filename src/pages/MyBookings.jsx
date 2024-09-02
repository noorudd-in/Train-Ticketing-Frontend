import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import { getBookings } from "../api/book";
import { toast } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { getLocaleDate } from "../config/helper";

const MyBookings = () => {
  const [tickets, setTickets] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, removeUser } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("AccessToken");
    const userId = localStorage.getItem("UserId");
    if (!isLoggedIn) {
      setLoading(false);
      navigate("/");
    }
    if (!token || !userId) {
      setLoading(false);
      removeUser();
      navigate("/");
    }

    getBookings(token, userId).then((res) => {
      setLoading(false);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      if (res.data.length <= 0) {
        setTickets(null);
        return;
      }
      setTickets(res.data);
    });
  }, []);
  return (
    <>
      {loading && (
        <div className="grid place-items-center mt-32 font-bold">
          <span className="loading loading-spinner loading-lg"></span>
          <h1 className="mt-5">Please wait while we fetch your bookings</h1>
        </div>
      )}
      {!loading && !tickets && (
        <>
          <h1 className="text-center text-lg lg:text-2xl font-bold mt-32">
            No Bookings found!
          </h1>
          <div className="flex justify-center mt-5">
            <button className="btn btn-neutral" onClick={() => navigate("/")}>
              Book Now
            </button>
          </div>
        </>
      )}

      {!loading && tickets && (
        <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mt-5 mb-24">
          {tickets.map((ticket) => {
            return (
              <div className="item mx-5 my-2 text-base lg:text-xl">
                <div>
                  <h1
                    className={`${
                      ticket.status == "booked"
                        ? "bg-emerald-400 text-black"
                        : " bg-red-500 text-gray-200"
                    } font-bold inline-block py-1 px-3 lg:px-5 rounded-t-lg`}
                  >
                    {ticket.status == "booked" ? "Booked" : "Cancelled"}
                  </h1>
                </div>
                <div className="bg-stone-700 py-2 px-3 lg:px-5 rounded-b-lg rounded-tr-lg">
                  <h1>PNR: {ticket.pnr}</h1>
                  <div className="flex justify-between">
                    <p>{ticket.from_station_code}</p>
                    <p>
                      <ArrowRight />
                    </p>
                    <p>{ticket.to_station_code}</p>
                  </div>
                  <div>
                    {ticket.class} |{" "}
                    {ticket.category[0].toUpperCase() +
                      ticket.category.slice(1)}
                  </div>
                  <div>Booked On: {getLocaleDate(ticket.booked)}</div>
                  {ticket.status == "cancelled" && (
                    <div>Cancelled On: {getLocaleDate(ticket.cancelled)}</div>
                  )}
                  <div className="mt-2">
                    <button
                      className="btn btn-active btn-ghost"
                      onClick={() => navigate(`/ticket/${ticket.pnr}`)}
                    >
                      View Ticket
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyBookings;
