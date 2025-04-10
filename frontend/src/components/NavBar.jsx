import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets/assets";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    // setShowDropdown(false);
    // navigate("/"); // optional: redirect to home after logout
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400 relative">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <NavLink to="/" className="hover:text-[var(--bg-primary)]">
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to="/doctors" className="hover:text-[var(--bg-primary)]">
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about" className="hover:text-[var(--bg-primary)]">
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to="/contact" className="hover:text-[var(--bg-primary)]">
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      {/* Profile & Mobile Menu Icon */}
      <div className="flex items-center gap-4 relative">
        {token ? (
          <div className="relative">
            <img
              src={assets.profile_pic}
              className="w-8 rounded-full cursor-pointer"
              alt="Profile"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-40 p-3 z-10">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[var(--bg-primary)] text-white px-6 py-2 rounded-md font-light hidden md:block"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          src={assets.menu_icon}
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          alt="Menu Icon"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          showMenu ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        {/* Close Button & Logo */}
        <div className="flex items-center justify-between p-5 border-b border-gray-300">
          <img className="w-36" src={assets.logo} alt="Logo" />
          <img
            className="w-7 cursor-pointer"
            src={assets.cross_icon}
            alt="Close Menu"
            onClick={() => setShowMenu(false)}
          />
        </div>

        {/* Mobile Navigation */}
        <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
          <NavLink to="/" onClick={() => setShowMenu(false)}>
            <li className="py-2 text-gray-800">HOME</li>
          </NavLink>
          <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
            <li className="py-2 text-gray-800">ALL DOCTORS</li>
          </NavLink>
          <NavLink to="/about" onClick={() => setShowMenu(false)}>
            <li className="py-2 text-gray-800">ABOUT</li>
          </NavLink>
          <NavLink to="/contact" onClick={() => setShowMenu(false)}>
            <li className="py-2 text-gray-800">CONTACT</li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
