export function sidebarExpand() {
    document.getElementById("sidebar")?.classList.toggle("sidebar-expand");
    document.getElementById("sidebarBg")?.classList.toggle("sidebar-bg-expand");
}

export function removeSidebarExpand() {
    document.getElementById("sidebar")?.classList.remove("sidebar-expand");
    document.getElementById("sidebarBg")?.classList.remove("sidebar-bg-expand");
}