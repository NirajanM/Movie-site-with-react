import { getContinuePlaying } from "@/hooks/useWatchList";
import { AiFillStar } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import posterNotFound from "../assets/posterNotFound.png";
import dateFormat from "../components/dateFormat";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

export default function ContinueWatching() {
  const [watchingList, setWatchingList] = useState(
    getContinuePlaying().reverse()
  );
  const notify = (content) => toast(content);
  const navigate = useNavigate();
  let { url } = useSelector((state) => state.home);

  const handleRemove = (itemId) => {
    const updatedItems = watchingList.filter((item) => item.id !== itemId);
    localStorage.setItem("continuePlaying", JSON.stringify(updatedItems));
    setWatchingList(updatedItems.reverse()); // Reverse the updated list as well
    notify("Removed successfully");
  };

  if (watchingList.length > 0) {
    console.log(watchingList);
    return (
      <div className="mb-20 flex flex-col items-start gap-3">
        <h2 className="text-pahelo font-black text-3xl">Continue Watching</h2>
        <div className="max-w-[1024px] mx-auto overflow-x-auto cw-scrollbar">
          <div className="flex my-4 gap-2 justify-start">
            {watchingList.map((data) => {
              const item = data.details;
              const posterUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : posterNotFound;
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 w-32 md:w-36 lg:w-40 xl:w-44 cursor-pointer z-30"
                >
                  <div
                    className="flex flex-col gap-2 group w-full cursor-pointer z-30"
                    onClick={() => navigate(`/${item.media_type}/${item.id}`)}
                  >
                    <div className="relative aspect-poster min-w-[128px] md:min-w-[144px] lg:min-w-[160px] rounded-md">
                      <LazyLoadImage
                        alt={item.title}
                        src={posterUrl}
                        className="object-cover w-full h-full object-center rounded-md"
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
                      handleRemove(data.id);
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
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
