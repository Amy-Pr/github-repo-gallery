const overview = document.querySelector(".overview");//Div with my profile info
const username = "Amy-Pr";
const reposList = document.querySelector(".repo-list"); //the unordered list to display my repos
const repoSection = document.querySelector(".repos"); //section with repos info
const repoData = document.querySelector(".repo-data"); //individual repo data
const backButton = document.querySelector(".view-repos"); //Back to gallery button
const filterInput = document.querySelector(".filter-repos"); //Search input



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
    filterInput.classList.remove("hide");
    for (repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        reposList.append(li);
    };

};

const repoListClick = reposList.addEventListener ("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        //console.log(repoName);
        getRepoData(repoName);
    }
});

const getRepoData = async function(repoName) {
    const res = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    //console.log(languageData); 
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        //console.log(languages);
    }
    displayRepoData(repoInfo, languages);
};

const displayRepoData = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const newDiv = document.createElement ("div");
    newDiv.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
        repoData.append(newDiv);
        repoData.classList.remove("hide");
        repoSection.classList.add("hide");
        backButton.classList.remove("hide");
};

backButton.addEventListener ("click", function() {
    repoSection.classList.remove("hide");
    repoData.classList.add("hide");
    backButton.classList.add("hide");
});

filterInput.addEventListener ("input", function (e) {
    const searchText = e.target.value; 
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchTextLower = searchText.toLowerCase();
    //console.log(repos);
    for (const repo of repos) {
        const repoTextLower = repo.innerText.toLowerCase();
        if (repoTextLower.includes(searchTextLower)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        };
    };
    
});


