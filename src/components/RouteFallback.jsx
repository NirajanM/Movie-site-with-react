import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const card = (i) => (
  <div key={i} className="flex flex-col gap-2">
    <Skeleton className="aspect-poster rounded-lg" />
    <Skeleton className="h-3" />
    <Skeleton className="h-3 w-2/3" />
  </div>
);

export default function RouteFallback() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only surface the skeleton if the chunk is slow, so fast route
    // transitions do not flash a placeholder and shift the layout.
    const t = setTimeout(() => setShow(true), 160);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="mx-auto my-16 grid max-w-screen-xl grid-cols-2 gap-x-3 gap-y-10 px-4 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 xl:grid-cols-5">
      {Array.from({ length: 10 }, (_, i) => card(i))}
    </div>
  );
}
