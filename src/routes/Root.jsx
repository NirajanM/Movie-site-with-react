import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Carousel from '../components/Carousel'
import OnOff from '../components/OnOff'
import Menu from '../components/Menu'
import { fetchData } from '../utils/api'
import { useQuery } from '@tanstack/react-query'

function Root() {

    const [popularOpt, setPopularOpt] = useState("movie");


    const pOpt = [
        { name: "Movie", value: "movie" },
        { name: "Tv Shows", value: "tv" }
    ]

    const popular = useQuery({
        queryKey: [popularOpt, "popular"],
        queryFn: () => fetchData(`${popularOpt}/popular`)
    })


    const playing = useQuery({
        queryKey: ["playing"],
        queryFn: () => fetchData("movie/now_playing")
    })

    const [topOpt, setTopOpt] = useState("movie");

    const tOpt = [
        { name: "Movie", value: "movie" },
        { name: "Tv Shows", value: "tv" }
    ]

    const toprated = useQuery({
        queryKey: [topOpt, "toprated"],
        queryFn: () => fetchData(`${topOpt}/top_rated`)
    })


    const [trendingOpt, setTrendingOpt] = useState("day");

    const trOpt = [
        { name: "Today", value: "day" },
        { name: "This Week", value: "week" }
    ]

    const trending = useQuery({
        queryKey: [trendingOpt, "trending"],
        queryFn: () => fetchData(`trending/all/${trendingOpt}`)
    })

    return (
        <div className='flex flex-row-reverse md:flex-row max-w-screen-xl mx-auto '>
            <Menu />
            <div className='w-full md:pl-9 text-white sm:px-4 px-2 md:w-[75%] lg:w-[79%] xl:w-[88%]'>
                <section className='mb:8 md:mb-24 mt-16 md:mt-0  '>
                    <div>
                        <span className='text-pahelo font-black text-3xl'>Trending</span>
                        <OnOff opt={trOpt} stateChanger={setTrendingOpt} />
                    </div>
                    <Carousel data={trending?.data?.results} loading={trending?.isLoading} />
                </section>

                <section className='mb:8 md:mb-24'>
                    <span className='text-pahelo font-black text-3xl'>Now Playing</span>
                    <Carousel data={playing?.data?.results} loading={playing?.isLoading} endpoint={"movie"} />
                </section>

                <section className='mb-8 md:mb-24'>
                    <div>
                        <span className='text-pahelo font-black text-3xl'>Popular</span>
                        <OnOff opt={pOpt} stateChanger={setPopularOpt} />
                    </div>
                    <Carousel data={popular?.data?.results} loading={popular?.isLoading} endpoint={popularOpt} />
                </section>

                <section className='mb-8 md:mb-24'>
                    <div>
                        <span className='text-pahelo font-black text-3xl'>Top rated</span>
                        <OnOff opt={tOpt} stateChanger={setTopOpt} />
                    </div>
                    <Carousel data={toprated?.data?.results} loading={toprated?.isLoading} endpoint={topOpt} />
                </section>
                <Outlet />
            </div>

        </div>
    )
}

export default Root
