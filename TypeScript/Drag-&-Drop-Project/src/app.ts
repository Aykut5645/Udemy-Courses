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

// ProjectList class
class ProjectList extends Component<HTMLDivElement, HTMLElement>{
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    configure() {
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
        const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listElement.innerHTML = '';

        for (const projectItem of this.assignedProjects) {
            let liElement = document.createElement('li');
            liElement.textContent = projectItem.title;
            listElement.appendChild(liElement);
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
        console.log(titleValidatable);
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        console.log(descriptionValidatable);
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        console.log(peopleValidatable);

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