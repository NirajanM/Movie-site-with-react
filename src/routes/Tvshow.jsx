import Menu from "../components/Menu";
import Repeater from "../components/Repeater";
import useFetch from "../hooks/useFetch";


export default function Tvshow() {
    const trending = useFetch(`discover/tv`);
    return (
        <div className='flex max-w-screen-xl mx-auto'>
            <Menu />
            <div className='w-full md:w-5/6 md:pl-5 text-white md:px-0 px-2 my-10 md:my-0'>
                <Repeater data={trending?.data?.results} loading={trending?.loading} />
            </div>
        </div>
    )
}
