import { useEffect, useState } from "react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getProfile } from "../api/auth";

const TrainRoute = ({ data, type }) => {
  const [trainClass, setTrainClass] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, setUser, setIsLoggedIn, setBooking, removeUser } =
    useAppStore();
  const navigate = useNavigate();
  let cost = data?.cost;
  if (trainClass == "3E" || trainClass == "tatkal") {
    cost = cost * 2.5;
  }
  if (trainClass == "3A") {
    cost = cost * 3;
  }
  if (trainClass == "2A") {
    cost = cost * 4;
  }
  if (trainClass == "1A") {
    cost = cost * 6;
  }

  const handleBooking = async (data) => {
    setLoading(true);
    const token = localStorage.getItem("AccessToken");
    const userId = localStorage.getItem("UserId");
    if (!isLoggedIn) {
      setLoading(false);
      toast.error("Please login to book ticket.");
      return;
    }
    if (!token || !userId) {
      setLoading(false);
      setIsLoggedIn(false);
      removeUser();
      toast.error("Please login to book ticket.");
      return;
    }
    const user = await getProfile(token, userId);
    if (!user.success) {
      setLoading(false);
      setIsLoggedIn(false);
      removeUser();
      toast.error("Session Expired Please login again.");
      return;
    }
    setUser({
      id: user.data.id,
      full_name: user.data.full_name,
      email: user.data.email,
      phone_number: user.data.phone_number,
      role: user.data.role,
    });
    let bookingData = {
      train_name: data.train_name,
      train_number: data.train_number,
      departure: data.departure,
      from_station_name: data.from_station_name,
      from_station_code: data.from_station_code,
      from_schedule_id: data.from_schedule_id,
      arrival: data.arrival,
      to_station_name: data.to_station_name,
      to_station_code: data.to_station_code,
      to_schedule_id: data.to_schedule_id,
      class: type == "general" ? trainClass : "SL",
      category: type == "special" ? trainClass : type,
      seats: data[trainClass],
      cost: cost,
    };
    setLoading(false);
    setBooking(bookingData);
    navigate("/booking");
  };

  useEffect(() => {
    setTrainClass(null);
  }, [type]);
  return (
    <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl rounded-lg">
      <div className="font-bold">
        {data?.train_name} ({data?.train_number})
      </div>
      <div className="flex justify-between">
        <span className="hidden lg:block">{data?.from_station_name}</span>
        <span className="hidden lg:block">{data?.to_station_name}</span>
      </div>
      <div className="flex justify-between">
        <span>
          {data?.departure} | {data?.from_station_code}
        </span>
        <span>
          {data?.arrival} | {data?.to_station_code}
        </span>
      </div>
      {type == "general" && (
        <div className="flex flex-wrap gap-2 mt-5">
          {data?.["SL"] && (
            <div
              className={`border btn ${
                trainClass == "SL" ? "btn-active" : "btn-outline"
              } ${data?.["SL"] < 1 ? "btn-error" : "btn-success"}`}
              onClick={() => setTrainClass("SL")}
            >
              SL: {data?.["SL"] < 1 ? "WL" : data?.["SL"]}
            </div>
          )}
          {data?.["3E"] && (
            <div
              className={`border btn ${
                trainClass == "3E" ? "btn-active" : "btn-outline"
              } ${data?.["3E"] < 1 ? "btn-error" : "btn-success"}`}
              onClick={() => setTrainClass("3E")}
            >
              3E: {data?.["3E"] < 1 ? "WL" : data?.["3E"]}
            </div>
          )}
          {data?.["3A"] && (
            <div
              className={`border btn ${
                trainClass == "3A" ? "btn-active" : "btn-outline"
              } ${data?.["2A"] < 1 ? "btn-error" : "btn-success"}`}
              onClick={() => setTrainClass("3A")}
            >
              3A: {data?.["3A"] < 1 ? "WL" : data?.["3A"]}
            </div>
          )}
          {data?.["2A"] && (
            <div
              className={`border btn ${
                trainClass == "2A" ? "btn-active" : "btn-outline"
              } ${data?.["2A"] < 1 ? "btn-error" : "btn-success"}`}
              onClick={() => setTrainClass("2A")}
            >
              2A: {data?.["2A"] < 1 ? "WL" : data?.["2A"]}
            </div>
          )}
          {data?.["1A"] && (
            <div
              className={`border btn ${
                trainClass == "1A" ? "btn-active" : "btn-outline"
              } ${data?.["1A"] < 1 ? "btn-error" : "btn-success"}`}
              onClick={() => setTrainClass("1A")}
            >
              1A: {data?.["1A"] < 1 ? "WL" : data?.["1A"]}
            </div>
          )}
        </div>
      )}

      {type == "special" && (
        <div className="flex flex-wrap gap-2 mt-5">
          <div
            className={`border btn ${
              trainClass == "ladies" ? "btn-active" : "btn-outline"
            } ${data?.["ladies"] < 1 ? "btn-error" : "btn-success"}`}
            onClick={() => setTrainClass("ladies")}
          >
            Ladies: {data?.["ladies"] < 1 ? "WL" : data?.["ladies"]}
          </div>
          <div
            className={`border btn ${
              trainClass == "senior_citizen" ? "btn-active" : "btn-outline"
            } ${data?.["senior_citizen"] < 1 ? "btn-error" : "btn-success"}`}
            onClick={() => setTrainClass("senior_citizen")}
          >
            Senior Citizen:{" "}
            {data?.["senior_citizen"] < 1 ? "WL" : data?.["senior_citizen"]}
          </div>
          <div
            className={`border btn ${
              trainClass == "tatkal" ? "btn-active" : "btn-outline"
            } ${data?.["tatkal"] < 1 ? "btn-error" : "btn-success"}`}
            onClick={() => setTrainClass("tatkal")}
          >
            Tatkal: {data?.["tatkal"] < 1 ? "WL" : data?.["tatkal"]}
          </div>
        </div>
      )}

      <div className="mt-5">
        <button
          className="btn btn-success"
          disabled={trainClass == null || loading}
          onClick={() => handleBooking(data)}
        >
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {loading ? "Please Wait" : `Book Now ${trainClass && `@ ${cost}`}`}
        </button>
      </div>
    </div>
  );
};

export default TrainRoute;
