import { useEffect, useState } from "react";

const TrainRoute = ({ data, type }) => {
  const [trainClass, setTrainClass] = useState(null);
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

  useEffect(() => {
    setTrainClass(null);
  }, [type]);
  return (
    <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl rounded-lg">
      <div className="font-bold">
        {data?.train_name} ({data?.train_number})
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
        <button className="btn btn-success" disabled={trainClass == null}>
          Book Now {trainClass && `@ ${cost}`}
        </button>
      </div>
    </div>
  );
};

export default TrainRoute;
