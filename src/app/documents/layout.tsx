import React from 'react'
interface DocumentLayoutProps {
    children : React.ReactNode
}

function Layout({children} : DocumentLayoutProps) {
    return <div className="flex flex-col gap-y-4">
        {children}
    </div>
}

export default Layout
