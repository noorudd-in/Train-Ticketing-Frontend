export const get12HrTime = (time) => {
  let [hours, minutes] = time.split(":").map(Number);
  let suffix = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let formattedHours = hours.toString().padStart(2, "0");
  let formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes} ${suffix}`;
};

export const getPassengerArray = (passenger) => {
  let passengers = [];
  for (let i = 1; i <= 6; i++) {
    if (passenger[`p${i}_name`]) {
      passengers.push([
        passenger[`p${i}_name`],
        passenger[`p${i}_age`],
        passenger[`p${i}_gender`],
        passenger[`p${i}_status`],
      ]);
    }
  }
  return passengers;
};

export const getLocaleDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};
