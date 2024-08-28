import React, { useEffect, useState } from "react";
import Search from "./Search";
import axios from "axios";
import { SEARCH_URL } from "../config";

const Home = () => {
  const [stations, setStations] = useState(null);
  const [showResult, setShowResult] = useState(null);
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");

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
  }, [fromStation, toStation]);

  return (
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
          <div className="flex flex-col space-y-2 mt-4 lg:mt-0 w-full">
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
    </div>
  );
};

export default Home;
