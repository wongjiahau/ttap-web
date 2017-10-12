import BugIcon from 'material-ui-icons/BugReport';
import FeedbackIcon from 'material-ui-icons/Feedback';
import HelpIcon from 'material-ui-icons/Help';
import InfoIcon from 'material-ui-icons/Info';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';

const MenuItemStyle = {
    fontSize: 15,
    fontWeight: 'bold',
    target: '_blank'
};

const FeedbackFormUrl = "https://goo.gl/forms/qKdc6EVGbxspoTaS2";
const ReportBugUrl = "https://goo.gl/forms/4PJupNgRTEyGGTCN2";
const ReadMeUrl = "https://github.com/wongjiahau/TTAP-UTAR/blob/master/README.md";
class DrawerContent extends React.Component {
    constructor() {
        super();
        this.state = {
            someKey: 'someValue'
        };
    }

    render() {
        return <div>
            <MenuItem target='_blank' style={MenuItemStyle} rightIcon={< InfoIcon />} href={ReadMeUrl}>Help</MenuItem>
            <MenuItem target='_blank' style={MenuItemStyle} rightIcon={< FeedbackIcon />} href={FeedbackFormUrl}>Feedback</MenuItem>
            <MenuItem target='_blank' style={MenuItemStyle} rightIcon={< BugIcon />} href={ReportBugUrl}>Report a bug</MenuItem>
            <MenuItem target='_blank' style={MenuItemStyle} rightIcon={< HelpIcon />}>About TTAP</MenuItem>
        </div>;
    }
    //TODO: Add a link for About TTAP
    componentDidMount() {
        this.setState({someKey: 'otherValue'});
    }
}

export default DrawerContent;