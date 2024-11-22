import { PropsWithChildren } from 'react'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const GuestLayout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <Head>
                <title>Laravel</title>
            </Head>
            <ToastContainer />
            <div className="font-sans text-gray-900 antialiased">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
