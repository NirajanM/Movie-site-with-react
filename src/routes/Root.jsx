import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import { fetchData } from '../utils/api'

function Root() {
    useEffect(() => {
        apiTesting();
    }, []);

    const apiTesting = () => {
        fetchData('movie/popular').then(
            (res) => {
                console.log(res);
            }
        )
    }
    return (
        <>
            <Header />
            <div className='max-w-screen-xl mx-auto'>
            </div>
        </>
    )
}

export default Root
