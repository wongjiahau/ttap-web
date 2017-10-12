import React from 'react';
import {Link} from 'react-router-dom';

class Empty extends React.Component {
    constructor() {
        super();
        this.state = {
            someKey: 'someValue'
        };
    }

    render() {
        return <div>
            <p>This is an empty page.</p>
            <Link to='login'>go to login
            </Link>
        </div>
    }

    componentDidMount() {
        this.setState({someKey: 'otherValue'});
    }
}

export default Empty;
