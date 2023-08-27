import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className=' h-96 w-full flex justify-center items-center gap-2 lg:gap-4 text-lg font-black text-white flex-col'>
            <span className='text-3xl lg:text-6xl'>404</span>
            <span className='text-white font-normal lg:text-2xl'>Page not found!</span>
            <Link to={"/"} className='border-b-2 px-2 py-1 font-normal text-sm text-slate-200 hover:text-white'> Go back to home page</Link>
        </div>
    )
}
