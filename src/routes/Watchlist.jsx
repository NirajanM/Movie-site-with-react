import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { getWatchListCinemas } from "../hooks/useWatchList";
import { useSelector } from "react-redux";
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import dateFormat from "../components/dateFormat";
import { AiFillStar } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState(getWatchListCinemas());
  const notify = (content) => toast(content);
  const navigate = useNavigate();
  let { url } = useSelector((state) => state.home);
  const handleRemove = (itemId) => {
    const updatedItems = watchlistItems.filter((item) => item.id !== itemId);
    localStorage.setItem("watchlist", JSON.stringify(updatedItems));
    setWatchlistItems(updatedItems);
    notify("Removed successfully");
  };

  return (
    <div className="flex max-w-screen-xl mx-auto my-16 md:my-0">
      <Menu />
      <div className="w-full md:w-5/6 md:px-9 text-white px-2">
        {watchlistItems.length > 0 ? (
          <div className=" grid mx-auto my-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-7 xl:gap-10 ">
            {watchlistItems.map((item) => {
              //creating posterUrl if found or noposter url from assest incase of error
              const posterUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : posterNotFound;
              return (
                <>
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 w-full cursor-pointer z-30"
                  >
                    <div
                      className="flex flex-col gap-2 group w-full cursor-pointer z-30"
                      onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                    >
                      <div className="relative aspect-poster min-w-[128px] md:min-w-[144px] lg:min-w-[160px]">
                        <LazyLoadImage
                          alt={item.title}
                          src={posterUrl}
                          className="object-cover w-full h-full object-center "
                        />
                      </div>
                      <span className="text-ellipsis overflow-x-hidden whitespace-nowrap group-hover:text-pahelo">
                        {item.title || item.name}
                      </span>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-200 group-hover:text-pahelo">
                          {dateFormat(item.release_date || item.first_air_date)}
                        </span>
                        <span className="flex gap-1 items-center text-xs text-slate-200 group-hover:text-pahelo">
                          {item.vote_average.toFixed(1)}
                          <AiFillStar />
                        </span>
                      </div>
                    </div>
                    <div
                      className="z-40 hover:scale-115 flex text-xs items-center justify-left hover:text-red-400"
                      onClick={() => {
                        handleRemove(item.id);
                      }}
                    >
                      <CiTrash size={20} /> Remove
                      <ToastContainer
                        position="top-center"
                        autoClose={200}
                        hideProgressBar={true}
                        newestOnTop={true}
                        rtl={false}
                        pauseOnFocusLoss
                        theme="dark"
                      />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <div>Your Watchlist is Empty!</div>
        )}
      </div>
    </div>
  );
}
