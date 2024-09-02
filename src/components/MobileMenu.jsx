import GenreDropdown from "./GenreDropdown";
import { NavLink } from "react-router-dom";
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
          <GenreDropdown mediaType={"tv"} setExpanded={setExpanded} />
        </li>
        <li className="relative">
          <GenreDropdown mediaType={"movie"} setExpanded={setExpanded} />
        </li>
        <li>
          <NavLink
            className="list"
            to={"/watchlist"}
            onClick={() => {
              setExpanded(false);
            }}
          >
            <RiHeart2Line size={24} />
            <span>Watchlist</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="list"
            to={"/about"}
            onClick={() => {
              setExpanded(false);
            }}
          >
            <MdOutlineBlurOn size={27} />
            <span>About</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="list"
            to={"/faq"}
            onClick={() => {
              setExpanded(false);
            }}
          >
            <CiBoxList size={23} />
            <span>FAQs</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
