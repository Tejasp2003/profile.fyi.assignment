import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  useEffect(
    () => {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(timer);
    },
    
    []
  );
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-200">
     
      <span className="grainy text-green-400 font-semibold text-xl p-4 rounded-xl ">
        You have placed your order successfully 🎉
      </span>
    </div>
  );
};

export default Checkout;
