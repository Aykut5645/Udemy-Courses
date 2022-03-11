import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Users from './users/pages/Users';
import NewPlace from './places/pages/NewPlace';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Users />
                </Route>
                <Route to="places/new">
                    <NewPlace />
                </Route>
                <Redirect to="/">
                </Redirect>
            </Switch>
        </Router>
    );
}

export default App;