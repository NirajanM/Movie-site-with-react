import React from 'react'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
