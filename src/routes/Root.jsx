import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/header'
import { fetchData } from '../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigurations, getGenres } from '../store/rootSlice'
import useFetch from '../hooks/useFetch'

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

    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("movie/popular?language=en-US&page=1");
    console.log(data);

    return (
        <>
            <section className='max-w-screen-xl mx-auto text-white'>
                <span className='text-pahelo font-black text-3xl'>Now Playing</span>
                <div className='flex flex-col'>
                    {data && data.results.map(popularMovie => {
                        return (
                            <>
                                <div className='w-52'>
                                    <img src={url.backdrop + popularMovie.poster_path} alt={popularMovie.original_title} />
                                </div>
                                <span>{loading ? "loading ..." : popularMovie.original_title}</span>
                            </>
                        );
                    })}
                </div>
                <Outlet />
            </section>
        </>
    )
}

export default Root
