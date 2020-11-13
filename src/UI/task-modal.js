import { helper } from '../helper/helper';

class TaskModal {
  constructor() {
    this._modal = helper.createElement('div', 'task-modal');
  }

  makeContent(task) {
    this._modal.id = task.id;

    // Remove current modal content
    while (this._modal.firstChild) {
      this._modal.removeChild(this._modal.firstChild);
    }

    const content = helper.createElement('div', 'modal-content');

    // task title
    const title = helper.createElement('h3', 'modal-title');
    title.innerHTML = task.title;
    title.contentEditable = true;
    title.spellcheck = false;

    // Task description
    const description = helper.createElement('p', 'modal-description');
    if (task.description) {
      description.innerHTML = task.description;
    }

    description.contentEditable = true;
    description.spellcheck = false;

    // Close modal
    const close = helper.createElement('span', 'modal-close');
    close.innerHTML = '&times;';

    // Date
    const date = helper.createElement('p', 'date');
    date.innerText = task.date;

    // Task delete button
    const deleteButton = helper.createElement('button', 'delete');
    deleteButton.textContent = 'Delete';

    content.append(close, title, description, date, deleteButton);

    this._modal.append(content);
  }

  get content() {
    return this._modal;
  }
}

export const taskModal = new TaskModal();
