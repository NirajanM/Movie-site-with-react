import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/header'
import { fetchData } from '../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigurations, getGenres } from '../store/rootSlice'
import useFetch from '../hooks/useFetch'
import Carousel from '../components/Carousel'
import OnOff from '../components/OnOff'

function Root() {

    const dispatch = useDispatch();

    useEffect(() => {
        fetchConfiguration();
    }, []);

    const fetchConfiguration = () => {
        fetchData('/configuration').then(
            (res) => {
                //extracting necessary url from config response
                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                }

                //setting it for global use
                dispatch(getApiConfigurations(url));
            }
        )
    }

    const [popularOpt, setPopularOpt] = useState("movie");


    const pOpt = [
        { name: "Movie", value: "movie" },
        { name: "Tv Shows", value: "tv" }
    ]

    const popular = useFetch(`${popularOpt}/popular`);

    console.log(popular);

    const playing = useFetch("movie/now_playing");

    const [topOpt, setTopOpt] = useState("movie");

    const tOpt = [
        { name: "Movie", value: "movie" },
        { name: "Tv Shows", value: "tv" }
    ]
    const toprated = useFetch(`${topOpt}/top_rated`);

    const [trendingOpt, setTrendingOpt] = useState("day");

    const trOpt = [
        { name: "Today", value: "day" },
        { name: "This Week", value: "week" }
    ]
    const trending = useFetch(`trending/all/${trendingOpt}`);




    return (
        <div className='max-w-screen-xl mx-auto text-white sm:px-4 px-2'>

            <section className='mb:8 md:mb-24 mt-16 md:mt-0'>
                <div>
                    <span className='text-pahelo font-black text-3xl'>Trending</span>
                    <OnOff opt={trOpt} stateChanger={setTrendingOpt} />
                </div>
                <Carousel data={trending?.data?.results} loading={trending?.loading} />
            </section>

            <section className='mb:8 md:mb-24'>
                <span className='text-pahelo font-black text-3xl'>Now Playing</span>
                <Carousel data={playing?.data?.results} loading={playing?.loading} endpoint={"movie"} />
            </section>

            <section className='mb-8 md:mb-24'>
                <div>
                    <span className='text-pahelo font-black text-3xl'>Popular</span>
                    <OnOff opt={pOpt} stateChanger={setPopularOpt} />
                </div>
                <Carousel data={popular?.data?.results} loading={popular?.loading} endpoint={popularOpt} />
            </section>

            <section className='mb-8 md:mb-24'>
                <div>
                    <span className='text-pahelo font-black text-3xl'>Top rated</span>
                    <OnOff opt={tOpt} stateChanger={setTopOpt} />
                </div>
                <Carousel data={toprated?.data?.results} loading={toprated?.loading} endpoint={topOpt} />
            </section>

            <Outlet />
        </div>

    )
}

export default Root
