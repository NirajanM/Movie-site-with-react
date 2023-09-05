import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import Repeater from "../components/Repeater";
import useFetch from "../hooks/useFetch";


export default function Movies() {
    const { movieGenre } = useSelector((state) => state.home);
    const movies = useFetch(`discover/movie?with_genres=${movieGenre.id}`);
    return (
        <div className='flex max-w-screen-xl mx-auto'>
            <Menu />
            <div className='w-full md:w-5/6 md:pl-9 text-white px-2'>
                <Repeater data={movies?.data?.results} loading={movies?.loading} endpoint={"movie"} />
            </div>
        </div>
    )
}
