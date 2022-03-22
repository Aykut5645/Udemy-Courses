import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import styles from './AddUser.module.css';

const AddUser = props => {
    const usernameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const addUserHandler = event => {
        event.preventDefault();

        const enteredUsername = usernameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            return setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
        }

        if (Number(enteredAge) < 1) {
            return setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (> 0).'
            });
        }

        props.onAddUser(enteredUsername, enteredAge);

        usernameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    const errorHadler = () => {
        setError(undefined);
    }

    return (
        <React.Fragment>
            {error !== undefined && <ErrorModal
                title={error.title}
                message={error.message}
                onConfirm={errorHadler}
            />}
            <Card className={styles.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        ref={usernameInputRef}
                    />
                    <label htmlFor="username">Age (Years)</label>
                    <input
                        id="age"
                        type="number"
                        ref={ageInputRef}
                    />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </React.Fragment>
    );
};

export default AddUser;