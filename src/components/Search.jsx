const Search = ({ stations, setStation, setShowResult, category }) => {
  const handleSelect = (name) => {
    setStation(name);
    setShowResult(null);
  };
  return (
    <div
      className={`absolute ${
        category == "from" ? "top-[14.5rem]" : "top-[20rem] lg:top-[14.5rem]"
      } w-full max-w-xs`}
    >
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow border border-zinc-600">
        {stations?.map((res) => {
          return (
            <li key={res.id}>
              <a onClick={() => handleSelect(res.name)}>{res.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
