// A list that will save each element as a 
// dictionary with project information.
const projectList = [];

// A div for each project information text.
const homeContainer = document.getElementById("homeDiv");

// New project anchor on the top left tool bar.
document.getElementById("newProject")
.addEventListener("mousedown", () => makeNewProject());

// Open a project by mousing down on a project.
window.addEventListener("mousedown", (event) => {
    // Looks if the element you pressed contains class name "projectLine".
    if (event.target.classList.contains("projectLine")) {
        // Open the project.
        window.location.href = "project.html";
    }
});

function makeNewProject(){
    // Clear old data.
    homeContainer.innerHTML = "";
    
    // Name of project and amount to reach the goal.
    let projectNamePrompt = prompt("Enter Project Name", "Project1");
    let projectGoalPrompt = prompt("Enter Goal Amount", "0");
    
    // Push dictionary information into project list. 
    projectList.push({
        title: projectNamePrompt,
        goal: projectGoalPrompt,
        contributions: 0,
        total: 0
    });
    
    
    // Go through all projects. Lines of text will 
    // generate and display each project information.
    projectList.forEach((project) => {
        // Generate each line.
        const line = document.createElement("p");
        line.className = "projectLine";
        
        // Add information to the text content.
        line.textContent =
            project.title +
            " Goal: $" + project.goal +
            " Contributions: $" + project.contributions +
            " Total: $" + project.total;
        
        // Add each line to the home container
        homeContainer.appendChild(line);
    });
    
    // Save the project list to be used in project.html.
    sessionStorage.setItem("projects", JSON.stringify(projectList));
}
