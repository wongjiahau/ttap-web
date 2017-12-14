import BugIcon from 'material-ui-icons/BugReport';
import FeedbackIcon from 'material-ui-icons/Feedback';
import HelpIcon from 'material-ui-icons/Help';
import HomeIcon from 'material-ui-icons/Home';
import InfoIcon from 'material-ui-icons/Info';
import SchoolIcon from 'material-ui-icons/School';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';
import {Link} from 'react-router-dom';

const linkStyle = {
    textDecoration: 'none'
};

const MenuItemStyle = {
    fontSize: 15,
    fontWeight: 'bold'
};

const ReadMeUrl = "https://github.com/wongjiahau/TTAP-UTAR/blob/master/README.md";
export const DrawerContent = (props) => {
    const getLink = (icon, text, to) => {
        return (
            <Link style={linkStyle} to={to}>
                <MenuItem
                    onClick={props.onItemClick}
                    style={MenuItemStyle}
                    rightIcon={icon}>{text}</MenuItem>
            </Link>
        )
    };
    return (
        <div>
            {getLink(<HelpIcon/>, "Help", "/")}
            {getLink(<FeedbackIcon/>, "Feedback", "feedbackForm")}
            {getLink(<BugIcon/>, "Report a bug", "reportBugForm")}
            {getLink(<InfoIcon/>, "About TTAP", "about")}
            {getLink(<SchoolIcon/>, "Terms of Service", "tospp")}
        </div>
    );
}