import { helper } from '../helper/helper';
import { taskSection } from "../UI/task-section";
import { projectSection } from "../UI/project-section";
import { taskModal } from '../UI/task-modal';
import makeForm from "../UI/form.js";

class View {
    constructor() {
        // root element
        this.app = helper.getElement('#app');

        // header
        this.header = helper.createElement('header');
        this.titleContainer = helper.createElement('div', 'title-container');
        this.projectTitle = helper.createElement('h1', 'project-title');

        // New project form
        this.projectForm = makeForm('project')
        
        // New task form
        this.taskForm = makeForm('task');
        
        // projects aside
        this.aside = helper.createElement('aside', undefined, 'projects');
        this.asideTitle = helper.createElement('h2', undefined, 'aside-title');
        this.asideTitle.textContent = "My Projects";

        // project list 
        this.projectList = projectSection.getProjectList();
   
        // Task section
        this.taskSection = taskSection.getTaskSection();

        // Task modal
        this.taskModal = taskModal.content;

        // Append UI components to app
        this.titleContainer.append(this.projectTitle)
        
        this.header.append(this.titleContainer, this.taskForm);

        this.aside.append(this.asideTitle, this.projectForm, this.projectList)

        
        this.app.append(this.header, this.aside, this.taskSection, this.taskModal);

        // Holds text input for editables
        this._temporaryProjectName;
        this._temporaryTaskName;
        this._temporaryTaskDescription;

        // Local listeners for editables
        this._initLocalListeners();

    }

    updateTitle(project) {
        if (project !== null) {
            this.projectTitle.innerHTML = project.title;
        } else {
            this.projectTitle.textContent = "Start a new project!";
        }  
    }

    get _projectText() {
        return this.projectForm.elements[0].value;
    }

    get _taskText() {
        return this.taskForm.elements[0].value;
    }

    _resetInput() {
        this.projectForm.elements[0].value = '';
        this.taskForm.elements[0].value = '';
    }

    displayTasks(project) {

       taskSection.displayTasks(project);
    }

    displayProjects(projects) {
        projectSection.displayProjects(projects);
    }

    displayModal(task) {
        taskModal.makeContent(task);
    }

    highlightCurrentProject(project) {
        if (project !== null) {
            projects = Array.from(this.projectList.children);
        // Remove previous highlighted project class
            projects.forEach(item => {
                item.classList.remove('project-selected');
                if (item.id == project.id) {
                    item.classList.add('project-selected');
                }
            })
        }
        // Get array of all project elements
        
    }

    displayCurrentProject(project) {
        this.highlightCurrentProject(project)
        this.updateTitle(project);
        this.displayTasks(project);
    }

    // Update temporary state for editables

    _initLocalListeners() {
        // Listener for project title
        this.projectList.addEventListener('input', event => {
            if (event.target.className == 'project-editable') {
                this._temporaryProjectName = event.target.innerText.replace(/\n/ig,"<br>");


            }
        })
        

        // Listener for task editables
        this.taskModal.addEventListener('input', event => {
            if (event.target.className == 'modal-title') {
                this._temporaryTaskName = event.target.innerText.replace(/\n/ig,"<br>");
            } else if (event.target.className == 'modal-description') {
                // Preserve line breaks
                this._temporaryTaskDescription = event.target.innerText.replace(/\n/ig,"<br>");   
            }
        })

        // When user clicks outside of modal
        window.addEventListener('click', event => {
            if (event.target.className == 'task-modal') {
                this.taskModal.style.display = 'none';
            }
        });

        // When user clicks close span
        this.taskModal.addEventListener('click', event => {
            if (event.target.className == 'modal-close') {
                this.taskModal.style.display = 'none';
            }
        });

   
    }  
     


    /* Bind handlers */
    

    // Project Handlers
    bindAddProject(handler) {
        this.projectForm.addEventListener('submit', event => {
            event.preventDefault();
            if (this._projectText) {
                handler(this._projectText);
                this._resetInput();
            }
        })
    }

    bindDeleteProject(handler) {
        this.projectList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id);
                handler(id);
            }
        })
    }

    // Task Handlers
    bindDeleteTask(handler) {
        this.taskSection.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id);
                handler(id);
            }
        })
        // Delete task from modal
        this.taskModal.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(this.taskModal.id);
                this.taskModal.style.display = 'none';
                handler(id);
            }
        })
    }

    

    bindAddTask(handler) {
        this.taskForm.addEventListener('submit', event => {
            event.preventDefault();
            if (this._taskText) {
                handler(this._taskText);
                this._resetInput();
            }
        })
    }

    bindSetCurrentProject(handler) {
        this.projectList.addEventListener('click', event => {
            if (event.target.tagName === 'H3') {
                const project = event.target.parentElement;
                const id = parseInt(project.id);
                handler(id);
            } else if(event.target.tagName == 'LI') {
                const project = event.target
                const id = parseInt(event.target.id);
                handler(id);
            }
        })
    }

    bindEditProjectName(handler) {
        this.projectList.addEventListener('focusout', event => {
            if (this._temporaryProjectName) {
                const id = parseInt(event.target.parentElement.id);
                handler(id, this._temporaryProjectName); 
                this.projectTitle.innerHTML = this._temporaryProjectName;
                this._temporaryProjectName = '';
            }
        })
    }

    bindEditTask(handler) {
        this.taskModal.addEventListener('focusout', element => {
            const id = parseInt(this.taskModal.id);
            if (this._temporaryTaskName) {
                handler(id, this._temporaryTaskName, 'title');
                this._temporaryTaskName = '';
            } else if (this._temporaryTaskDescription) {
                handler(id, this._temporaryTaskDescription, 'description');
                this._temporaryTaskDescription = '';
            }
        })
    }

    bindSelectTask(handler) {
        this.taskSection.addEventListener('click', event => {
            if (event.target.className === 'task') {
                const id = (event.target.id);
                handler(id);
                this.taskModal.style.display = "block";
            } else if (event.target.parentElement.className === 'task' &&
            event.target.className != 'delete') {
                const id = (event.target.parentElement.id);
                handler(id);
                this.taskModal.style.display = "block";
            }
        })
    }
}

export let view = new View();