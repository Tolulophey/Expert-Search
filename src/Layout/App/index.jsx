import React from 'react'
import { Link, Outlet } from 'react-router-dom'
// import Nav from "../../pages/End User/Home/Nav"
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'


const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout