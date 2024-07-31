import { useState } from "react";
import Logo from "../assets/LetsWatchMovie.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const searchHandler = (event) => {
    if (event.key === "Enter" && search.length > 0) {
      navigate(`/search/${search}`);
    }
  };
  const handleSearch = () => {
    navigate(`/search/${search}`);
  };
  const handleMenuToggle = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <>
      <nav id="nav-bar" className="bg-transparent mb-6 md:mb-3">
        <div className=" sm:px-4 px-2 max-w-screen-xl mx-auto flex gap-2 items-center justify-between py-4 sm:p-4 relative">
          <NavLink to="/" className="flex items-center">
            <img src={Logo} className="w-16 h-16 md:h-20 md:w-20" />
          </NavLink>

          <ul className="absolute border-b md:border-0 pb-7 left-0 top-24 w-full flex justify-around font-medium border-yellow-200/10 bg-gray-50 mt-2 md:mt-0 dark:bg-transparent md:relative md:w-fit md:top-0 md:p-0 md:space-x-8 text-base md:text-lg">
            <li>
              <NavLink
                to="/"
                className="block text-gray-900 rounded hover:text-pahelo p-0 dark:hover:text-pahelo dark:text-white dark:hover:bg-gray-70 dark:hover:bg-transparent dark:border-gray-700"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tvshow"
                className="block text-gray-900 rounded hover:text-pahelo p-0 dark:hover:text-pahelo dark:text-white dark:hover:bg-gray-70 dark:hover:bg-transparent dark:border-gray-700"
              >
                Tv Shows
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className="block text-gray-900 rounded hover:text-pahelo p-0 dark:hover:text-pahelo dark:text-white dark:hover:bg-gray-70 dark:hover:bg-transparent dark:border-gray-700"
              >
                Movies
              </NavLink>
            </li>
          </ul>

          <div className="flex gap-8 ">
            <div className="relative">
              <input
                type="text"
                className="block w-full p-2 pl-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pahelo focus:border-pahelo dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pahelo dark:focus:border-pahelo"
                placeholder="Search..."
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyUp={searchHandler}
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer group border-l border-gray-600 pl-3"
                onClick={handleSearch}
              >
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
            </div>
            <MobileMenu expanded={expanded} setExpanded={setExpanded} />
            <div className="fixed flex justify-center items-center bottom-4 right-4 z-50 md:hidden">
              {expanded ? (
                <div
                  onClick={handleMenuToggle}
                  className="bg-transparent rounded-full p-2"
                >
                  <RxCross1 className="md:hidden text-white z-50" size={30} />
                </div>
              ) : (
                <div
                  onClick={handleMenuToggle}
                  className="rounded-full p-2 bg-slate-800 border border-yellow-500"
                >
                  <CiMenuBurger
                    className="md:hidden text-white z-50"
                    size={30}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
