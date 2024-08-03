import { RiMovie2Line } from "react-icons/ri";
import GenreDropdown from "./GenreDropdown";
import { NavLink } from "react-router-dom";
import { RiMovieLine } from "react-icons/ri";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineBlurOn } from "react-icons/md";
import { RiHeart2Line } from "react-icons/ri";

export default function Menu() {
  return (
    <div
      className={` border-r border-gray-800/20 text-white hidden md:inline pt-16 pr-5 h-screen w-fit md:bg-transparent z-50`}
    >
      <ul className="flex-col justify-start items-center space-y-14 text-lg text-slate-300 font-medium w-[50vw] md:w-[12rem]">
        <li className="relative">
          <div className="list">
            <RiMovieLine size={24} />
            <div className="flex flex-col items-start justify-start">
              <GenreDropdown mediaType={"tv"} />
            </div>
          </div>
        </li>
        <li className="relative">
          <div className="list">
            <RiMovie2Line size={23} />
            <div className="flex flex-col ">
              <GenreDropdown mediaType={"movie"} />
            </div>
          </div>
        </li>
        <li className="list">
          <RiHeart2Line size={24} />
          <NavLink to={"/watchlist"}>Watchlist</NavLink>
        </li>
        <li className="list">
          <MdOutlineBlurOn size={27} />
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li className="list">
          <CiBoxList size={23} />
          <NavLink to={"/faq"}>FAQs</NavLink>
        </li>
      </ul>
    </div>
  );
}
