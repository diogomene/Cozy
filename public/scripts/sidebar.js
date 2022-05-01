const menuBtn = document.getElementById("menu")
const sidebar = document.querySelector(".sidebar")
const body = document.querySelector("body")
let state = false
function closeSidebarOnOutClick(e){
        if(!sidebar.contains(e.target)){
            toggleSidebar()
        }

}
function toggleSidebar(){
    state = !state 
    sidebar.classList.toggle("active")
    menuBtn.classList.toggle("active")
    if(state){
        setTimeout(()=>{
            body.addEventListener("click", closeSidebarOnOutClick)
        },100)
    }else{
        body.removeEventListener("click", closeSidebarOnOutClick);
    }
    
}
menuBtn.addEventListener("click", toggleSidebar)