if('serviceWorker' in navigator){
    navigator.serviceWorker.register("../sw.js")
    .then((sw)=>{console.log("sw registred succesfuly", sw)})
    .catch((err)=>{console.error("Error at Service Worker registration\n", err)})
}