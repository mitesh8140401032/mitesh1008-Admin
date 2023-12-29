import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashborad from './Components/Dashoborad'
import ProtectedRouter from './ProtectedRouter'
import Login from './Components/Login';
export default function RouterContainer() {
    return (
        <div>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRouter><Dashborad /></ProtectedRouter>} />


                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
