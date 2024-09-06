import { useEffect, useState } from "react";
import { ArrowRightLeft, ArrowDownUp, MoveRight } from "lucide-react";
import { toast } from "react-hot-toast";
import { getRoutes, getStations } from "../api/search";
import { useAppStore } from "../store";
import Search from "../components/Search";
import TrainRoute from "../components/TrainRoute";
let defaultStations = [
  { id: 1, code: "CSMT", name: "Mumbai" },
  { id: 2, code: "NDLS", name: "New Delhi" },
  { id: 3, code: "HYB", name: "Hyderabad" },
  { id: 4, code: "HWH", name: "Kolkata" },
  { id: 5, code: "PNBE", name: "Kanpur" },
  { id: 6, code: "MAS", name: "Chennai" },
  { id: 7, code: "SBC", name: "Bengaluru" },
];

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "New Delhi",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Home = () => {
  const [tab, setTab] = useState("stations");
  const [stations, setStations] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [routes, setRoutes] = useState(null);
  const [searchType, setSearchType] = useState("general");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const { removePassenger, removeBooking } = useAppStore();

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
    toast.loading("Searching for routes");
    getRoutes(fromStation, toStation).then((res) => {
      setLoading(false);
      if (!res.success) {
        toast.dismiss();
        toast.error(res.message);
        return;
      }
      toast.dismiss();
      setRoutes(res.data);
      setResult([fromStation, toStation]);
    });
  };

  const swapStations = () => {
    let tempFromStation = fromStation;
    setFromStation(toStation);
    setToStation(tempFromStation);
  };

  const handleTabs = (tab) => {
    setTab(tab);
    if (tab == "states") {
      if (fromStation == "") {
        setFromStation("Maharashtra");
      }
      if (toStation == "") {
        setToStation("New Delhi");
      }
    }
  };

  useEffect(() => {
    // Make booking and passenger state empty.
    removeBooking();
    removePassenger();
  }, []);

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
    setStations(defaultStations);
    const debounceTimer = setTimeout(() => {
      if (inputValue) {
        getStations(inputValue).then((res) => {
          if (!res.success) {
            setStations(null);
          }
          setStations(res.data);
        });
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [fromStation, toStation]);

  return (
    <>
      <div className="text-center">
        <h1 className="font-bold text-2xl my-5">Book Tickets</h1>

        <div className="flex justify-center mb-5">
          <div
            role="tablist"
            className="tabs tabs-boxed w-full max-w-xs lg:max-w-2xl"
          >
            <a
              role="tab"
              className={`tab ${tab == "stations" ? "tab-active" : ""}`}
              onClick={() => handleTabs("stations")}
            >
              Stations
            </a>
            <a
              role="tab"
              className={`tab ${tab == "states" ? "tab-active" : ""}`}
              onClick={() => handleTabs("states")}
            >
              States
            </a>
          </div>
        </div>

        {tab == "stations" && (
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
        )}

        {tab == "states" && (
          <div className="flex justify-center items-center">
            <div className="flex flex-col lg:flex-row lg:space-x-4 w-full max-w-xs lg:max-w-2xl">
              <div className="flex flex-col space-y-2 w-full">
                <select
                  className="select select-bordered w-full max-w-xs text-base"
                  onChange={(e) => setFromStation(e.target.value)}
                  value={fromStation != "" ? fromStation : "Maharashtra"}
                >
                  {states.map((state, index) => {
                    return (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
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
                <select
                  className="select select-bordered w-full max-w-xs text-base"
                  onChange={(e) => setToStation(e.target.value)}
                  value={toStation != "" ? toStation : "New Delhi"}
                >
                  {states.map((state, index) => {
                    return (
                      <option value={state} key={state}>
                        {state}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        )}

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
        <div className="mt-5 mb-24">
          <h1 className="text-center font-bold text-2xl">Available Routes</h1>
          <div className="flex justify-center text-base lg:text-xl">
            <span>{result[0]}</span>
            <span className="mx-2 flex justify-center items-center">
              <MoveRight />
            </span>
            <span>{result[1]}</span>
          </div>
          {routes.map((route) => {
            return (
              <TrainRoute
                key={
                  route.train_number +
                  route.from_station_code +
                  route.to_station_code
                }
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
