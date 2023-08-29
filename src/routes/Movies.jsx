import Menu from "../components/Menu";
import Repeater from "../components/Repeater";
import useFetch from "../hooks/useFetch";


export default function Movies() {
    const trending = useFetch(`discover/movie`);
    return (
        <div className='flex max-w-screen-xl mx-auto'>
            <Menu />
            <div className='w-full md:w-5/6 md:pl-5 text-white md:px-0 px-2'>
                <Repeater data={trending?.data?.results} loading={trending?.loading} />
            </div>
        </div>
    )
}
