import * as React from "react";
import {Link} from "react-router-dom";

export class FourOhFour extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            someKey: "someValue"
        };
    }

    public handleClick = () => {
        window
            .history
            .go(-1);
    }

    public render() {
        return <div>
            <h1>Sorry, this page is still under construction . . .</h1>
            <button onClick={this.handleClick}>Click here to go back</button>
        </div>;
    }

    public componentDidMount() {
        this.setState({someKey: "otherValue"});
    }
}
