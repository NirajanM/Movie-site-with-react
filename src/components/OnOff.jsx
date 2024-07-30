import { useState } from "react";

export default function OnOff({ opt, stateChanger }) {
  const [active, setActive] = useState(true);
  return (
    <div className="flex mt-5 sm:mt-0 sm:inline-flex gap-2 items-baseline align-text-bottom sm:ml-5 md:ml-8">
      <span
        className={
          active
            ? "border px-3 py-1 rounded-md"
            : "hover:bg-gray-800 cursor-pointer px-3 py-1 rounded-md"
        }
        onClick={() => {
          if (active) {
            setActive(false);
            stateChanger(opt[1].value);
          } else {
            setActive(true);
            stateChanger(opt[0].value);
          }
        }}
      >
        {opt[0].name}
      </span>
      <span
        className={
          !active
            ? "border px-3 py-1 rounded-md"
            : "hover:bg-gray-800 cursor-pointer px-3 py-1 rounded-md"
        }
        onClick={() => {
          if (active) {
            setActive(false);
            stateChanger(opt[1].value);
          } else {
            setActive(true);
            stateChanger(opt[0].value);
          }
        }}
      >
        {opt[1].name}
      </span>
    </div>
  );
}
