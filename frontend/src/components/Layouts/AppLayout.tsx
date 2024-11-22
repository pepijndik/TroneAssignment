import { PropsWithChildren, ReactNode } from 'react'
import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import ErrorMessage from '../Errors'
import { useErrors } from '@/hooks/error'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    header: ReactNode
}

const AppLayout = ({ header, children }: PropsWithChildren<Props>) => {
    const { user } = useAuth({ middleware: 'auth' })
    const {errors} = useErrors();
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
             <ToastContainer />
            <Navigation {...user} />

            {/* Page Heading */}
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {header}
                </div>
            </header>

            {/* Page Content */}
            <main>{children}</main>
            
        </div>
    )
}

export default AppLayout
