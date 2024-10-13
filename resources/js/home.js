const nav = document.getElementsByClassName("navClr")[0];
console.log(typeof nav);
if (nav) {
  nav.addEventListener("click", () => {
    console.log("dd");
    if (nav.style.color != "#0099ff") {
      nav.style.color = "#0099ff";
    } else {
      nav.style.color = "#000";
    }
  });
}
fetch(`http://localhost:3300/api/skills`)
  .then((response) => response.json())
  .then((data) => {
    const skillsList = document.getElementById("skillsList");

    // Loop through each skill and add to the list
    data.forEach((skill) => {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";

      // Add skill name
      listItem.innerHTML = `
            ${skill.skill_name}
            ${getLevelText(skill.skill_level)}</span>
        `;

      // Append the list item to the skills list
      skillsList.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error("Error fetching skills:", error);
  });

function getLevelText(level) {
  switch (level) {
    case "0":
      return `<span class="badge bg-info rounded-pill">Beginner`;
    case "1":
      return `<span class="badge bg-success rounded-pill">Intermediate`;
    case "2":
      return `<span class="badge bg-warning rounded-pill">Advanced`;
    case "3":
      return `<span class="badge bg-primary rounded-pill">Expert`;
    default:
      return `<span class="badge bg-primary rounded-pill">`;
  }
}

fetch(`http://localhost:3300/api/projects`)
  .then((response) => response.json())
  .then((data) => {
    const projectsGrid = document.getElementById("projects-grid");

    // Loop through each skill and add to the list
    data.forEach((project) => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4"; // 4 columns per row for medium screens and above

      // Create a card for each project
      const card = `
            <div class="card shadow-sm">
            <a href='${project.project_url} ' class="text-decoration-none text-reset">            
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
               
                    </div>
                    </a>

            </div>
        `;

      col.innerHTML = card;
      projectsGrid.appendChild(col);
    });
  })
  .catch((error) => {
    console.error("Error fetching skills:", error);
  });
