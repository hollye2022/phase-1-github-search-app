let searchRepo = true;

document.addEventListener("DOMContentLoaded", handleEvent)
function handleEvent(){
    let form = document.getElementById("github-form");
form.addEventListener("submit", e => {
    e.preventDefault();
    if(!searchRepo){
        search();
    } else {
        toRepo();
    }
});

function search(e, name){
    let input = document.getElementById("search");
    name = input.value;
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(res => res.json())
    .then(data => {
       
        console.log(data.items)
        data.items.forEach(el => {
            let userList = document.getElementById("user-list");
            let li = document.createElement("li")
            li.textContent = el.login;
            li.addEventListener("click", () => {
                toRepo(el.login)});
            let img = document.createElement("img");
            img.src = el["avatar_url"];
            let link = document.createElement("p");
            link.textContent = el.url;
        userList.append(li,img,link)
        
        } )
    } )  
}

function toRepo(name){
    // e.preventDefault();
    fetch(`https://api.github.com/users/${name}/repos`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(el => {
            let ul= document.getElementById("repos-list");
            let li = document.createElement("li");
            li.textContent = el.name;
            ul.append(li);
        })
    })

  
}
}



// create another button 
document.addEventListener("DOMContentLoaded", handleEvent2)

function handleEvent2(){
    let switchBtn = document.getElementById("switch-btn");
    switchBtn.addEventListener("click", e => switchSearch(e));

function switchSearch(){
    // e.preventDefault();
    console.log("hello")

    if(searchRepo){
        console.log("hi")
        switchBtn.textContent = "Search Repo";
    } else{
        switchBtn.textContent = "Search User";

    }
    searchRepo = !searchRepo
}


}


