class ProjectInput {
    templateElement: HTMLTemplateElement;
    rootElement: HTMLDivElement;
    element: HTMLFormElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.rootElement = document.getElementById('app')! as HTMLDivElement;

        // const cloneNode = this.templateElement.content.cloneNode(true);
        const importedNote = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNote.firstElementChild as HTMLFormElement;
        this.attach();
    }

    private attach() {
        this.rootElement.appendChild(this.element);
        // this.rootElement.insertAdjacentElement('afterbegin', node.firstElementChild!);
    }
}

new ProjectInput();