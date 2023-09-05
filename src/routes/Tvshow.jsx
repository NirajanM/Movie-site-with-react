import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import Repeater from "../components/Repeater";
import useFetch from "../hooks/useFetch";


export default function Tvshow() {
    const { tvGenre } = useSelector((state) => state.home);
    const tvshow = useFetch(`discover/tv?with_genres=${tvGenre.id}`);
    return (
        <div className='flex max-w-screen-xl mx-auto'>
            <Menu />
            <div className='w-full md:w-5/6 md:px-9 text-white px-2'>
                <Repeater data={tvshow?.data?.results} loading={tvshow?.loading} endpoint={"tv"} />
            </div>
        </div>
    )
}
