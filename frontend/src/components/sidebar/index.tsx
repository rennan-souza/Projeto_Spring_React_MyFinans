import { NavLink } from "react-router-dom";
import { removeSidebarExpand, sidebarExpand } from "../../services/SidebarService";

function Sidebar() {
    return (
        <>
            <div className="sidebar-bg" id="sidebarBg" onClick={sidebarExpand}></div>
            <div className="c-sidebar" id="sidebar">
                <NavLink to="/home" className={({ isActive }) => isActive ? "c-sidebar-link-active" : ""} onClick={removeSidebarExpand}>
                    <i className="bi bi-house-check"></i>
                    Home
                </NavLink>

                <NavLink to="/cadastrar-lancamento" className={({ isActive }) => isActive ? "c-sidebar-link-active" : ""} onClick={removeSidebarExpand}>
                    <i className="bi bi-plus-lg"></i>
                    Novo lançamento
                </NavLink>

                <NavLink to="/buscar-lancamentos" className={({ isActive }) => isActive ? "c-sidebar-link-active" : ""} onClick={removeSidebarExpand}>
                    <i className="bi bi-search"></i>
                    Buscar lançamentos
                </NavLink>

                <NavLink to="/buscar-lancamentos"  onClick={removeSidebarExpand}>
                    <i className="bi bi-person-fill-gear"></i>
                    Meus dados
                </NavLink>
            </div>
        </>
    )
}

export default Sidebar;