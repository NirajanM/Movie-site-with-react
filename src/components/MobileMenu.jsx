import { RiMovie2Line } from "react-icons/ri";
import GenreDropdown from "./GenreDropdown";
import { NavLink } from "react-router-dom";
import { RiMovieLine } from "react-icons/ri";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineBlurOn } from "react-icons/md";
import { RiHeart2Line } from "react-icons/ri";

export default function MobileMenu({ expanded, setExpanded }) {
  return (
    <div
      className={`fixed top-0 text-white border-r border-gray-600 lg:hidden pt-16 pr-5 h-screen w-fit bg-black overflow-y-hidden z-40 ${
        expanded ? "inline right-0" : "hidden"
      } `}
    >
      <ul className="flex-col justify-start items-center space-y-14 text-lg text-slate-300 font-medium w-[70vw] sm:[50vw] md:w-[30vw]">
        <li className="relative">
          <div className="list">
            <RiMovieLine size={24} />
            <div className="flex flex-col ">
              <GenreDropdown mediaType={"tv"} setExpanded={setExpanded} />
            </div>
          </div>
        </li>
        <li className="relative">
          <div className="list">
            <RiMovie2Line size={23} />
            <div className="flex flex-col ">
              <GenreDropdown mediaType={"movie"} setExpanded={setExpanded} />
            </div>
          </div>
        </li>
        <li className="list">
          <RiHeart2Line size={24} />
          <NavLink
            to={"/watchlist"}
            onClick={() => {
              setExpanded(false);
            }}
          >
            Watchlist
          </NavLink>
        </li>
        <li className="list">
          <MdOutlineBlurOn size={27} />
          <NavLink
            to={"/about"}
            onClick={() => {
              setExpanded(false);
            }}
          >
            About
          </NavLink>
        </li>
        <li className="list">
          <CiBoxList size={23} />
          <NavLink
            to={"/faq"}
            onClick={() => {
              setExpanded(false);
            }}
          >
            FAQs
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
