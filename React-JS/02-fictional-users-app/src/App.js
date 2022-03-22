import React, { useState } from 'react';

import uniqid from 'uniqid';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

const App = () => {
	const [userList, setUserList] = useState([]);

	const addUserHandler = (uName, uAge) => {
		setUserList(prevState => [
			...prevState,
			{ id: uniqid(), name: uName, age: uAge }
		]);
	}

	return (
		<React.Fragment>
			<AddUser onAddUser={addUserHandler} />
			<UsersList users={userList} />
		</React.Fragment>
	);
};

export default App;