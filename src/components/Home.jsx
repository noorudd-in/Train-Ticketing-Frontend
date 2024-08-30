import React, { useEffect, useState } from "react";
import Search from "./Search";
import axios from "axios";
import { SEARCH_URL } from "../config";
import { ArrowRightLeft, ArrowDownUp } from "lucide-react";
import { toast } from "react-hot-toast";
import { getRoutes } from "../api/search";
import TrainRoute from "./TrainRoute";

const Home = () => {
  const [stations, setStations] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [routes, setRoutes] = useState(null);
  const [searchType, setSearchType] = useState("general");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (fromStation == "") {
      toast.error("Source station is required.");
      return;
    }
    if (toStation == "") {
      toast.error("Destination station is required.");
      return;
    }
    setLoading(true);
    getRoutes(fromStation, toStation).then((res) => {
      setLoading(false);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      setRoutes(res.data);
    });
  };

  const swapStations = () => {
    let tempFromStation = fromStation;
    setFromStation(toStation);
    setToStation(tempFromStation);
  };

  useEffect(() => {
    let inputValue;
    if (showResult == "from") {
      inputValue = fromStation;
    }
    if (showResult == "to") {
      inputValue = toStation;
    }
    if (inputValue == "") {
      return setStations(null);
    }
    setRoutes([
      {
        from_schedule_id: 1,
        to_schedule_id: 2,
        from_station_name: "Chhatrapati Shivaji Maharaj Terminus (Mumbai)",
        from_station_code: "CSMT",
        departure: "21:50",
        to_station_name: "Pune",
        to_station_code: "PUNE",
        arrival: "01:20",
        train_number: 12701,
        train_name: "Hussain Sagar Express",
        cost: 445,
        SL: 75,
        "3E": null,
        "3A": 71,
        "2A": 54,
        "1A": null,
        ladies: 0,
        senior_citizen: 6,
        tatkal: 10,
      },
      {
        from_schedule_id: 33,
        to_schedule_id: 34,
        from_station_name: "Chhatrapati Shivaji Maharaj Terminus (Mumbai)",
        from_station_code: "CSMT",
        departure: "14:00",
        to_station_name: "Pune",
        to_station_code: "PUNE",
        arrival: "17:55",
        train_number: 11019,
        train_name: "Konark Express",
        cost: 740,
        SL: 80,
        "3E": null,
        "3A": 72,
        "2A": 54,
        "1A": null,
        ladies: 6,
        senior_citizen: 6,
        tatkal: 10,
      },
    ]);
    /*
    const debounceTimer = setTimeout(() => {
      if (inputValue) {
        axios.get(`${SEARCH_URL}/station?name=${inputValue}`).then((result) => {
          setStations(result.data.data);
          if (result.data.data[0] == undefined || !result.data.data) {
            setStations(null);
          }
        });
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
    */
  }, [fromStation, toStation]);

  return (
    <>
      <div className="text-center">
        <h1 className="font-bold text-2xl my-5">Book Tickets</h1>
        <div className="flex justify-center items-center">
          <div className="flex flex-col lg:flex-row lg:space-x-4 w-full max-w-xs lg:max-w-2xl">
            <div className="flex flex-col space-y-2 w-full">
              <input
                type="text"
                placeholder="From Station"
                className="input input-bordered"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                onClick={() => setShowResult("from")}
              />
              {showResult == "from" && stations && (
                <Search
                  stations={stations}
                  setStation={setFromStation}
                  setShowResult={setShowResult}
                  category="from"
                />
              )}
            </div>
            <div
              className="flex justify-center mt-2 cursor-pointer"
              onClick={swapStations}
            >
              <span className="hidden lg:block">
                <ArrowRightLeft />
              </span>
              <span className="block lg:hidden">
                <ArrowDownUp />
              </span>
            </div>
            <div className="flex flex-col space-y-2 mt-2 lg:mt-0 w-full">
              <input
                type="text"
                placeholder="To Station"
                className="input input-bordered"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                onClick={() => setShowResult("to")}
              />
              {showResult == "to" && stations && (
                <Search
                  stations={stations}
                  setStation={setToStation}
                  setShowResult={setShowResult}
                  category="to"
                />
              )}
            </div>
          </div>
        </div>

        <select
          className="select select-bordered w-full max-w-xs mt-5"
          defaultValue="general"
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="general">General</option>
          <option value="special">Ladies</option>
          <option value="special">Senior Citizen</option>
          <option value="special">Tatkal</option>
        </select>

        <div className="mt-5">
          <button
            className="btn btn-primary"
            disabled={loading}
            onClick={handleSearch}
          >
            {loading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            {loading ? "Searching..." : "Search Trains"}
          </button>
        </div>
      </div>

      {routes && (
        <div className="mt-5">
          <h1 className="text-center font-bold text-2xl">Available Routes</h1>
          {routes.map((route) => {
            return (
              <TrainRoute
                key={route.train_number}
                data={route}
                type={searchType}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
