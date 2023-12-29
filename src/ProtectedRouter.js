import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({ children }) {
    return (
        <>
            {localStorage.getItem("Login") ? <>{children}</> : <>  <Navigate to={'/login'} replace /> </>}
        </>
    )
}
