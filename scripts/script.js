// Track the current contributing user.
// Can be switched by mousing down username in the grey box.
let currentUser = 0;
// Current number of users (minimum of 1).
let numUsers = 1;
// Hardcoded to maximum of 4 users. 
// Scroll function may have this unused.
const MAX_USERS = 4;

// Total number of contributions from all users.
let totalContributions = 0;

// List of dictionaries containing user data: name and contribution amount.
const users = [{ name: "User1", value: 0 }];
// Project name in middle top toolbar.
const projectNameLbl = document.getElementById("projectName");
// Username in top right toolbar.
const userNameLbl = document.getElementById("userName");
// User information in grey box area.
const userInfo = document.getElementById("userInfo");
// Div for the graph background.
const graph = document.getElementById("graph");

// Projects list from index.html, may give back empty list.
const projects = JSON.parse(sessionStorage.getItem("projects")) || [];

// Start with your current username. User1
userNameLbl.textContent = users[currentUser].name;
// Project name is hardcoded.
projectNameLbl.textContent = projects[0].title;

// Generate bars for all users.
makeUserBars();

// Adds another user with bar and info.
document.querySelector("#addUserBtn")
.addEventListener("mousedown", () => addUser());

// Opens prompt, gets contribution.
document.querySelector("#contribute")
.addEventListener("mousedown", () => contribute());

// Opens prompt, removes contribution.
document.querySelector("#withdraw")
.addEventListener("mousedown", () => withdraw());

// Shows total for all bar.
document.querySelector("#total")
.addEventListener("mousedown", () => makeTotalBar());

// Go back to all user bars.
document.querySelector("#all")
.addEventListener("mousedown", () => makeUserBars());

// Checks to see if user moused on the username 
// in the grey box at the bottom of the page.
userInfo.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("userName")) {
        // Switch to that user.
        switchUser(event.target);
    }
});

// Switch user when the username is moused in
// the grey box at the bottom of the page.
function switchUser(clickedElement){
    // Get the number at the end of the user name.
    currentUser = parseInt(clickedElement.textContent.at(-1)) - 1;
    // Display the name on the top right toolbar.
    userNameLbl.textContent = users[currentUser].name;
}

// Removes money given.
function withdraw() {
    let withdrawal = parseInt(prompt("Please enter your withdrawal", "0"));
    // Remove from the total individual contributions 
    // using the current user index.
    users[currentUser].value -= withdrawal;
    makeUserBars();
}

// Add money.
function contribute() {
    let contribution = parseInt(prompt("Please enter your contribution", "0"));
    // Get the total individual contributions using the current user index.
    users[currentUser].value += contribution;
    // Regenerate the user bars.
    makeUserBars();
}

function addUser() {
    // Do nothing if number of users exceeds max users.
    if (numUsers < MAX_USERS) {
        // Increment number of users after adding.
        numUsers++; 
        // Push the new user to user list.
        users.push({
            // Cat a number to the end.
            name: "User" + numUsers.toString(),
            value: 0
        });
        // Regenerate the user bars.
        makeUserBars();
    }
}

// Fires when total button presses.
function makeTotalBar(){
    graph.innerHTML = "";
    // Make one bar of all user contributions.
    makeSingleBar("Total", totalContributions);
}

// Generates bars for each user and generates user info in the grey box.
function makeUserBars() {
    // Clear graph.
    graph.innerHTML = "";

    users.forEach((user) => {
        // Make multible bars of each user contributions.
        makeSingleBar(user.name, user.value);
    });
    // Regenerate the user bars.
    makeInfoArea();
}

// Makes a bar that's placed on the graph.
function makeSingleBar(barText, barHeight){
    // Div that contains the bar.
    const container = document.createElement("div");
    container.className = "bar-container";
    
    // Div that is the bar itself.
    const bar = document.createElement("div");
    bar.className = "bar";
    //Change the bar height.
    bar.style.height = barHeight + "px";
    
    // Username below the bar
    const label = document.createElement("p");
    label.textContent = barText;
    
    // Place in container, then in graph.
    container.appendChild(bar);
    container.appendChild(label);
    graph.appendChild(container);
}

// Grey box area at the bottom of the page. Contains user information.
function makeInfoArea() {
    // Clear total contributions.
    totalContributions = 0;
    // Clear gray box area.
    userInfo.innerHTML = "";
    userInfo.className = "userInfo";
    
    // Create a label for every username and amount contributed.
    users.forEach((user) => {
        // Label for username.
        const nameLbl = document.createElement("p");
        nameLbl.textContent = user.name;
        nameLbl.className = "userName";
        // Show total contributions from one user.
        const valLbl = document.createElement("p");
        valLbl.textContent = `Contributions: $${user.value}`;
        
        totalContributions += user.value;
        // Add to grey box area.
        userInfo.appendChild(nameLbl);
        userInfo.appendChild(valLbl);
    });
    // Show total contributions from all users.
    const totalValLbl = document.createElement("p");
    totalValLbl.textContent = `Total contributions: $${totalContributions}`;
    // Add to grey box area.
    userInfo.appendChild(totalValLbl);
}