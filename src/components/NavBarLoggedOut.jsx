import { Link } from "react-router-dom";
import TrainSVG from "../../public/train.svg";

const NavBarLoggedOut = ({ show }) => {
  return (
    <div className="flex justify-between my-2">
      <Link to="/">
        <h1 className="ml-5">
          <img src={TrainSVG} alt="Train Logo" className="w-12 h-12" />
        </h1>
      </Link>
      <div className="mr-5">
        {show == "login" ? (
          <Link to="/login">
            <button className="btn btn-neutral">Login</button>
          </Link>
        ) : (
          <Link to="/register">
            <button className="btn btn-neutral">Register</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBarLoggedOut;
