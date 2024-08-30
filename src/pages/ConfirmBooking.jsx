import { useNavigate } from "react-router-dom";

const ConfirmBooking = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-center">
        <button
          className="btn btn-error mx-5"
          onClick={() => navigate("/booking")}
        >
          Back
        </button>
        <button className="btn btn-success">Continue</button>
      </div>
    </div>
  );
};

export default ConfirmBooking;
