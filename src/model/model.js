import Project from '../components/project.js';
import Task from '../components/task.js';
import { taskSection } from '../UI/task-section.js';

class Model {
    constructor() {
        // Array of projects from local storage or empty array
        this.projects = JSON.parse(localStorage.getItem('projects')) || [];

        // Project currently displayed
        this._currentProject = JSON.parse(localStorage.getItem('currentProject')) || null;
    }

    _commit(projects) {
        // Update view
        this.onProjectChanged(projects);
        // Commit to storage
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Add project to projects array
    addProject(projectTitle) {
        const id = this.projects.length > 0 ? this.projects[this.projects.length - 1].id + 1 : 1;
        const project = new Project(projectTitle, id);
        this.projects.push(project);
        this._commit(this.projects);
        this.currentProject = id;

        // Update view
        
    }

    // Filter project out of projects by id
    deleteProject(id) {
        this.projects = this.projects.filter((project) => project.id !== id);
        
        this._commit(this.projects);
        
        if (this.projects.length > 0) {
            this.currentProject = this.projects[0].id;
        } else {
            this.currentProject = null;
        }  
    }

    editProjectTitle(id, updatedTitle) {
        for (const project of this.projects) {
            if (project.id == id) {
                project.title = updatedTitle;
            }
        }
        this._commit(this.projects);
    }

    // Add task to current project
    addTask(title) {
        if (this.currentProject !== null) {
            const id = this.currentProject.tasks.length > 0 ? this.currentProject.tasks[this.currentProject.tasks.length - 1].id + 1 : 1;
            const task = new Task(title, undefined, id);
            this.currentProject.tasks.push(task);
            this._commit(this.projects);
            this.onTaskChanged(this.currentProject);
        }
    }

    // Deletes task from current project with id
    deleteTask(id) {
        this.currentProject.tasks = this.currentProject.tasks.filter((task) => task.id !== id);
        this._commit(this.projects);
        this.onTaskChanged(this.currentProject);
    }
    // Edit task
    editTask(id, text, element) {
        for (const task of this.currentProject.tasks) {
            if (task.id == id) {
                if (element === 'title') {
                   task.title = text; 
                } else if (element === 'description') {
                    task.description = text;
                }
            }
        }
        this._commit(this.projects);
        this.onTaskChanged(this.currentProject);
    }

    // Sets current project to id, tells controller to update display
    set currentProject(id) {
        this._currentProject = id;
        localStorage.setItem('currentProject', JSON.stringify(id));
        this.setCurrentProject(this.currentProject)
    }

    // Returns current project object, or returns null
    get currentProject() {
        if (this._currentProject === null) {
            return null;
        } else {
            for (const project of this.projects) {
                if (project.id === this._currentProject) {
                    return project;
                }
            } 
        }   
    }

    // Returns selected task by id
    getTask(id) {
        const task = this.currentProject.tasks.find(task => task.id == id);
        this.onTaskSelected(task);
    }

    // Binds controller callbacks
    
    bindSetCurrentProject(callback) {
        this.setCurrentProject = callback;
    }

    bindProjectListChanged(callback) {
        this.onProjectChanged = callback;
    }

    bindTaskChanged(callback) {
        this.onTaskChanged = callback;
    }

    bindSelectTask(callback) {
        this.onTaskSelected = callback;
    }
}

export let model = new Model();