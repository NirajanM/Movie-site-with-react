import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Outlet } from 'react-router-dom'
import Carousel from '../components/Carousel'
import OnOff from '../components/OnOff'
import Menu from '../components/Menu'

function Root() {

    const [popularOpt, setPopularOpt] = useState("movie");


    const pOpt = [
        { name: "Movie", value: "movie" },
        { name: "Tv Shows", value: "tv" }
    ]

    const popular = useFetch(`${popularOpt}/popular`);

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
        <div className='flex flex-row-reverse md:flex-row max-w-screen-xl mx-auto '>
            <Menu />
            <div className='w-full md:pl-9 text-white sm:px-4 px-2 md:w-[75%] lg:w-[79%] xl:w-[88%]'>
                <section className='mb:8 md:mb-24 mt-16 md:mt-0  '>
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

        </div>
    )
}

export default Root
