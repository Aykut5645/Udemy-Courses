import Section from '../UI/Section';
import TaskForm from './TaskForm';

import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
    const {
        isLoading,
        error,
        sendRequest: sendTaskRequest
    } = useHttp();

    const createTask = (taskText, enteredTask) => {
        const generatedId = enteredTask.name;
        const createdTask = { id: generatedId, text: taskText };

        props.onAddTask(createdTask);
    };

    const enterTaskHandler = taskText => {
        sendTaskRequest(
            {
                url: 'https://react-max-f010c-default-rtdb.firebaseio.com/tasks.json',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: { text: taskText }
            },
            createTask.bind(null, taskText)
        );
    };

    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;