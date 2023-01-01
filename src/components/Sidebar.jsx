import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import logo from "../assets/logo.svg";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

function NavLinks({ links, handleClick }) {
  return (
    <div className="mt-10">
      {links.map((link) => (
        <NavLink
          to={link.to}
          key={link.name}
          className="flex flex-row justify-start items-center my-10 text-sm font-medium text-gray-400 hover:text-cyan-400"
          // само, ако handleClick съществува, тогава я извикай. Тази ф-я ще може да се свика само на мобилни устройства
          onClick={() => handleClick && handleClick()}
        >
          <link.icon className="w-6 h-6 mr-2" />
          {link.name}
        </NavLink>
      ))}
    </div>
  );
}

function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  //on medium and higher width devices - the sidebar will be visible and flex. Ussually it will be hidden
  return (
    <>
      {/* desktop sidebar menu */}
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks links={links} />
      </div>

      {/* open close sidebar sidebar mobile menu */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)} />
        ) : (
          <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)} />
        )}
      </div>

      {/* the className is dynamic - h-screen means full height of the screen */}
      <div
        className={`md:hidden absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        } `}
      >
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks links={links} handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
}

export default Sidebar;
