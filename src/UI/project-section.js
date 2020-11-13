import { helper } from '../helper/helper';

class ProjectSection {
  constructor() {
    this._projectList = helper.createElement('ul', undefined, 'project-list');
  }

  displayProjects(projects) {
    // Delete all project nodes
    while (this._projectList.firstChild) {
      this._projectList.removeChild(this._projectList.firstChild);
    }

    if (projects.length === 0) {
      const li = helper.createElement('li');
      li.textContent = 'Start a new project!';
      this._projectList.append(li);
    } else {
      // Create project nodes for each project

      projects.forEach(this.makeProject.bind(this));
    }
  }

  // Makes DOM elements for individual project
  makeProject(project) {
    const li = helper.createElement('li');
    li.id = project.id;

    // make project title content-editable
    const title = helper.createElement('h3', 'project-editable');
    title.contentEditable = true;
    title.spellcheck = false;
    title.innerHTML = project.title;

    // Project delete button
    const deleteButton = helper.createElement('button', 'delete');
    deleteButton.textContent = 'Delete';

    // Append title and button to list item
    li.append(title, deleteButton);

    // Append list item to todo list
    this._projectList.append(li);
  }

  getProjectList() {
    return this._projectList;
  }
}

export const projectSection = new ProjectSection();
