import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Max',
            image: 'https://img.traveltriangle.com/blog/wp-content/tr:w-700,h-400/uploads/2019/01/Eiffel-Tower.jpg',
            places: 3
        }
    ];

    return (
        <UsersList items={USERS} />
    );
}

export default Users;