import { BiMoviePlay } from "react-icons/bi";
import { RiMovie2Line } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { BsQuestionOctagon } from "react-icons/bs";
import GenreDropdown from "./GenreDropdown";
import { NavLink } from "react-router-dom";

export default function MobileMenu({ expanded, setExpanded }) {
  return (
    <div
      className={`fixed top-0 text-white border-r border-gray-600 md:hidden pt-16 pr-5 h-screen w-fit bg-black overflow-y-hidden z-40 ${
        expanded ? "inline right-0" : "hidden"
      } `}
    >
      <ul className="flex-col justify-start items-center space-y-14 text-lg text-gray-400 font-medium w-[70vw]">
        <li className="relative">
          <div className="list">
            <BiMoviePlay className="text-2xl" />
            <div className="flex flex-col ">
              <GenreDropdown mediaType={"tv"} setExpanded={setExpanded} />
            </div>
          </div>
        </li>
        <li className="relative">
          <div className="list">
            <BiMoviePlay className="text-2xl" />
            <div className="flex flex-col ">
              <GenreDropdown mediaType={"movie"} setExpanded={setExpanded} />
            </div>
          </div>
        </li>
        <li className="list">
          <RiMovie2Line className="text-2xl" />
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
          <RxAvatar className="text-2xl" />
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
          <BsQuestionOctagon className="text-2xl" />
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
