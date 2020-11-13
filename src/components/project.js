class Project {
  constructor(title, id) {
    this._title = title;
    this._id = id;
    this._tasks = [];
  }

  set title(name) {
    this._title = name;
  }

  get title() {
    return this._title;
  }

  get id() {
    return this._id;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  toJSON() {
    return {
      title: this.title,
      id: this.id,
      tasks: this.tasks,
    };
  }
}

export default Project;
