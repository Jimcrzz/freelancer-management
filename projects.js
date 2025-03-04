const projectsSection = document.getElementById('projects');

const projectForm = document.createElement('form');
projectForm.innerHTML = `
    <h2>Crear Proyecto</h2>
    <label>Nombre: <input type="text" id="project-name"></label>
    <label>Descripción: <input type="text" id="project-description"></label>
    <button type="button" onclick="addProject()">Agregar Proyecto</button>
`;

const projectList = document.createElement('div');
projectList.innerHTML = `<h2>Lista de Proyectos</h2><ul id="project-list"></ul>`;

projectsSection.appendChild(projectForm);
projectsSection.appendChild(projectList);

function addProject() {
    const project = {
        name: document.getElementById('project-name').value,
        description: document.getElementById('project-description').value,
        tasks: []
    };
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(project);
    localStorage.setItem('projects', JSON.stringify(projects));
    displayProjects();
}

function displayProjects() {
    const projectListElement = document.getElementById('project-list');
    projectListElement.innerHTML = '';
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = `${project.name} - ${project.description}`;
        listItem.appendChild(createTaskForm(project.name));
        listItem.appendChild(createTaskList(project.name));
        projectListElement.appendChild(listItem);
    });
}

function createTaskForm(projectName) {
    const taskForm = document.createElement('form');
    taskForm.innerHTML = `
        <label>Tarea: <input type="text" class="task-name"></label>
        <label>Descripción: <input type="text" class="task-description"></label>
        <label>Plazo: <input type="date" class="task-deadline"></label>
        <label>Prioridad: 
            <select class="task-priority">
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>
        </label>
        <button type="button" onclick="addTask('${projectName}')">Agregar Tarea</button>
    `;
    return taskForm;
}

function createTaskList(projectName) {
    const taskList = document.createElement('div');
    taskList.innerHTML = `<h3>Tareas</h3><ul id="task-list-${projectName}"></ul>`;
    return taskList;
}

function addTask(projectName) {
    const projectIndex = getProjectIndex(projectName);
    if (projectIndex !== -1) {
        const task = {
            name: document.querySelector(`#project-list input.task-name`).value,
            description: document.querySelector(`#project-list input.task-description`).value,
            deadline: document.querySelector(`#project-list input.task-deadline`).value,
            priority: document.querySelector(`#project-list select.task-priority`).value,
            completed: false
        };
        let projects = JSON.parse(localStorage.getItem('projects')) || [];
        projects[projectIndex].tasks.push(task);
        localStorage.setItem('projects', JSON.stringify(projects));
        displayProjects();
    }
}

function getProjectIndex(projectName) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    return projects.findIndex(project => project.name === projectName);
}

document.addEventListener('DOMContentLoaded', displayProjects);