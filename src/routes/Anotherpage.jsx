import React from 'react'
import { Link } from 'react-router-dom'

export default function Anotherpage() {
    return (
        <>
            <div className='h-96 flex justify-center items-center gap-2 lg:gap-4 text-lg font-black text-slate-800 flex-col'>
                <span className='text-3xl lg:text-6xl'>Another page</span> <span className='text-green-700 font-normal lg:text-2xl'>setup through react-router-dom</span>
                <Link to={"/"} className='border-2 rounded-lg px-2 py-1 font-medium text-slate-500 hover:bg-slate-100'>Go back to home page</Link>
            </div>
        </>
    )
}
