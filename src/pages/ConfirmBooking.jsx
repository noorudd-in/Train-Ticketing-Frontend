import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  const { isLoggedIn, booking, passenger, user } = useAppStore();

  const calculateGST = (cost) => {
    let withoutConvenience = cost - 20;
    let gst = (0.05 * withoutConvenience) / (1 + 0.05);
    gst = gst.toFixed(2);
    return Number(gst);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    if (!booking.train_number || passenger.length <= 0) {
      navigate("/");
      return;
    }
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-5">
        Review Booking Details
      </h1>

      <div className="text-center m-5 font-bold">
        Your ticket will be sent to your registered email {user.email}
      </div>
      <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl rounded-lg">
        <h1 className="mb-2 flex justify-center font-mono">Journey Details</h1>
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
                booking?.category?.slice(1)}{" "}
            / {booking.seats <= 0 ? "WL" : "AVL-" + booking.seats}
          </span>
        </div>
      </div>

      <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl rounded-lg">
        <h1 className="mb-2 flex justify-center font-mono">
          Passenger Details
        </h1>
        {passenger.map((p, i) => {
          return (
            <div className="font-bold text-base lg:text-xl">
              {i + 1}
              {") "}
              {p[`p${i + 1}_name`]} | {p[`p${i + 1}_age`]} |{" "}
              {p[`p${i + 1}_gender`]}
            </div>
          );
        })}
      </div>

      <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl rounded-lg">
        <h1 className="mb-2 flex justify-center font-mono">Fare Details</h1>
        <div className="flex justify-between max-w-80">
          <p>Ticket Fare:</p>
          <p>
            ₹{" "}
            {(booking.cost - calculateGST(booking.cost) - 20) *
              passenger.length}
          </p>
        </div>
        <div className="flex justify-between max-w-80">
          <p>Convenience Fees:</p>
          <p>₹ {20 * passenger.length}</p>
        </div>
        <div className="flex justify-between max-w-80">
          <p>Tax (including GST):</p>
          <p>{calculateGST(booking.cost) * passenger.length}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className="btn btn-error mx-5"
          onClick={() => navigate("/booking")}
        >
          Back
        </button>
        <button className="btn btn-success">Make Payment</button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
