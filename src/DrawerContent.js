import MenuItem from 'material-ui/MenuItem';
import React from 'react';
import InfoIcon from 'material-ui-icons/Info';
import FeedbackIcon from 'material-ui-icons/Feedback';
import BugIcon from 'material-ui-icons/BugReport';
import Help from 'material-ui-icons/Help';

const MenuItemStyle = {
    fontSize: 15,
    fontWeight: 'bold'
};

class DrawerContent extends React.Component {
    constructor() {
        super();
        this.state = {
            someKey: 'someValue'
        };
    }

    render() {
        return <div>
            <MenuItem style={MenuItemStyle} rightIcon={< InfoIcon />}>Help</MenuItem>
            <MenuItem style={MenuItemStyle} rightIcon={< FeedbackIcon />}>Feedback</MenuItem>
            <MenuItem style={MenuItemStyle} rightIcon={< BugIcon />}>Report a bug</MenuItem>
            <MenuItem style={MenuItemStyle} rightIcon={< Help />}>About TTAP</MenuItem>
        </div>;
    }

    componentDidMount() {
        this.setState({someKey: 'otherValue'});
    }
}

export default DrawerContent;