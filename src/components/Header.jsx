import { useEffect, useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { LuBookOpenText } from "react-icons/lu";
import { Link, useNavigate } from "react-router";
import defaultAvatar from "../assets/no-profile-picture.svg";
import { useAuth } from "../context/ContextHooks";

const Header = () => {
  const navigate = useNavigate();
  const { isActive, toggleHamburger, user, logout, setSearchParam } = useAuth();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText) {
      navigate(`/students`);
      setSearchParam(searchText);
    }
  };

  useEffect(() => {
    if (!searchText) {
      setSearchParam("");
    }
  }, [searchText, setSearchParam]);

  return (
    <header className="h-24">
      <div className="border-b bg-white text-black fixed top-0 w-full z-50">
        <div className="h-24 flex items-center justify-between gap-2 px-4 md:px-8 ">
          <div className="nav-control lg:hidden">
            <div
              onClick={toggleHamburger}
              className={`${isActive ? "hamburger active" : "hamburger"}`}
            >
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <Link to="/">
            <div className="flex items-center gap-2">
              <LuBookOpenText className="text-primary size-10 sm:size-12" />
              <div>
                <h1 className="text-lg sm:text-2xl font-semibold">Dashboard</h1>
                <p className="text-[12px] sm:text-sm">Student Management</p>
              </div>
            </div>
          </Link>
          <form onSubmit={handleSearch} className="w-1/3 hidden md:flex border">
            <input
              className="w-full py-2 px-4 outline-none bg-transparent"
              type="text"
              name="searchText"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search here..."
            />
            <button type="submit" className="bg-primary p-2 text-white">
              <IoSearch className="text-2xl" />
            </button>
          </form>
          <div className="flex gap-2 items-center relative">
            <h2 className="hidden md:block font-medium text-sm max-w-[200px] truncate">
              {user?.userName}
            </h2>
            <img
              className="flex-shrink-0 size-12 rounded-full bg-primary-300 object-center overflow-hidden  cursor-pointer"
              src={user?.avatar ? user?.avatar : defaultAvatar}
              alt={user?.fullName}
            />
            <IoIosLogOut
              size={28}
              className="ml-4 cursor-pointer"
              onClick={logout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
