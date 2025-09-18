import React from 'react'
import { Routes, Route } from "react-router-dom";
import Bus from '../../pages/Bus'
import Help from '../../pages/Help'
import Hub from '../../pages/Hub'
import Tickets from '../../pages/Tickets'
import TripPlan from '../../pages/TripPlan';
import Setting from '../../pages/Setting';

const Approutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Bus />}></Route>
            <Route path="/Tickets" element={<Tickets />}></Route>
            <Route path="/Hub" element={<Hub />}></Route>
            <Route path="/TripPlan" element={<TripPlan />}></Route>
            <Route path="/Help" element={<Help />}></Route>
            <Route path="/Setting" element={<Setting />}></Route>

        </Routes>
    )

}

export default Approutes
