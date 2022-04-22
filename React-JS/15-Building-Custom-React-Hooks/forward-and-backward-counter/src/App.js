import React from 'react';
import BackwardCounter from './components/BackwardCounter';
import ForwardCounter from './components/ForwardCounter';

const App = () => {
    return (
        <React.Fragment>
            <ForwardCounter />
            <BackwardCounter />
        </React.Fragment>
    );
};

export default App;
