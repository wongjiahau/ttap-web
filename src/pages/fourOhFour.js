import React from 'react';
import {Link} from 'react-router-dom';

class FourOhFour extends React.Component {
    constructor() {
        super();
        this.state = {
            someKey: 'someValue'
        };
    }

    render() {
        return <div>
            <h1>Sorry, this page is still under construction . . .</h1>
        </div>
    }

    componentDidMount() {
        this.setState({someKey: 'otherValue'});
    }
}

export default FourOhFour;
