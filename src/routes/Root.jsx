import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/header'
import { fetchData } from '../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigurations, getGenres } from '../store/rootSlice'
import useFetch from '../hooks/useFetch'
import Carousel from '../components/Carousel'

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

    const popular = useFetch("movie/popular?language=en-US&page=1");
    const playing = useFetch("movie/now_playing?language=en-US&page=1");
    const toprated = useFetch("movie/top_rated?language=en-US&page=1");

    return (
        <>
            <section className='max-w-screen-xl mx-auto text-white mb-16 md:mb-24'>
                <span className='text-pahelo font-black text-3xl'>Now Playing</span>
                <Carousel data={playing?.data?.results} loading={playing?.loading} />
                <Outlet />
            </section>
            <section className='max-w-screen-xl mx-auto text-white mb-16 md:mb-24'>
                <span className='text-pahelo font-black text-3xl'>Popular</span>
                <Carousel data={popular?.data?.results} loading={popular?.loading} />
                <Outlet />
            </section>
            <section className='max-w-screen-xl mx-auto text-white mb-16 md:mb-24'>
                <span className='text-pahelo font-black text-3xl'>Top rated</span>
                <Carousel data={toprated?.data?.results} loading={toprated?.loading} />
                <Outlet />
            </section>
        </>
    )
}

export default Root
