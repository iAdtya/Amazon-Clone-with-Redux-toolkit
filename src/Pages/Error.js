import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Error() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-2">Error, Something Went Wrong!!</h1>
      <p className="text-lg ">
        Redirecting you back to Homepage in <strong>{countdown}</strong> seconds
      </p>
    </div>
  );
}
