import { Trash2 } from "lucide-react";

const Passengers = ({ no, data, deletePassenger, onChange }) => {
  return (
    <>
      <div className="bg-base-200 m-5 py-2 px-3 lg:px-5 text-base lg:text-xl rounded-lg">
        <div className="flex justify-between">
          <h1 className="font-semibold">Passenger {no + 1}</h1>
          {no != 0 && (
            <Trash2
              className="cursor-pointer text-red-500"
              onClick={() => deletePassenger(no)}
            />
          )}
        </div>
        <div className="my-5 flex flex-col lg:flex-row gap-2 lg:gap-5">
          <input
            type="text"
            value={data?.name}
            placeholder={`Passenger ${no + 1} Name`}
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => onChange(no, "name", e.target.value)}
          />
          <div className="flex gap-2 lg:gap-5">
            <input
              type="number"
              placeholder={`Age`}
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => onChange(no, "age", e.target.value)}
            />
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue="M"
              onChange={(e) => onChange(no, "gender", e.target.value)}
            >
              <option value="M">Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="T">Transgender</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Passengers;
