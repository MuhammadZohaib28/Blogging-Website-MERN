import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

import { IoMdPersonAdd } from "react-icons/io";
import { IoIosCreate } from "react-icons/io";

import { FaHome } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({ email: null, posts: [] });
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="flex justify-between items-center px-20 py-5 bg-grey">
      <Link to={"/"} className="cursor-pointer text-5xl">
        <FaHome className="text-3xl" />
      </Link>

      {user.email ? (
        <div className="flex gap-10 font-normal capitalize">
          <Link
            title="Create Post"
            to={"/create"}
            className="flex justify-between items-center cursor-pointer"
          >
            {" "}
            <span className="text-3xl">
              <IoIosCreate className="text-3xl" />
            </span>
          </Link>
          <Link
            title="Dashboard"
            to={"/dashboard"}
            className="flex justify-between items-center cursor-pointer"
          >
            {" "}
            <span className="text-3xl">
              <MdSpaceDashboard className="text-3xl" />
            </span>
          </Link>
          <button
            title="Logout"
            onClick={handleLogout}
            className="flex justify-between items-center  cursor-pointer"
          >
            {" "}
            <span className="text-3xl">
              <IoLogOut className="text-3xl" />
            </span>
          </button>
        </div>
      ) : (
        <div className="flex gap-10 font-normal capitalize">
          <Link
            title="Login"
            to={"/login"}
            className="flex justify-between items-center cursor-pointer"
          >
            {" "}
            <span className="text-3xl">
              <IoLogIn className="text-3xl" />
            </span>
          </Link>
          <Link
            title="Register"
            to={"/register"}
            className="flex justify-between items-center cursor-pointer cursor-pointer"
          >
            {" "}
            <span className="text-3xl">
              <IoMdPersonAdd className="text-3xl" />
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
