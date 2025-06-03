import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { getAccessTokenPayload } from "../../services/AuthService";
import { sidebarExpand } from "../../services/SidebarService";

function Navbar() {

    const { setAuthContextData } = useContext(AuthContext);

    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token")
        setAuthContextData({ authenticated: false })
        navigate("/login")
    }

    return (
        <div className="c-navbar">
            <a href="#" className="c-navbar-logo">
                <i className="bi bi-coin"></i>
                MyFinans
            </a>
            <div className="btn-sidebar-toggle" onClick={sidebarExpand}>
                <i className="bi bi-list"></i>
            </div>
            <div className="c-navbar-user-container">
                <p className="c-navbar-user">{getAccessTokenPayload()?.sub}</p>
                <button type="button" className="btn btn-sm btn-secondary" onClick={handleLogout}>Sair</button>
            </div>
        </div>
    )
}

export default Navbar;