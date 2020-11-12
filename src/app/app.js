import { controller } from '../controller/controller';

class App {
    constructor(selector){
        this.appElement = document.querySelector(selector);
        this.controller = controller;
    }

    load() {
        console.log("App loaded...");
    }
}

export let app = new App('#app');