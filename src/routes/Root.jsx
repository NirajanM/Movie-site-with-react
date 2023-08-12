import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Header from '../components/header'
import { fetchData } from '../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigurations, getGenres } from '../store/rootSlice'


function Root() {

    // const dispatch = useDispatch();
    // const url = useSelector((state) => state.home.url.total_pages);
    // console.log(url)

    // useEffect(() => {
    //     apiTesting();
    // }, []);

    // const apiTesting = () => {
    //     fetchData('movie/now_playing?language=en-US&page=1').then(
    //         (res) => {
    //             console.log(res);
    //             dispatch(getApiConfigurations(res))
    //         }
    //     )
    // }

    useEffect(() => {
        fetchPopular();
    }, []);

    const [popularMovies, setPopularMovies] = useState([]);

    const fetchPopular = () => {
        fetchData('movie/now_playing?language=en-US&page=1').then(
            (res) => {
                setPopularMovies(res.results);
            }
        )
    }


    return (
        <>
            <section className='max-w-screen-xl mx-auto text-white'>
                <span className='text-pahelo font-black text-3xl'>Now Playing</span>
                <div className='flex flex-col'>
                    {popularMovies && popularMovies.map(popularMovie => {
                        return (<span>{popularMovie.original_title}</span>);
                    })}
                </div>
                <Outlet />
            </section>
        </>
    )
}

export default Root
