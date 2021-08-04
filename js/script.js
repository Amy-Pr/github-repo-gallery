const overview = document.querySelector(".overview");//Div with my profile info
const username = "Amy-Pr";
const reposList = document.querySelector(".repo-list"); //the unordered list to display my repos


const getData = async function() {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
    showProfile(data);
};

getData();

const showProfile = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = 
    `<figure>
    <img alt="user avatar" src=${data.avatar_url}/>
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
};

const getRepos = async function() {
    const res = await fetch (`https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`);
    const data = await res.json();
    console.log(data);
    showRepos(data);
};
getRepos ();

const showRepos = function (repos) {
    for (repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(li);
    };

};