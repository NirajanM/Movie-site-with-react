import Menu from '../components/Menu'
import Header from '../components/header'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
    return (
        <>
            <Header />
            <div className='flex max-w-screen-xl mx-auto'>
                <Menu />
                <Outlet />
            </div>
        </>
    )
}
