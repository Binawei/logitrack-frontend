import React from 'react'
import NavBarDefaultType from './NavBarDefaultType'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from "./AdminDashboard"
import AdminOrderTable from './AdminOrderTable'
import AllCustomer from './AllCustomers'
import AllRiders from './AllRiders'
import CreateRider from './CreateRider'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function GeneralPage() {

    return (
        <div>
            <NavBarDefaultType />
            <div>
                <AdminSideBar />
                <div>
                    <Routes>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/admin-all-orders" element={<AdminOrderTable />} />
                        <Route path="/allcustomers" element={<AllCustomer />} />
                        <Route path="/allriders" element={<AllRiders />} />
                        <Route path="/create-rider" element={<CreateRider />} />
                    </Routes>
                </div>
                
            </div>
            <ToastContainer />
        </div>
    )
}

export default GeneralPage