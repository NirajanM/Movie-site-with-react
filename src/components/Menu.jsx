import { BiMoviePlay } from "react-icons/bi";
import { RiMovie2Line } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { BsQuestionOctagon } from "react-icons/bs";
import GenreDropdown from "./GenreDropdown";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <div className=" top-0 text-white border-r border-gray-600 md:inline pt-16 pr-5 h-screen w-fit fixed md:sticky bg-black md:bg-transparent z-50 -right-3/4">
      <ul className="flex-col justify-start items-center space-y-14 text-lg text-gray-400 font-medium w-[50vw] md:w-[12rem]">
        <li className="relative">
          <div className="list">
            <BiMoviePlay className="text-2xl" />
            <div className="flex flex-col ">
              <GenreDropdown mediaType={"tv"} />
            </div>
          </div>
        </li>
        <li className="relative">
          <div className="list">
            <BiMoviePlay className="text-2xl" />
            <div className="flex flex-col ">
              <GenreDropdown mediaType={"movie"} />
            </div>
          </div>
        </li>
        <li className="list">
          <RiMovie2Line className="text-2xl" />
          Watchlist
        </li>
        <li className="list">
          <RxAvatar className="text-2xl" />
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li className="list">
          <BsQuestionOctagon className="text-2xl" />
          <NavLink to={"/faq"}>FAQs</NavLink>
        </li>
      </ul>
    </div>
  );
}
