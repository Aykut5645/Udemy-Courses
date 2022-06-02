// Drag & Drop Interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}
interface Dragtarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// Project Type
enum ProjectStatus {
    Active,
    Finished
}

class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) { }
}

// Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        let createdProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(createdProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(p => p.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const projectState = ProjectState.getInstance(); // app wide state (Singleton Pattern)

// Input Validate
interface Validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (typeof validatableInput.value === 'string') {
        if (validatableInput.minLength) {
            isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength) {
            isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
    }
    if (typeof validatableInput.value === 'number') {
        if (validatableInput.min) {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max) {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
    }
    return isValid;
}

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    rootElement: T;
    element: U;

    constructor(
        templateId: string,
        rootId: string,
        elementId?: string
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.rootElement = document.getElementById(rootId)! as T;

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as U;
        if (elementId) {
            this.element.id = elementId;
        }

        this.attach();
    }

    private attach() {
        this.rootElement.appendChild(this.element);
    }

    abstract renderContent(): void;
    abstract configure(): void;
}

// Project Item Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        return this.project.people + ' persons';
    }

    constructor(rootId: string, project: Project) {
        super('single-project', rootId, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('plain/text', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
        console.log('dragend');
    }

    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler.bind(this));
        this.element.addEventListener("dragend", this.dragEndHandler.bind(this));
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}

// ProjectList class
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements Dragtarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'plain/text') {
            event.preventDefault();
            this.element.querySelector('ul')!.classList.add('droppable');
        }
    }
    dropHandler(event: DragEvent) {
        const projectId = event.dataTransfer!.getData('plain/text');
        projectState.moveProject(
            projectId,
            this.type === 'active'
                ? ProjectStatus.Active
                : ProjectStatus.Finished
        );

    }
    dragLeaveHandler(_: DragEvent) {
        this.element.querySelector('ul')!.classList.remove('droppable');
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.element.addEventListener('dragleave', this.dragLeaveHandler.bind(this));
        this.element.addEventListener('drop', this.dropHandler.bind(this));

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(p => {
                if (this.type === 'active') {
                    return p.status === ProjectStatus.Active;
                }
                return p.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-projects-list`;
        this.element.querySelector('h2')!.textContent = `${this.type.toLocaleUpperCase()} PROJECTS`;
    }

    private renderProjects() {
        let listId = `${this.type}-projects-list`;
        const listElement = document.getElementById(listId)! as HTMLUListElement;
        listElement.innerHTML = '';

        for (const projectItem of this.assignedProjects) {
            new ProjectItem(listId, projectItem);
        }
    }
}

// ProjectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', 'user-input');
        this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description')! as HTMLTextAreaElement;
        this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler.bind(this));
    }

    renderContent() { }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value.trim();
        const enteredDescription = this.descriptionInputElement.value.trim();
        const enteredPeople = Number(this.peopleInputElement.value.trim());

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            console.log('safsafasffs')
            return [enteredTitle, enteredDescription, enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        const userInputs = this.gatherUserInput();

        if (Array.isArray(userInputs)) {
            const [title, description, people] = userInputs;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
}

new ProjectInput();

new ProjectList('active');
new ProjectList('finished');