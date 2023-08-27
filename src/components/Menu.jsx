import { BiMoviePlay } from "react-icons/bi";
import { RiMovie2Line } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { BsQuestionOctagon } from "react-icons/bs";
import { GoSingleSelect } from "react-icons/go";

export default function Menu() {
    return (
        <div className=" top-0 text-white w-1/6 border-r border-gray-600 hidden md:inline pt-16 pr-5 h-screen sticky">
            <ul className="flex-col justify-start items-center space-y-14 text-lg text-gray-400 font-medium">
                <li>
                    <div className="list">
                        <BiMoviePlay className="text-2xl" />
                        <div className="flex flex-col">
                            <span className="flex gap-[10px] items-center">Genre <GoSingleSelect /></span>
                            <span className="text-xs text-slate-100 pl-1 font-light">- default</span>
                        </div>
                    </div>

                </li>
                <li className="list"><RiMovie2Line className="text-2xl" />Watchlist</li>
                <li className="list"><RxAvatar className="text-2xl" />About</li>
                <li className="list"><BsQuestionOctagon className="text-2xl" />FAQs</li>
            </ul>
        </div>
    )
}
