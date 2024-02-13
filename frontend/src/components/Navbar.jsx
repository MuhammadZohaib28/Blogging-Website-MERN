import React from "react";
import { Link } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";

import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-20 py-5 bg-grey">
      <Link to={"/"} className="cursor-pointer text-5xl">
        <FaHome className="text-3xl" />
      </Link>

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
    </nav>
  );
};

export default Navbar;
