import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";

const Navbar = () => {
  return (
    <div>
      <div className="navigation">
        <nav>
          <NavLink to="/">
            <FiHome className="icon" />
            Home
          </NavLink>
          <NavLink to="/add">
            <FiEdit className="icon" />
            Add
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
