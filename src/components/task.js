import { format } from 'date-fns';

class Task {
    constructor(title, description, id) {
        this._title = title;
        this._description = description;
        this._id = id;
        this._complete = false;
        this._date = format(new Date(), 'MM/dd/yyyy');
    }

    set title(name) {
        this._title = name;
    }

    get title() {
        return this._title;
    }

    set description(text) {
        this._description = text;
    }

    get description() {
        return this._description;
    }

    get id() {
        return this._id;
    }

    toggleComplete() {
        this._complete = !this.complete;
    }

    get complete() {
        return this._complete;
    }

    get date() {
        return this._date;
    }

    

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            id: this.id,
            date: this.date
        }
    }
}

export default Task;