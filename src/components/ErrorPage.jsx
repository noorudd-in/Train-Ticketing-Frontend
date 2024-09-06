import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (count <= 0) {
      navigate("/");
    }
    const timeoutId = setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [count]);
  return (
    <div className="diff aspect-[4/3] lg:aspect-[16/9] min-h-screen">
      <div className="diff-item-1">
        <div className="bg-primary text-primary-content grid place-content-center text-4xl lg:text-9xl font-black px-10">
          404 | Page Not Found
          <div className="text-xl lg:text-3xl mt-5">
            Don't worry, you will be redirected to the homepage in
            <span className="countdown text-xl lg:text-3xl mx-2">
              <span style={{ "--value": count }}></span>
            </span>
          </div>
        </div>
      </div>
      <div className="diff-item-2">
        <div className="bg-base-200 grid place-content-center text-4xl lg:text-9xl font-black px-10">
          404 | Page Not Found
          <div className="text-xl lg:text-3xl mt-5">
            Don't worry, you will be redirected to the homepage in
            <span className="countdown text-xl lg:text-3xl mx-2">
              <span style={{ "--value": count }}></span>
            </span>
          </div>
        </div>
      </div>
      <div className="diff-resizer"></div>
    </div>
  );
};

export default ErrorPage;
