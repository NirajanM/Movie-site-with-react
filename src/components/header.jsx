import React, { useState } from 'react'
import Logo from "../assets/LetsWatchMovie.webp"
import { Link, useNavigate } from 'react-router-dom';
export default function Header() {
    const [showNav, setShowNav] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const searchHandler = (event) => {
        if (event.key === "Enter" && search.length > 0) {
            navigate(`/search/${search}`);
        }
    }

    return (
        <div>
            <nav id='nav-bar'>
                <div className="max-w-screen-xl flex gap-2 items-center justify-between mx-auto py-4 px-1 sm:p-4 relative">
                    <Link to="/" className="flex items-center">
                        <img src={Logo} className='w-16 h-16 md:w-24 md:h-24' />
                    </Link>

                    <ul className="absolute border-b-2 md:border-0 pb-4 left-0 top-24 w-full md:relative md:w-fit md:top-0 flex justify-evenly md:p-0 font-medium border-gray-100 bg-gray-50 md:space-x-8 mt-0 md:bg-white dark:bg-transparent">
                        <li>
                            <Link to="/" className="block rounded bg-transparent text-pahelo p-0 md:dark:text-pahelo">Home</Link>
                        </li>
                        <li>
                            <Link to="/anotherpage" className="block text-gray-900 rounded md:hover:text-pahelo p-0 dark:hover:text-pahelo dark:text-white dark:hover:bg-gray-70 dark:hover:bg-transparent dark:border-gray-700">Tv Shows</Link>
                        </li>
                        <li>
                            <Link to="/anotherpage" className="block text-gray-900 rounded md:hover:text-pahelo p-0 dark:hover:text-pahelo dark:text-white dark:hover:bg-gray-70 dark:hover:bg-transparent dark:border-gray-700">Movies</Link>
                        </li>
                    </ul>


                    <div className="relative">
                        <input
                            type="text"
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-pahelo focus:border-pahelo dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pahelo dark:focus:border-pahelo"
                            placeholder="Search..."
                            onChange={(e) => { setSearch(e.target.value) }}
                            onKeyUp={searchHandler}
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer group border-l border-gray-600 pl-3">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                    </div>

                </div>

            </nav>
        </div>
    )
}
