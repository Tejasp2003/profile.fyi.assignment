import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { AiFillDelete } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<{
    type: string;
    value: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Login First ⚠️");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    // Simulate a short delay to ensure cartItems are loaded from localStorage
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    if (appliedDiscount) {
      if (appliedDiscount.type === "fixed") {
        return Math.max(subtotal - appliedDiscount.value, 0);
      } else if (appliedDiscount.type === "percentage") {
        return subtotal * (1 - appliedDiscount.value / 100);
      }
    }
    return subtotal;
  };

  const applyDiscount = () => {
    if (discountCode === "FIXED10") {
      setAppliedDiscount({ type: "fixed", value: 10 });
    } else if (discountCode === "PERCENT10") {
      setAppliedDiscount({ type: "percentage", value: 10 });
    } else {
      alert("Invalid discount code");
    }
    setDiscountCode("");
  };

  if (isLoading) {
    return <div className="container mx-auto p-6">Loading cart...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 mt-20 p-2 text-[#b4c3ff]">
        Your Cart :{" "}
      </h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col justify-center gap-4 w-full p-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4 w-full grainy p-2 rounded-xl"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mr-4 rounded-xl "
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-2 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 py-1 rounded-r"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-500"
                  >
                    <AiFillDelete
                      size={24}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the component remains the same */}
          <div className="mt-8 p-2 text-[#b4c3ff]">
            <h2 className="text-xl font-bold">Cart Summary : </h2>
            <p className="text-lg mt-2 font-extrabold">
              <span className="font-thin tracking-wider">Subtotal:</span> $
              {calculateSubtotal().toFixed(2)}
            </p>
            {appliedDiscount && (
              <p className="text-lg mt-2 font-extrabold text-green-400">
                <span className="font-thin tracking-wider">Discount:{" "}</span>
                {appliedDiscount.type === "fixed"
                  ? `$${appliedDiscount.value.toFixed(2)} off`
                  : `${appliedDiscount.value}% off`}
              </p>
            )}
            <p className="text-lg mt-2 font-extrabold">
              <span className="font-thin tracking-wider">Total:</span> $
              {calculateTotal().toFixed(2)}
            </p>
            <div className="mt-4 flex items-center">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Enter discount code"
                className="border p-2 mr-2 text-black rounded"
              />
              <button
                onClick={applyDiscount}
                disabled={!discountCode}
                className=" text-white font-bold px-4 py-2 rounded bg-[#b4c3ff] hover:bg-[#5f8cec] transition-colors"
              >
                Apply
              </button>
            </div>
            <button className="mt-4 bg-green-300 text-black font-bold px-4 py-2 rounded hover:bg-green-500 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
