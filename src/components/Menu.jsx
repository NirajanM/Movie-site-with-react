import GenreDropdown from "./GenreDropdown";
import { NavLink } from "react-router-dom";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineBlurOn } from "react-icons/md";
import { RiHeart2Line } from "react-icons/ri";

export default function Menu() {
  return (
    <div
      className={` border-r border-gray-800/20 text-white hidden lg:inline pt-16 pr-5 h-screen w-fit md:bg-transparent z-50`}
    >
      <ul className="flex-col justify-start items-center space-y-14 text-lg text-slate-300 font-medium w-[50vw] md:w-[12rem]">
        <li className="relative">
          <GenreDropdown mediaType={"tv"} />
        </li>
        <li className="relative">
          <GenreDropdown mediaType={"movie"} />
        </li>
        <li>
          <NavLink className="list" to={"/watchlist"}>
            <RiHeart2Line size={24} />
            <span>Watchlist</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="list" to={"/about"}>
            <MdOutlineBlurOn size={27} />
            <span>About</span>
          </NavLink>
        </li>
        <li>
          <NavLink className="list" to={"/faq"}>
            <CiBoxList size={23} />
            <span>FAQs</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
