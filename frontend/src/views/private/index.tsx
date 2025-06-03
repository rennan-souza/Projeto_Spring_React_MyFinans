import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";


function Private() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
}

export default Private;