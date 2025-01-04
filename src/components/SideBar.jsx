import { BsListCheck } from "react-icons/bs";
import { LuBookCheck } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { NavLink } from "react-router";
import { useAuth } from "../context/ContextHooks";

const SideBar = () => {
  const { isActive, toggleHamburger } = useAuth();
  return (
    <aside className="lg:w-[240px]  relative">
      <ul
        className={`text-black bg-white w-full md:w-[250px]  left-0  fixed top-24 h-full pt-4  shadow-lg lg:translate-x-0 ${
          isActive
            ? "translate-x-0 duration-300"
            : "translate-x-[-100%] duration-300"
        }`}
      >
        <NavLink to="/">
          <li
            className={`flex gap-4 text-[#7e7e7e] text-xl  px-8 py-5 hover:text-primary duration-300`}
            onClick={toggleHamburger}
          >
            <MdDashboard size={25} />
            Dashboard
          </li>
        </NavLink>
        <NavLink to="/students">
          <li
            className={` flex items-center gap-4 text-[#7e7e7e] text-xl  px-8 py-5 hover:text-primary duration-300`}
            onClick={toggleHamburger}
          >
            <PiStudentFill size={25} />
            Students
          </li>
        </NavLink>
        <NavLink to="/attendence">
          <li
            className={` flex items-center gap-4 text-[#7e7e7e] text-xl  px-8 py-5 hover:text-primary duration-300`}
            onClick={toggleHamburger}
          >
            <BsListCheck size={25} />
            Attendence
          </li>
        </NavLink>
        <NavLink to="/results">
          <li
            className={`} flex items-center gap-4 text-[#7e7e7e] text-xl  px-8 py-5 hover:text-primary duration-300`}
            onClick={toggleHamburger}
          >
            <LuBookCheck size={25} />
            Results
          </li>
        </NavLink>
      </ul>
    </aside>
  );
};

export default SideBar;
