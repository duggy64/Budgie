let currentUser = 0;
let numUsers = 1;
const MAX_USERS = 4;

let totalContributions = 0;

const users = [{ name: "User1", value: 0 }];
const projectNameLbl = document.getElementById("projectName");
const userNameLbl = document.getElementById("userName");
const userInfo = document.getElementById("userInfo");
const graph = document.getElementById("graph");

const projects = JSON.parse(sessionStorage.getItem("projects")) || [];

userNameLbl.textContent = users[currentUser].name;
projectNameLbl.textContent = projects[0].title;

makeUserBars();

document.querySelector("#addUserBtn")
.addEventListener("mousedown", () => addUser());

document.querySelector("#contribute")
.addEventListener("mousedown", () => contribute());

document.querySelector("#withdraw")
.addEventListener("mousedown", () => withdraw());

document.querySelector("#total")
.addEventListener("mousedown", () => makeTotalBar());

document.querySelector("#all")
.addEventListener("mousedown", () => makeUserBars());

userInfo.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("userName")) {
        switchUser(event.target);
    }
});

function switchUser(clickedElement){
    currentUser = parseInt(clickedElement.textContent.at(-1)) - 1;
    userNameLbl.textContent = users[currentUser].name;
}

function withdraw() {
    let withdrawal = parseInt(prompt("Please enter your withdrawal", "0"));
    users[currentUser].value -= withdrawal;
    makeUserBars();
}

function contribute() {
    let contribution = parseInt(prompt("Please enter your contribution", "0"));
    users[currentUser].value += contribution;
    makeUserBars();
}

function addUser() {
    if (numUsers < MAX_USERS) {
        numUsers++;
        users.push({
            name: "User" + numUsers.toString(),
            value: 0
        });

        makeUserBars();
    }
}

function makeTotalBar(){
    graph.innerHTML = "";
    makeSingleBar("Total", totalContributions);
}

function makeUserBars() {
    graph.innerHTML = "";

    users.forEach((user) => {
        makeSingleBar(user.name, user.value);
    });

    makeInfoArea();
}

function makeSingleBar(barText, barHeight){
    const container = document.createElement("div");
    container.className = "bar-container";

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = barHeight + "px";

    const label = document.createElement("p");
    label.textContent = barText;

    container.appendChild(bar);
    container.appendChild(label);
    graph.appendChild(container);
}

function makeInfoArea() {
    totalContributions = 0;
    
    userInfo.innerHTML = "";
    userInfo.className = "userInfo";

    users.forEach((user) => {
        const nameLbl = document.createElement("p");
        nameLbl.textContent = user.name;
        nameLbl.className = "userName";
        
        const valLbl = document.createElement("p");
        valLbl.textContent = `Contributions: $${user.value}`;
        
        totalContributions += user.value;

        userInfo.appendChild(nameLbl);
        userInfo.appendChild(valLbl);
    });
    
    const totalValLbl = document.createElement("p");
    totalValLbl.textContent = `Total contributions: $${totalContributions}`;
    userInfo.appendChild(totalValLbl);
}