import { BiMoviePlay } from "react-icons/bi";
import { RiMovieLine } from "react-icons/ri";
import { RxAvatar } from "react-icons/rx";
import { BsQuestionOctagon } from "react-icons/bs";
export default function Menu() {
    return (
        <div className=" top-0 text-white w-1/6 border-r border-gray-600 hidden md:inline pt-16 pr-5 h-screen sticky">
            <ul className="flex-col justify-start items-center space-y-14 text-lg text-gray-400 font-medium">
                <li className="list"><BiMoviePlay className="text-2xl" />Genre</li>
                <li className="list"><RiMovieLine className="text-2xl" />Watchlist</li>
                <li className="list"><RxAvatar className="text-2xl" />About</li>
                <li className="list"><BsQuestionOctagon className="text-2xl" />FAQs</li>
            </ul>
        </div>
    )
}
