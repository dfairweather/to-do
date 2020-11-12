import { model } from '../model/model';
import { view } from '../view/view';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Binds adding new project
        this.view.bindAddProject(this.handleAddProject.bind(this));
        this.model.bindProjectListChanged(this.onProjectChanged.bind(this));

        // Binds Deleting Project
        this.view.bindDeleteProject(this.handleDeleteProject.bind(this));

        // Binds Editing project name
        this.view.bindEditProjectName(this.handleEditProjectName.bind(this));

        //Binds adding new task
        this.view.bindAddTask(this.handleAddTask.bind(this));
        this.model.bindTaskChanged(this.onTaskChanged.bind(this));

        // Binds select task modal event
        this.view.bindSelectTask(this.handleSelectTask.bind(this));
        this.model.bindSelectTask(this.onTaskSelected.bind(this))

        // Binds deleting task
        this.view.bindDeleteTask(this.handleDeleteTask.bind(this));
        
        // Binds editing task
        this.view.bindEditTask(this.handleEditTask.bind(this));

        //Binds selecting a project
        this.view.bindSetCurrentProject(this.handleSetCurrentProject.bind(this));
        this.model.bindSetCurrentProject(this.setCurrentProject.bind(this));

        // Display intitial project
        if (this.model.projects.length == 0) {
            this.model.addProject("Default Project");
        } else {
            this.onProjectChanged(this.model.projects);
            this.setCurrentProject(model.currentProject);
        }
        
    }

    // Project Handlers 

    onProjectChanged(projects) {
        this.view.displayProjects(projects);  
    }

    handleAddProject(title) {
        this.model.addProject(title);
    }

    setCurrentProject(project) {
        this.view.displayCurrentProject(project)
    }

    handleSetCurrentProject(id) {
        this.model.currentProject = id;
    }

    handleDeleteProject(id) {
        this.model.deleteProject(id);
    }

    handleEditProjectName(id, updatedTitle) {
        this.model.editProjectTitle(id, updatedTitle);
    }
    
    // Task Handlers

    onTaskChanged(project) {
        this.view.displayTasks(project);
        this.view.highlightCurrentProject(project);
    }

    handleAddTask(task) {
        this.model.addTask(task);
    }

    handleDeleteTask(id) {
        this.model.deleteTask(id);
    }

    handleEditTask(id, text, element) {
        this.model.editTask(id, text, element);
    }

    // Modal Handlers

    onTaskSelected(task) {
        this.view.displayModal(task);
    }

    handleSelectTask(id) {
        this.model.getTask(id);
    }
}

export let controller = new Controller(model, view);