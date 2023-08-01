import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import { fetchData } from '../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfigurations, getGenres } from '../store/rootSlice'


function Root() {

    const dispatch = useDispatch();
    const url = useSelector((state) => state.home.url.total_pages);
    console.log(url)

    useEffect(() => {
        apiTesting();
    }, []);

    const apiTesting = () => {
        fetchData('movie/popular').then(
            (res) => {
                console.log(res);
                dispatch(getApiConfigurations(res))
            }
        )
    }
    return (
        <>
            <Header />
            <div className='max-w-screen-xl mx-auto text-white'>
                {url}
            </div>
        </>
    )
}

export default Root
