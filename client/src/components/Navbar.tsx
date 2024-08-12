import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const getUserInitial = () => {
    if (user && user?.email) {
      return user?.email?.charAt(0).toUpperCase();
    }
    return "?";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="p-4 w-[97vw] fixed top-4 mx-auto rounded-xl right-0 left-0 grainy text-black border-b-2 border-black/20 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-black text-2xl font-bold">
          E-Shop
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/cart" className="text-black flex items-center relative">
            <FaShoppingCart size={24} />
            {cartItemsCount > 0 && (
              <span className=" bg-[#b4c3ff] rounded-full px-2 py-1 text-xs font-bold absolute bottom-4 left-4">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-8 h-8 rounded-full bg-[#b4c3ff] flex items-center justify-center text-black font-bold"
              >
                {getUserInitial()}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#b4c3ff] rounded-md shadow-lg py-1 text-black">
                  <p className="px-4 py-2 text-sm font-medium text-center">
                    {user.email}
                  </p>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm font-medium hover:bg-[#5f8cec] transition-colors duration-300 ease-in-out"
                  >
                    <AiOutlineLogout size={20} className="inline-block mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-black">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
