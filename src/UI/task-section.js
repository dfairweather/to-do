import { helper } from '../helper/helper';

class TaskSection {
    constructor() {
        this._taskSection = helper.createElement('div', undefined, 'tasks');
    }

    // Displays each task in project
    displayTasks(project) {
        // Delete all task nodes
        while (this._taskSection.firstChild) {
            this._taskSection.removeChild(this._taskSection.firstChild);
        }
        
        if (project !== null && project.tasks.length !== 0) {
            project.tasks.forEach(this.makeTask.bind(this));
        } 
    }

    // Makes task DOM elements
    makeTask(task) {

        const div = helper.createElement('div', 'task');
        div.id = task.id;

        const title = helper.createElement('h3', 'task-title');
        title.innerHTML = task.title;

        const description = helper.createElement('p', 'task-description');
        if (task.description) {
            description.innerHTML = task.description;
        }

        // Task delete button
        const deleteButton = helper.createElement('button', 'delete');
        deleteButton.textContent = 'Delete';

        // Date
        const date = helper.createElement('p', 'date');
        date.innerText = task.date;

        div.append(title, description, date, deleteButton);
        
        this._taskSection.append(div);
    }

    getTaskSection() {
        return this._taskSection;
    }
}


export let taskSection = new TaskSection;