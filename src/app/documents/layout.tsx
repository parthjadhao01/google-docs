import React from 'react'
interface DocumentLayoutProps {
    children : React.ReactNode
}

function Layout({children} : DocumentLayoutProps) {
    return <div className="flex flex-col gap-y-4">
        <p>Document navbar</p>
        {children}
    </div>
}

export default Layout
