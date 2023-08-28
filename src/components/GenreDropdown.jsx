import { GoSingleSelect } from "react-icons/go";
//import { useDispatch } from "react-redux";
import { useState } from "react";

const options = [
    {
        name: "opt1",
        value: "opt1"
    },
    {
        name: "opt2",
        value: "opt2"
    },
    {
        name: "opt3",
        value: "opt3"
    },
    {
        name: "opt4",
        value: "opt4"
    },
    {
        name: "opt5",
        value: "opt5"
    },
]

export default function GenreDropdown() {
    //const dispatch = useDispatch();
    const [genre, setGenre] = useState(null);
    const [optionOpen, setOptionOpen] = useState(false);
    return (
        <>
            <span
                className="flex gap-[10px] items-center"
                onClick={() => { setOptionOpen(true) }}
            >Genre <GoSingleSelect className="text-xl" />
            </span>
            <span className="text-xs text-slate-100 pl-1 font-light">- {genre ? genre : "default"}</span>
            {optionOpen &&
                <div
                    className="absolute top-14 left-0 flex flex-col items-center justify-center text-white w-full bg-gray-900 z-50 py-5 gap-5 h-[40vh] overflow-y-scroll"
                    onMouseLeave={() => { setOptionOpen(false) }}
                >
                    {options.map(opt => {
                        return (<div
                            className="hover:bg-slate-800 py-1 w-full text-center "
                            key={opt.value}
                            onClick={() => {
                                setGenre(opt.value);
                                setOptionOpen(false);
                            }}
                        > {opt.name}</div>);
                    })}
                </div>}
        </>
    )
}